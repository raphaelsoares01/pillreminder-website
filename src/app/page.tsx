"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import HowItWork from "@/components/HowItWork";
import Join from "@/components/Join";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main>
      {!introFinished && (
        <Join onComplete={() => setIntroFinished(true)} />
      )}

      <Navbar />
      <Hero />
      <About />
      <HowItWork />
    </main>
  );
}