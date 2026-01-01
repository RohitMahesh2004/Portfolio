import os
import faiss
import numpy as np
import google.generativeai as genai
from dotenv import load_dotenv
from pypdf import PdfReader
from typing import List, Tuple
from sentence_transformers import SentenceTransformer

# ------------------ Setup ------------------

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

LLM_MODEL = "models/gemini-2.5-flash"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(BASE_DIR, "documents")
PROJECTS_DIR = os.path.join(DOCS_DIR, "projects")

# ------------------ Utilities ------------------

def load_pdf(path: str) -> str:
    reader = PdfReader(path)
    pages = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return "\n".join(pages)

def chunk_text(text: str, size: int = 500, overlap: int = 100) -> List[str]:
    chunks = []
    i = 0
    while i < len(text):
        chunks.append(text[i:i + size])
        i += size - overlap
    return chunks

# ------------------ Embeddings (LOCAL) ------------------

EMBED_MODEL_NAME = "all-MiniLM-L6-v2"
embedder = SentenceTransformer(EMBED_MODEL_NAME)

def embed_texts(texts: List[str]) -> np.ndarray:
    vectors = embedder.encode(
        texts,
        convert_to_numpy=True,
        normalize_embeddings=True,
        show_progress_bar=True
    )
    return vectors.astype("float32")

# ------------------ RAG Engine ------------------

class MultiDocRAG:
    def __init__(self):
        self.text_chunks: List[str] = []
        self.metadata: List[dict] = []

        self._load_all_documents()
        self._build_faiss_index()

        self.llm = genai.GenerativeModel(LLM_MODEL)

    # -------- Document Loading --------

    def _load_all_documents(self):
        # Resume
        resume_path = os.path.join(DOCS_DIR, "resume.pdf")
        if os.path.exists(resume_path):
            resume_text = load_pdf(resume_path)
            for chunk in chunk_text(resume_text):
                self.text_chunks.append(chunk)
                self.metadata.append({
                    "source": "resume",
                    "file": "resume.pdf"
                })

        # Projects (multiple PDFs)
        if os.path.exists(PROJECTS_DIR):
            for file in os.listdir(PROJECTS_DIR):
                if not file.lower().endswith(".pdf"):
                    continue

                full_path = os.path.join(PROJECTS_DIR, file)
                project_text = load_pdf(full_path)

                for chunk in chunk_text(project_text):
                    self.text_chunks.append(chunk)
                    self.metadata.append({
                        "source": "project",
                        "file": file
                    })

        if not self.text_chunks:
            raise RuntimeError("No documents found. Add PDFs to /documents.")

    # -------- Vector Index --------

    def _build_faiss_index(self):
        embeddings = embed_texts(self.text_chunks)
        dim = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(dim)
        self.index.add(embeddings)

    # -------- Retrieval --------

    def retrieve(self, query: str, k: int = 6) -> Tuple[str, List[str]]:
        q_vec = embed_texts([query])
        _, indices = self.index.search(q_vec, k)

        context_blocks = []
        sources = set()

        for idx in indices[0]:
            context_blocks.append(self.text_chunks[idx])
            sources.add(self.metadata[idx]["file"])

        return "\n\n".join(context_blocks), sorted(sources)

    # -------- Streaming Answer (SYNC) --------

    def stream_answer(self, question: str):
        context, sources = self.retrieve(question)

        prompt = f"""
You are Rohit Mahesh's personal AI assistant.

STRICT GUARDRAILS:
- Answer ONLY using the context below.
- If the answer is missing, respond exactly with:
  "I don't have enough information to answer that."
- Do NOT infer, assume, or hallucinate.
- Be concise, factual, and technical.

Context:
{context}

Question:
{question}
"""

        response = self.llm.generate_content(
            prompt,
            stream=True
        )

        for chunk in response:
            if chunk.text:
                yield chunk.text
