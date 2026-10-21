"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background-hero.png')", backgroundPosition: "center 30%"}}
    aria-label="Interior da barbearia"
    >
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center px-6 pb-20 pt-28 sm:px-10 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:pt-20">
        {/* Textos e botões */}
        <div
          className={`relative z-10 max-w-[560px] transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/50 px-3.5 py-2 text-[11px] font-medium tracking-wide text-blue-700 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Projeto acadêmico · IoT
          </div>

          <h1 className="text-[clamp(2.8rem,4.2vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[#091943]">
            Tecnologia a favor
            <br />
            da sua{" "}
            <span className="text-[#2164e8]">
              saúde.
            </span>
          </h1>

          <p className="mt-6 max-w-[480px] text-[15px] leading-[1.8] text-[#29467f] sm:text-base">
            Conheça o PillReminder, um sistema inteligente que
            integra dispositivo físico e aplicativo para auxiliar
            no monitoramento e na organização da sua rotina
            medicamentosa.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#sobre"
              className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-gradient-to-r from-[#0750dc] to-[#367aff] px-7 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(30,100,240,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(30,100,240,0.28)]"
            >
            <img 
                src="/images/play-icon.png" 
                alt="Play" 
                className="h-[18px] w-[18px] object-contain brightness-0 invert" 
            />
              Conheça o projeto
            </a>

            <a
              href="https://github.com/raphaelsoares01/pillreminder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center gap-3 rounded-full border border-[#a9c2f3] bg-white/45 px-6 text-[13px] font-semibold text-[#102b66] backdrop-blur-sm transition-all duration-300 hover:border-blue-500 hover:bg-white/80"
            >
             <img 
                src="/images/github-icon.png" 
                alt="Play" 
                className="h-[22px] w-[22px] object-contain" 
            />
              Ver no GitHub
            </a>
          </div>
        </div>

        {/* Espaço reservado para a imagem do dispositivo */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#sobre"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("sobre")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-blue-600 transition-opacity hover:opacity-70"
      >
        <span className="flex h-6 w-[15px] items-start justify-center rounded-full border border-blue-500 p-1">
          <span className="h-1.5 w-px animate-pulse bg-blue-600" />
        </span>
        <span className="whitespace-nowrap text-[10px] font-medium">
          Role para descobrir
        </span>
      </a>
    </section>
  );
}