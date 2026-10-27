"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const phones = [
  {
    src: "/images/name_user_page_iphone-17.png",
    alt: "Tela de identificação do usuário no PillReminder",
  },
  {
    src: "/images/hardware_link_page_iphone-17.png",
    alt: "Tela de configuração do horário do medicamento",
  },
  {
    src: "/images/link_confirm_page_iphone-17.png",
    alt: "Tela de confirmação do vínculo do medicamento",
  },
  {
    src: "/images/timer_page_iphone-17.png",
    alt: "Tela de vínculo com o dispositivo físico",
  },
];

export default function HowItWork() {
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
      { threshold: 0.18 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="how-it-work-section overflow-x-clip"
    >
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center px-5 py-30 md:px-8 lg:px-12">
        <div
          className={`how-it-work-content text-center ${
            isVisible ? "how-it-work-content-visible" : ""
          }`}
        >
          <div className="mb-3 flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--primary)]">
            <div className="h-0.5 w-12 rounded-full bg-[var(--primary)]" />
            Como funciona
            <div className="h-0.5 w-12 rounded-full bg-[var(--primary)]" />
          </div>
          <h2 className="text-[clamp(2.5rem,4.2vw,4.55rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[var(--title)]">
            Do primeiro acesso ao{" "}
            <span className="text-[var(--primary)]">seu cuidado</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[1.8] text-[var(--text)]">
            Acompanhe cada etapa da experiência do PillReminder pelo aplicativo,
            de forma simples e integrada.
          </p>
        </div>

        <div
          className={`how-it-work-stage ${isVisible ? "how-it-work-stage-visible" : ""}`}
          aria-label="Etapas do aplicativo PillReminder"
        >
          {phones.map((phone, index) => (
            <div
              className="how-it-work-phone"
              key={phone.src}
              style={{ "--phone-index": index } as CSSProperties}
            >
              <img src={phone.src} alt={phone.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}