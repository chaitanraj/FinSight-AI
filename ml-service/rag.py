import os
import re
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from groq import Groq

load_dotenv()

GROQ_API_KEY = (os.getenv("GROQ_API_KEY") or "").strip()
GROQ_MODEL = (os.getenv("GROQ_MODEL") or "meta-llama/llama-4-scout-17b-16e-instruct").strip()
CHROMA_DIR = "chroma_db"

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load vector DB
vectordb = Chroma(
    persist_directory=CHROMA_DIR,
    embedding_function=embeddings
)

# Groq client
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None


def groq_generate(prompt: str) -> str:
    if client is None:
        raise RuntimeError(
            "Groq API key is missing. Set GROQ_API_KEY."
        )

    # Google AI Studio keys typically start with AIza and are not valid for Groq.
    if GROQ_API_KEY.startswith("AIza"):
        raise RuntimeError(
            "Detected a Google key (AIza) for Groq. Configure GROQ_API_KEY with a valid Groq key."
        )

    candidate_models = [
        GROQ_MODEL,
        "meta-llama/llama-4-maverick-17b-128e-instruct",
        "llama-3.3-70b-versatile",
    ]

    seen_models = set()
    last_exc = None

    for model_name in candidate_models:
        if not model_name or model_name in seen_models:
            continue
        seen_models.add(model_name)

        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
            )

            if response.choices and response.choices[0].message:
                content = (response.choices[0].message.content or "").strip()
                if content:
                    return content

        except Exception as exc:
            exc_text = str(exc).lower()
            if "invalid api key" in exc_text or "authentication" in exc_text or "unauthorized" in exc_text:
                raise RuntimeError(
                    "Invalid GROQ_API_KEY. Update it with a valid Groq key."
                ) from exc
            last_exc = exc

    if last_exc is not None:
        raise RuntimeError(
            "Groq request failed. Verify GROQ_MODEL and model access for your Groq account."
        ) from last_exc

    return "I don't know."


def rewrite_query(user_query: str) -> str:
    prompt = f"""
Rewrite the user query to improve document retrieval.

Rules:
- Make it more specific and searchable for FinSight AI documentation.
- Do NOT answer the question.
- Do NOT change meaning.

User Query: {user_query}

Output format:
- Return only one rewritten search query.
- No markdown, no bullets, no quotes, no explanation.

Rewritten Query:
"""
    raw = groq_generate(prompt)
    return normalize_rewritten_query(raw, user_query)


def normalize_rewritten_query(raw_text: str, fallback_query: str) -> str:
    if not raw_text:
        return fallback_query

    lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
    if not lines:
        return fallback_query

    for line in lines:
        normalized = re.sub(r"^rewritten query\s*[:\-]\s*", "", line, flags=re.IGNORECASE)
        normalized = normalized.strip().strip('"').strip("'")
        lowered = normalized.lower()

        if not normalized:
            continue
        if lowered.startswith(("here", "alternatively", "example", "option")):
            continue
        if normalized.startswith(("*", "-", "•")):
            continue

        return normalized

    return fallback_query


def rerank_docs(user_query: str, docs):
    chunk_text = ""

    for i, doc in enumerate(docs):
        chunk_text += f"\n\nCHUNK {i+1}:\n{doc.page_content}\n"

    prompt = f"""
Select the BEST 3 chunks that directly contain the answer.

Return ONLY chunk numbers as comma-separated values.
Example: 2,5,6

User Question:
{user_query}

Chunks:
{chunk_text}

Best Chunk Numbers:
"""

    response = groq_generate(prompt)

    indices = []
    for part in response.split(","):
        part = part.strip()
        if part.isdigit():
            indices.append(int(part) - 1)

    reranked = []
    for idx in indices:
        if 0 <= idx < len(docs):
            reranked.append(docs[idx])

    if len(reranked) == 0:
        reranked = docs[:3]

    return reranked[:3]


def build_prompt(context: str, user_query: str) -> str:
    return f"""
You are FinSight AI Assistant.

PRIORITY RULES:
1. First priority: Answer using the provided FinSight AI documentation context.
2. If the answer is not found in the context, then answer using your general finance knowledge.
3. If you answer using general knowledge, clearly mention:
   "This is a general finance explanation, not found in FinSight AI documentation."

STRICT RULES:
- Do NOT invent FinSight AI features not present in context.
- If question is about FinSight AI and context doesn't contain it, say you could not find it.
- Be concrete and specific, not generic.
- Explain what the product does, how it works, and why it matters.
- Mention named features only if they are supported by the context.
- Prefer 1 short summary sentence, then 1 concise detail paragraph, then 3 to 6 bullet points.
- Avoid filler phrases like "based on the documentation" unless necessary.

OUTPUT FORMAT:
- Line 1: a direct one-sentence summary.
- Then a short paragraph with 2 to 4 sentences.
- Then bullet points using "- " for concrete capabilities, workflow, or benefits.
- Do not add markdown headings.
- Do not add a title.

CONTEXT (FinSight AI Documentation):
{context}

USER QUESTION:
{user_query}

FINAL ANSWER:
"""


def format_answer_for_ui(answer: str) -> dict:
    cleaned = (answer or "I don't know.").strip()
    lines = [line.strip() for line in cleaned.splitlines() if line.strip()]

    highlights = []
    body_lines = []

    for line in lines:
        if line.startswith(("* ", "- ", "• ")):
            highlights.append(line[2:].strip())
        else:
            body_lines.append(line)

    summary = body_lines[0] if body_lines else (highlights[0] if highlights else cleaned)
    body = "\n".join(body_lines[1:]) if len(body_lines) > 1 else ""

    if not highlights and body:
        sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", body) if part.strip()]
        if len(sentences) > 1:
            highlights = sentences[:4]

    if not body and highlights:
        body = " ".join(highlights[:2])

    return {
        "answer": cleaned,
        "summary": summary,
        "body": body,
        "highlights": highlights[:6],
    }


def dedupe_sources(sources: list) -> list:
    seen = set()
    deduped = []

    for src in sources:
        key = (
            src.get("source", "unknown"),
            src.get("page", "unknown"),
            src.get("title", "unknown"),
        )
        if key in seen:
            continue
        seen.add(key)
        deduped.append(src)

    return deduped


def get_rag_response(user_query: str):
    rewritten_query = rewrite_query(user_query)

    docs = vectordb.similarity_search(rewritten_query, k=8)

    if not docs:
        ui_payload = format_answer_for_ui("I don't know based on the provided documentation.")
        return {
            "answer": ui_payload["answer"],
            "summary": ui_payload["summary"],
            "body": ui_payload["body"],
            "highlights": ui_payload["highlights"],
            "sources": [],
            "source_count": 0,
            "rewritten_query": rewritten_query
        }

    docs = rerank_docs(user_query, docs)

    context_parts = []
    sources = []

    for doc in docs:
        context_parts.append(doc.page_content)
        sources.append({
            "source": doc.metadata.get("source", "unknown"),
            "page": doc.metadata.get("page", "unknown"),
            "title": doc.metadata.get("title", "unknown")
        })

    context = "\n\n---\n\n".join(context_parts)

    prompt = build_prompt(context, user_query)
    answer = groq_generate(prompt)
    ui_payload = format_answer_for_ui(answer)
    sources = dedupe_sources(sources)

    return {
        "answer": ui_payload["answer"],
        "summary": ui_payload["summary"],
        "body": ui_payload["body"],
        "highlights": ui_payload["highlights"],
        "sources": sources,
        "source_count": len(sources),
        "rewritten_query": rewritten_query
    }
