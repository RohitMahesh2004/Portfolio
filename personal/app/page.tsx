"use client";

import React from "react";
import Navbar from "@/components/ui/NavBar";
import NameOverlay from "@/components/ui/NameOverlay";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import BabyYodaScene from "@/components/ui/BabyYoda";
import IntroCards from "@/components/ui/IntroCards";
import TreeScene from "@/components/ui/TreeScene";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import SpaceshipScene from "@/components/ui/SpaceshipScene";
import { Github } from "lucide-react";
import DarthVaderHelmetScene from "@/components/ui/DarthVaderHelmetScene";

const achievements = [
  {
    title: "iConSCEPT 2025 — Paper Acceptance, NIT Puducherry",
    duration: "Paper ID: 114 • Nov 2025",
    description:
      "Proposed ADP-LoRA, a privacy-preserving fine-tuning framework integrating LoRA with adaptive noise control, noise-aware pruning, and a dynamic feedback controller for differentially private LLM training, achieving 77.9% accuracy on BERT under a privacy budget of ε ≈ 7.3 and reducing the typical DP vs non-DP performance gap by over 7 points.",
    position: "left-[4%] top-[24%]",
  },
  {
    title: "Defy’25 Hackathon — ARCA Team (Public Goods Track)",
    duration: "3rd Place Winner • March 2025",
    description:
      "Developed BCHAIN, a decentralized Web3 blood-donation platform using Solidity smart contracts for secure donor–recipient matching, tokenized incentives, and Ether-based fundraising; built the full stack using Next.js, Web3.js, and HardHat.",
    position: "right-[2%] top-[16%]",
  },
  {
    title: "Professional Certifications",
    duration: "IBM & University of California, Davis",
    description:
      "Completed the IBM RAG & Agentic AI Professional Certificate and the SQL for Data Science certification from UC Davis, building a strong foundation in retrieval-augmented generation, agentic workflows, and data-driven analytics.",
    position: "right-[8%] bottom-[-7%]",
  },
];

const projects = [
  {
    title: "Parkinson’s Disease Classification with CNN",
    duration: "Deep Learning • Medical Imaging",
    description:
      "Built a deep learning pipeline combining convolutional neural networks with a quantum-inspired layer for MRI-based Parkinson’s disease classification, achieving 97.16% validation accuracy and 97.33% training accuracy for early-stage detection.",
    github: "https://github.com/RohitMahesh2004/PARKINSONS-MRI-DETECTION-USING-CNN",
    position: "left-[2%] top-[16%]",
  },
  {
    title: "E-Commerce Product Recommender System",
    duration: "Recommender Systems • RAG",
    description:
      "Developed a hybrid e-commerce recommendation system using collaborative filtering, vector embeddings, and a knowledge-graph-driven RAG pipeline, enabling LLM-powered natural language explanations for personalized product suggestions.",
    github: "https://github.com/RohitMahesh2004/E-Commerce-Product-Recommendation-System",
    position: "right-[2%] top-[16%]",
  },
  {
    title: "Multimodal Emotion Recognition",
    duration: "Computer Vision • Speech Processing",
    description:
      "Implemented a multimodal emotion recognition system by fusing facial expressions and audio features (MFCCs) using CNNs, TensorFlow, OpenCV, and Librosa, improving robustness across visual and acoustic variations.",
    github: "https://github.com/RohitMahesh2004/MULTIMODAL-EMOTION-RECOGNITION-USING-AUDIO-VISUAL-FUSION",
    position: "right-[2%] bottom-[-5%]",
  },
  {
    title: "Traffic Sign Detection System",
    duration: "Computer Vision • Few-Shot Learning",
    description:
      "Built a real-time traffic sign detection system using CNN, ResNet-50, ConViT, MobileNetV3, and EfficientNetV2, integrating few-shot learning to handle low-resource classes and achieving over 98% accuracy across all evaluated models.",
    github: "https://github.com/RohitMahesh2004/TRAFFIC-SIGN-DETECTION",
    position: "left-[2%] bottom-[-5%]",
  },
];

/* ================= INTERNSHIP DATA ================= */

