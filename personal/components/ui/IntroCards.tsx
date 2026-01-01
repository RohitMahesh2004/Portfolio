"use client";

import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Mail, Linkedin, Github } from "lucide-react";

export default function IntroCards() {
  const [query, setQuery] = useState("");
const [response, setResponse] = useState("");
const [loading, setLoading] = useState(false);


  const askBot = async () => {
    if (!query.trim()) return;
  
    setLoading(true);
    setResponse("");
  
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/chat?q=${encodeURIComponent(query)}`
      );
  
      if (!res.body) {
        throw new Error("No response body");
      }
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
  
      let fullText = "";
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setResponse((prev) => prev + chunk);
      }
    } catch (err) {
      console.error(err);
      setResponse("Unable to fetch response.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-between px-15 translate-y-55">
      {/* LEFT CARD — AI CHATBOT */}
      <CardContainer className="inter-var">
        <CardBody
          className="
            relative
            w-[28rem]
            h-[12rem]
            rounded-xl
            border
            border-black/10
            bg-white/60
            backdrop-blur-xl
            p-6
            shadow-lg
            transition-all
            dark:bg-black/40
            dark:border-white/10
            hover:shadow-emerald-400/30
          "
        >
          <CardItem
            translateZ={40}
            className="text-lg font-medium tracking-wide text-emerald-700 dark:text-emerald-300"
          >
            Explore my Works
          </CardItem>
          <CardItem translateZ={45} className="mt-2">
            <div className="h-px w-20 bg-emerald-500/40" />
          </CardItem>

          <CardItem
            as="p"
            translateZ={50}
            className="mt-2 text-sm text-neutral-600 dark:text-neutral-300"
          >
            Query my work using a document-grounded system designed for precise, context-aware answers.
          </CardItem>

          {/* Input */}
          <CardItem
  translateZ={65}
  className="mt-4 flex items-center gap-3"
>
  {/* Input */}
  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Ask me something…"
    className="
      flex-1
      rounded-lg
      border
      border-emerald-500/30
      bg-white/40
      px-3
      py-2
      text-sm
      text-neutral-800
      outline-none
      backdrop-blur
      placeholder:text-neutral-500
      dark:bg-black/30
      dark:text-neutral-200
    "
  />

  {/* Button */}
  <button
    onClick={askBot}
    disabled={loading}
    className="
      shrink-0
      inline-flex
      items-center
      gap-2
      rounded-lg
      bg-emerald-500/10
      px-4
      py-2
      text-xs
      font-light
      tracking-wide
      text-emerald-700
      transition
      hover:bg-emerald-500/20
      disabled:opacity-50
      dark:text-emerald-300
    "
  >
    {loading ? "…" : "Ask →"}
  </button>
</CardItem>

{response && (
  <div
    className="
      absolute
      left-full
      bottom-full
      ml-3
      mb-3
      z-50
      w-[18rem]
      max-h-[14rem]
      overflow-y-auto
      rounded-xl
      border
      border-emerald-500/25
      bg-white/75
      p-4
      text-xs
      leading-relaxed
      text-neutral-700
      backdrop-blur-xl
      shadow-xl
      dark:bg-black/60
      dark:text-neutral-200
    "
  >
    {/* Diagonal tail (points DOWN-LEFT to input) */}
    <span
      className="
        absolute
        bottom-[-6px]
        left-[-6px]
        h-3
        w-3
        rotate-45
        bg-white/75
        border-l
        border-b
        border-emerald-500/25
        dark:bg-black/60
      "
    />

    <pre className="whitespace-pre-wrap font-light">
      {response}
    </pre>
  </div>
)}

        </CardBody>
      </CardContainer>

      {/* RIGHT CARD — CONNECT */}
      <CardContainer className="inter-var">
        <CardBody
          className="
            relative
            w-[28rem]
            h-[12rem]
            rounded-xl
            border
            border-black/10
            bg-white/60
            backdrop-blur-xl
            px-10
            py-6
            shadow-lg
            transition-all
            dark:bg-black/40
            dark:border-white/10
            hover:shadow-emerald-400/30
          "
        >
          <CardItem
            translateZ={40}
            className="text-lg font-medium tracking-wide text-emerald-700 dark:text-emerald-300"
          >
            Connect with me
          </CardItem>

          <CardItem translateZ={45} className="mt-2">
            <div className="h-px w-20 bg-emerald-500/40" />
          </CardItem>

          <CardItem
            translateZ={50}
            className="mt-3 text-sm font-light text-neutral-600 dark:text-neutral-300"
          >
            Reach out for collaboration, ideas, or opportunities.
          </CardItem>

          <CardItem translateZ={65} className="mt-5 flex items-center gap-4">
            <a
              href="mailto:rohitmahesh2004@gmail.com"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-light text-emerald-700 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_18px_rgba(16,185,129,0.25)] dark:text-emerald-300"
            >
              <Mail size={18} />
              Gmail
            </a>

            <a
              href="https://www.linkedin.com/in/rohit-mahesh-119268271/"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-light text-emerald-700 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_18px_rgba(16,185,129,0.25)] dark:text-emerald-300"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>

            <a
              href="https://github.com/RohitMahesh2004"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-light text-emerald-700 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_18px_rgba(16,185,129,0.25)] dark:text-emerald-300"
            >
              <Github size={18} />
              GitHub
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
