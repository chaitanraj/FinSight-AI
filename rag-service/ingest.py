from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction


loader = PyPDFLoader("data/finsight.pdf")
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(documents)

# Use ONNX embeddings (same as rag.py runtime)
embedding_fn = DefaultEmbeddingFunction()
chroma_client = chromadb.PersistentClient(path="chroma_db")

# Delete old collection if it exists
try:
    chroma_client.delete_collection("langchain")
except Exception:
    pass

collection = chroma_client.create_collection(name="langchain", embedding_function=embedding_fn)

# Add documents
for i, chunk in enumerate(chunks):
    collection.add(
        documents=[chunk.page_content],
        metadatas=[chunk.metadata],
        ids=[f"chunk_{i}"],
    )

print(f"Created knowledge base with {len(chunks)} chunks from {len(documents)} pages")