const internships = [
  {
    title: "IISc Bangalore — Neurodynamics Lab",
    duration: "May 2024 – July 2024",
    description:
      "Automated the XY-base movement of an image scanning microscope using Arduino Uno and stepper motors to enable precise raster scanning, achieving over 95% positional repeatability and improving experimental throughput by 40% and analyzed 500+ behavioral data points for the study “Effects of Event Boundaries on Temporal Order Memory” using PsychoPy, MATLAB, and Origin analytics, achieving 92% reproducibility.",
    position: "left-[2%] top-[25%]",
  },
  {
    title: "IIT Kanpur — Privacy Lab",
    duration: "May 2025 - July 2024",
    description:
      "Implemented a quantifiable Private Information Retrieval (QPIR) system enabling tunable privacy under fixed computation budgets, reducing bandwidth usage by 55%; designed a weighted-interval database model to balance privacy–efficiency trade-offs and improve query efficiency by 40%; and built end-to-end QPIR pipelines using C/C++, Distributed Point Functions (DPFs), linear programming optimization, and cryptographic primitives.",
    position: "right-[2%] top-[15%]",
  },
  {
    title: "VIT Chennai — SRIP 2024",
    duration: "June 2024 - August 2024",
    description:
      "Developed a hybrid semantic similarity model integrating BERT, RoBERTa, SBERT, and Word2Vec embeddings with a Siamese BiLSTM architecture, improving grading accuracy by 31%; incorporated negation-aware scoring to better capture linguistic nuance, achieving an AUROC of 0.984 across 8k+ samples; and built the complete end-to-end pipeline using TensorFlow, PyTorch, NLTK, and scikit-learn, reducing inference time by 28%.",
    position: "right-[28%] bottom-[-7%]",
  },
];

/* ================= 3D INTERNSHIP CARD ================= */

