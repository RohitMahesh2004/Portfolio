from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from rag_engine import MultiDocRAG

# ------------------ App ------------------

app = FastAPI(title="Rohit Mahesh RAG API")

# ------------------ CORS (REQUIRED for browser fetch) ------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js dev
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ RAG Initialization ------------------
# Load once at startup (FAISS + embeddings)

rag = MultiDocRAG()

# ------------------ Health ------------------

@app.get("/")
def health():
    return {"status": "ok"}

# ------------------ Chat (Streaming) ------------------

@app.get("/chat")
def chat(q: str = Query(..., min_length=1)):
    """
    Streaming chat endpoint

    Example:
    http://localhost:8000/chat?q=What projects has Rohit worked on?
    """

    def event_stream():
        # IMPORTANT:
        # rag.stream_answer() is a SYNC generator
        for token in rag.stream_answer(q):
            yield token

    return StreamingResponse(
        event_stream(),
        media_type="text/plain; charset=utf-8"
    )
