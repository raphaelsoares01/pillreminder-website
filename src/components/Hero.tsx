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
      style={{ backgroundImage: "url('/images/background-hero-and-pillbox-and-transition.png')", backgroundPosition: "center 30%"}}
    aria-label="Interior da barbearia"
    >
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] items-center pb-35">
        <div
          className={`relative pt-20 z-10 w-full max-w-[660px] min-w-0 transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/50 px-3.5 py-2 text-[13px] font-medium tracking-wide text-blue-700 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Projeto acadêmico · IoT
          </div>

          <h1 className="text-[clamp(2.8rem,4.2vw,5.25rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[var(--title)]">
            Tecnologia a favor
            <br />
            da sua{" "}
            <span className="text-[#2164e8]">
              saúde.
            </span>
          </h1>

          <p className="mt-6 max-w-[480px] break-words text-[18px] leading-[1.8] text-[var(--text)]">
            O PillReminder é um sistema de monitoramento de medicamentos que integra um dispositivo físico, um aplicativo e a nuvem para ajudar você a nunca mais esquecer de tomar sua medicação
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#sobre"
              className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-gradient-to-r from-[#0750dc] to-[#367aff] px-7 text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(30,100,240,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(30,100,240,0.28)]"
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
              className="inline-flex min-h-[50px] items-center gap-3 rounded-full border border-[#a9c2f3] bg-white/45 px-6 text-[16px] font-semibold text-[#102b66] backdrop-blur-sm transition-all duration-300 hover:border-blue-500 hover:bg-white/80"
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
        <div className="flex flex-row items-center gap-6">
          {/*Lembretes Inteligentes*/}
          <div className="flex max-w-[100px] flex-col items-center justify-center gap-3 text-center text-[14px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[var(--thirdary)]">
              <img
                src="/svg/notification-icon.svg"
                alt="Ícone"
                className="h-8 w-8 object-contain"
              />
            </div>

            <p className="w-full">Lembretes Inteligentes</p>
          </div>

          <div className="h-[80px] w-[2px] bg-gray-300" />

          {/*Acompanhamento pelo app*/}
          <div className="flex max-w-[100px] flex-col items-center justify-center gap-3 text-center text-[14px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[var(--thirdary)]">
              <img
                src="/svg/cellphone-icon.svg"
                alt="Ícone"
                className="h-6 w-6 object-contain"
              />
            </div>

            <p className="w-full">Acompanhamento pelo app</p>
          </div>

          <div className="h-[80px] w-[2px] bg-gray-300" />

          {/*Registros de uso*/}
          <div className="flex max-w-[100px] flex-col items-center justify-center gap-3 text-center text-[14px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[var(--thirdary)]">
              <img
                src="/svg/check-icon.svg"
                alt="Ícone"
                className="h-6 w-6 object-contain"
              />
            </div>

            <p className="w-full">Registros de uso</p>
          </div>
        </div>
      </div>

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