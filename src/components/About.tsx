"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="min-h-screen overflow-x-clip">
      <div className="flex flex-col items-center justify-center gap-10 px-5 py-30 md:flex-row md:gap-16 md:px-8 lg:px-12">
        <div
          className={`about-content ${
            isVisible ? "about-content-visible" : ""
          }`}
        >
          <h1 className="text-[clamp(2.8rem,4.2vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[var(--title)]">
            O que é o <span className="text-[var(--primary)]">PillReminder</span>?
          </h1>
          <p className="mt-6 max-w-[480px] break-words text-[18px] leading-[1.8] text-[var(--text)]">
            O PillReminder é um projeto desenvolvido com o principal objetivo de auxiliar pessoas a manterem uma rotina de medicação adequada, evitando esquecimentos e garantindo que os medicamentos sejam tomados corretamente.
          </p>
          <p className="mt-6 max-w-[480px] break-words text-[18px] leading-[1.8] text-[var(--text)]">
            Consiste em um sistema que une um dispositivo físico inteligente, um aplicativo móvel e uma plataforma na nuvem, proporcionando uma experiência integrada e eficiente para os usuários.
          </p>
        </div>
        <div
          className={`about-phone-entrance ${
            isVisible ? "about-phone-entrance-visible" : ""
          }`}
        >
          <div className="about-phone-stage">
            <img
              src="/images/background-iphone.png"
              alt=""
              aria-hidden="true"
              className="about-phone-background"
            />
            <div className={`about-phone ${isVisible ? "about-phone-floating" : ""}`}>
              <img
                src="/images/3d_alredy_linked_iphone_frame2.png"
                alt="iPhone Frame"
                className="h-auto w-full max-w-[600px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}