function Internship3DCard({
  title,
  duration,
  description,
  position,
}: {
  title: string;
  duration: string;
  description: string;
  position: string;
}) {
  return (
    <div className={`absolute ${position} z-20`}>
      <CardContainer className="inter-var">
        <CardBody
          className="
            relative
            w-[30rem]
            h-[18rem]
            rounded-2xl
            border
            border-white/40
            bg-white/30
            backdrop-blur-xl
            p-6
            shadow-xl
            transition-all

            hover:shadow-[0_0_45px_rgba(244,114,182,0.45)]
            hover:border-pink-300/60

            dark:bg-white/10
          "
        >
          {/* Title */}
          <CardItem
            translateZ={50}
            className="font-orbitron text-sm tracking-wide text-pink-500"
          >
            {title}
          </CardItem>

          {/* Divider */}
          <CardItem translateZ={40} className="mt-2">
            <div className="h-px w-16 bg-gradient-to-r from-pink-400 to-orange-400" />
          </CardItem>

          {/* Duration */}
          <CardItem
            translateZ={45}
            className="mt-2 text-xs text-neutral-500 dark:text-neutral-300"
          >
            {duration}
          </CardItem>

          {/* Description */}
          <CardItem
            translateZ={60}
            className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200"
          >
            {description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
function Project3DCard({
  title,
  duration,
  description,
  position,
  github,
}: {
  title: string;
  duration: string;
  description: string;
  position: string;
  github: string;
}) {
  return (
    <div className={`absolute ${position} z-20`}>
      <CardContainer className="inter-var">
        <CardBody className="relative w-[30rem] h-[18rem] rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl p-6 shadow-xl transition-all hover:shadow-[0_0_45px_rgba(56,189,248,0.45)] hover:border-sky-300/60 dark:bg-white/10">

          {/* GitHub Icon */}
          <CardItem translateZ={70} className="absolute right-4 top-4">
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github
                size={18}
                className="text-neutral-500 hover:text-sky-400 transition-colors drop-shadow-[0_0_6px_rgba(56,189,248,0.45)]"
              />
            </a>
          </CardItem>

          <CardItem translateZ={50} className="font-orbitron text-sm tracking-wide text-sky-400 pr-8">
            {title}
          </CardItem>

          <CardItem translateZ={40} className="mt-2">
            <div className="h-px w-16 bg-gradient-to-r from-sky-400 to-cyan-400" />
          </CardItem>

          <CardItem translateZ={45} className="mt-2 text-xs text-neutral-500 dark:text-neutral-300">
            {duration}
          </CardItem>

          <CardItem translateZ={60} className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
            {description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}


function Achievements3DCard({
  title,
  duration,
  description,
  position,
}: {
  title: string;
  duration: string;
  description: string;
  position: string;
}) {
  return (
    <div className={`absolute ${position} z-20`}>
      <CardContainer className="inter-var">
        <CardBody
          className="
            relative
            w-[30rem]
            h-[18rem]
            rounded-2xl
            border
            border-white/40
            bg-white/25
            backdrop-blur-xl
            p-6
            shadow-xl
            transition-all

            hover:shadow-[0_0_50px_rgba(239,68,68,0.55)]
            hover:border-red-400/60

            dark:bg-white/10
          "
        >
          {/* Title */}
          <CardItem
            translateZ={55}
            className="font-orbitron text-sm tracking-wide text-red-400"
          >
            {title}
          </CardItem>

          {/* Divider */}
          <CardItem translateZ={45} className="mt-2">
            <div className="h-px w-20 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300" />
          </CardItem>

          {/* Duration */}
          <CardItem
            translateZ={50}
            className="mt-2 text-xs text-neutral-500 dark:text-neutral-300"
          >
            {duration}
          </CardItem>

          {/* Description */}
          <CardItem
            translateZ={65}
            className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200"
          >
            {description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
/* ================= PAGE ================= */

export default function Home() {
  return (
    <main className="relative w-full min-h-[200vh] overflow-hidden bg-zinc-50 dark:bg-black">

      {/* GLOBAL BACKGROUNDS */}
      <div className="pointer-events-none absolute inset-0 z-[1]
        bg-[radial-gradient(circle_at_50%_40%,rgba(69,240,194,0.12),rgba(0,0,0,0)_70%)]" />

      <DottedGlowBackground
        className="pointer-events-none absolute inset-0 z-[2]
        mask-radial-to-90% mask-radial-at-center opacity-40 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />

      <Navbar />

      {/* ===== HERO ===== */}
      <section id="home" className="relative z-10 h-screen w-full overflow-hidden">
        <div className="flex h-screen w-full items-center justify-center">
          <BabyYodaScene />
        </div>
        <NameOverlay />
        <IntroCards />
      </section>

      {/* ===== INTERNSHIPS ===== */}
      <section id="internships" className="relative z-10 h-screen w-full overflow-hidden">

        {/* Title */}
        <div className="pointer-events-none absolute left-[8vw] top-[16vh] z-20">
          <span
            className="
              font-orbitron
              text-[6vw]
              tracking-[0.18em]
              leading-none
              whitespace-nowrap
              select-none

              text-transparent bg-clip-text
              bg-[radial-gradient(circle_at_50%_40%,#ffd1e8_0%,#fb7185_35%,#fb923c_65%,#7c2d12_100%)]

              drop-shadow-[0_10px_30px_rgba(244,114,182,0.55)]
            "
          >
            INTERNSHIPS
          </span>
        </div>

        {/* Cards */}
        {internships.map((item, i) => (
          <Internship3DCard key={i} {...item} />
        ))}

        {/* Tree */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-[70vh] w-full max-w-5xl">
            <TreeScene />
          </div>
        </div>

      </section>
      {/* ===== SPACESHIP SECTION ===== */}
<section id="projects" className="relative z-10 h-screen w-full overflow-hidden">

{/* Title */}
<div className="pointer-events-none absolute top-[14vh] left-1/2 -translate-x-1/2 z-20">
  <span
    className="
      font-orbitron
      text-[5vw]
      tracking-[0.22em]
      whitespace-nowrap
      text-transparent bg-clip-text
      bg-[radial-gradient(circle_at_50%_40%,#bae6fd_0%,#38bdf8_40%,#0ea5e9_70%,#075985_100%)]
      drop-shadow-[0_8px_25px_rgba(56,189,248,0.45)]
    "
  >
    PROJECTS
  </span>
</div>
{/* Cards */}
{projects.map((item, i) => (
          <Project3DCard key={i} {...item} />
        ))}
{/* 3D Spaceship */}
<div className="flex h-full w-full items-center justify-center">
  <div className="h-[70vh] w-full max-w-6xl">
    <SpaceshipScene />
  </div>
</div>

</section>
<section id="achievements" className="relative z-10 h-screen w-full overflow-hidden">

  {/* Title */}
  <div className="pointer-events-none absolute top-[14vh] left-[35%] -translate-x-1/2 z-20">
    <span
      className="
        font-orbitron
        text-[5vw]
        tracking-[0.22em]
        whitespace-nowrap
        text-transparent bg-clip-text
        bg-[radial-gradient(circle_at_50%_40%,#fecaca_0%,#ef4444_40%,#b91c1c_70%,#450a0a_100%)]
        drop-shadow-[0_8px_25px_rgba(239,68,68,0.55)]
      "
    >
      ACHEIVEMENTS
    </span>
  </div>
  {achievements.map((item, i) => (
  <Achievements3DCard key={i} {...item} />
))}

{/* 3D Darth Vader Helmet */}
<div className="flex h-full w-full items-center justify-center">
    <div className="h-[70vh] w-full max-w-5xl">
      <DarthVaderHelmetScene />
    </div>
  </div>

</section>
    </main>
  );
}
