import os
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from google import genai

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
CHROMA_DIR = "chroma_db"

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load vector DB
vectordb = Chroma(
    persist_directory=CHROMA_DIR,
    embedding_function=embeddings
)

# Gemini client (official)
client = genai.Client(api_key=GOOGLE_API_KEY)


def gemini_generate(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    if response.text:
        return response.text.strip()

    return "I don't know."


def rewrite_query(user_query: str) -> str:
    prompt = f"""
Rewrite the user query to improve document retrieval.

Rules:
- Make it more specific and searchable for FinSight AI documentation.
- Do NOT answer the question.
- Do NOT change meaning.

User Query: {user_query}

Rewritten Query:
"""
    return gemini_generate(prompt)


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

    response = gemini_generate(prompt)

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
- Keep responses short, clear, and structured.
- Use bullet points when helpful.

CONTEXT (FinSight AI Documentation):
{context}

USER QUESTION:
{user_query}

FINAL ANSWER:
"""


def get_rag_response(user_query: str):
    rewritten_query = rewrite_query(user_query)

    docs = vectordb.similarity_search(rewritten_query, k=8)

    if not docs:
        return {
            "answer": "I don't know based on the provided documentation.",
            "sources": [],
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
    answer = gemini_generate(prompt)

    return {
        "answer": answer,
        "sources": sources,
        "rewritten_query": rewritten_query
    }
