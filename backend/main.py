from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from rag_engine import MultiDocRAG

# ------------------ ENV ------------------
load_dotenv()  # safe for local, ignored on Render

# ------------------ App ------------------

app = FastAPI(title="Rohit Mahesh RAG API")

# ------------------ CORS ------------------

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://portfolio.vercel.app",       # ⬅️ CHANGE if needed
    "https://rohitmahesh.vercel.app",     # ⬅️ optional custom domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ RAG INIT ------------------

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
    """

    def event_stream():
        for token in rag.stream_answer(q):
            yield token

    return StreamingResponse(
        event_stream(),
        media_type="text/plain; charset=utf-8",
    )
