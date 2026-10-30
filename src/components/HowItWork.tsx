
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
  const stageRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isStageVisible, setIsStageVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!("IntersectionObserver" in window)) {
      setIsContentVisible(true);
      setIsStageVisible(true);
      return;
    }

    const contentObserver = section
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsContentVisible(true);
              contentObserver.disconnect();
            }
          },
          { threshold: 0.18 },
        )
      : null;

    const stageObserver = stage
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsStageVisible(true);
              stageObserver.disconnect();
            }
          },
          { threshold: 0.2 },
        )
      : null;

    if (section) contentObserver?.observe(section);
    if (stage) stageObserver?.observe(stage);

    return () => {
      contentObserver?.disconnect();
      stageObserver?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="how-it-work-section overflow-x-clip"
    >
      <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center px-4 py-24 sm:px-6 md:px-8 lg:px-12">

        {/* Título e descrição */}
        <div
          className={`how-it-work-content w-full max-w-[1100px] ${
            isContentVisible ? "how-it-work-content-visible" : ""
          }`}
        >
          <div className="mb-3 flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--primary)]">
            <div className="h-0.5 w-12 rounded-full bg-[var(--primary)]" />
            Como funciona
            <div className="h-0.5 w-12 rounded-full bg-[var(--primary)]" />
          </div>

          <h2 className="text-center text-[clamp(2.5rem,4.2vw,4.55rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[var(--title)]">
            Como dar início aos{" "}
            <span className="text-[var(--primary)]">seus cuidados</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[620px] text-center text-[18px] leading-[1.8] text-[var(--text)]">
            Acompanhe cada etapa da experiência do PillReminder pelo aplicativo,
            de forma simples e integrada.
          </p>
        </div>

        {/* Cards das etapas */}
        <div className="mt-20 grid w-full grid-cols-1 gap-y-12 min-[600px]:grid-cols-4 min-[600px]:gap-x-6 min-[800px]:gap-x-7 min-[1100px]:gap-x-10 min-[1400px]:gap-x-14">

          {/* Monte seu perfil */}
          <div className="flex min-w-0 max-w-[330px] items-start gap-3 min-[600px]:gap-2 min-[800px]:gap-3 min-[1100px]:gap-4 min-[1400px]:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[30%] bg-[var(--thirdary)] min-[600px]:h-10 min-[600px]:w-10 min-[800px]:h-12 min-[800px]:w-12 min-[1100px]:h-14 min-[1100px]:w-14 min-[1400px]:h-16 min-[1400px]:w-16">
              <img
                src="/svg/login-icon.svg"
                alt=""
                className="h-11 w-11 object-contain min-[600px]:h-7 min-[600px]:w-7 min-[800px]:h-8 min-[800px]:w-8 min-[1100px]:h-9 min-[1100px]:w-9 min-[1400px]:h-11 min-[1400px]:w-11"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[12px] font-bold text-[var(--primary)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px]">
                01
              </p>
              <h3 className="mb-3 text-start text-[19px] font-bold leading-snug text-[var(--title)] min-[600px]:text-[12px] min-[800px]:text-[14px] min-[1100px]:text-[16px] min-[1400px]:text-[19px]">
                Monte seu perfil
              </h3>
              <p className="text-start text-[14px] leading-[1.8] text-[var(--text)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px] min-[1400px]:text-[14px]">
                Nos conte um pouco sobre suas características para personalizar
                sua experiência.
              </p>
            </div>
          </div>

          {/* Conecte seu dispositivo */}
          <div className="flex min-w-0 max-w-[330px] items-start gap-3 min-[600px]:gap-2 min-[800px]:gap-3 min-[1100px]:gap-4 min-[1400px]:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[30%] bg-[var(--thirdary)] min-[600px]:h-10 min-[600px]:w-10 min-[800px]:h-12 min-[800px]:w-12 min-[1100px]:h-14 min-[1100px]:w-14 min-[1400px]:h-16 min-[1400px]:w-16">
              <img
                src="/svg/qr-code-icon.svg"
                alt=""
                className="h-11 w-11 object-contain min-[600px]:h-7 min-[600px]:w-7 min-[800px]:h-8 min-[800px]:w-8 min-[1100px]:h-9 min-[1100px]:w-9 min-[1400px]:h-11 min-[1400px]:w-11"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[12px] font-bold text-[var(--primary)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px]">
                02
              </p>
              <h3 className="mb-3 text-start text-[19px] font-bold leading-snug text-[var(--title)] min-[600px]:text-[12px] min-[800px]:text-[14px] min-[1100px]:text-[16px] min-[1400px]:text-[19px]">
                Conecte seu dispositivo
              </h3>
              <p className="text-start text-[14px] leading-[1.8] text-[var(--text)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px] min-[1400px]:text-[14px]">
                Conecte seu dispositivo ao aplicativo via QR Code ou código
                manual para começar a usar todas as funcionalidades.
              </p>
            </div>
          </div>

          {/* Confirme sua conexão */}
          <div className="flex min-w-0 max-w-[330px] items-start gap-3 min-[600px]:gap-2 min-[800px]:gap-3 min-[1100px]:gap-4 min-[1400px]:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[30%] bg-[var(--thirdary)] min-[600px]:h-10 min-[600px]:w-10 min-[800px]:h-12 min-[800px]:w-12 min-[1100px]:h-14 min-[1100px]:w-14 min-[1400px]:h-16 min-[1400px]:w-16">
              <img
                src="/svg/check-icon.svg"
                alt=""
                className="h-11 w-11 object-contain min-[600px]:h-7 min-[600px]:w-7 min-[800px]:h-8 min-[800px]:w-8 min-[1100px]:h-9 min-[1100px]:w-9 min-[1400px]:h-11 min-[1400px]:w-11"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[12px] font-bold text-[var(--primary)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px]">
                03
              </p>
              <h3 className="mb-3 text-start text-[19px] font-bold leading-snug text-[var(--title)] min-[600px]:text-[12px] min-[800px]:text-[14px] min-[1100px]:text-[16px] min-[1400px]:text-[19px]">
                Confirme sua conexão
              </h3>
              <p className="text-start text-[14px] leading-[1.8] text-[var(--text)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px] min-[1400px]:text-[14px]">
                Confirme a conexão do seu dispositivo com o aplicativo.
              </p>
            </div>
          </div>

          {/* Planeje suas doses */}
          <div className="flex min-w-0 max-w-[330px] items-start gap-3 min-[600px]:gap-2 min-[800px]:gap-3 min-[1100px]:gap-4 min-[1400px]:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[30%] bg-[var(--thirdary)] min-[600px]:h-10 min-[600px]:w-10 min-[800px]:h-12 min-[800px]:w-12 min-[1100px]:h-14 min-[1100px]:w-14 min-[1400px]:h-16 min-[1400px]:w-16">
              <img
                src="/svg/timer-icon.svg"
                alt=""
                className="h-11 w-11 object-contain min-[600px]:h-7 min-[600px]:w-7 min-[800px]:h-8 min-[800px]:w-8 min-[1100px]:h-9 min-[1100px]:w-9 min-[1400px]:h-11 min-[1400px]:w-11"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[12px] font-bold text-[var(--primary)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px]">
                04
              </p>
              <h3 className="mb-3 text-start text-[19px] font-bold leading-snug text-[var(--title)] min-[600px]:text-[12px] min-[800px]:text-[14px] min-[1100px]:text-[16px] min-[1400px]:text-[19px]">
                Planeje suas doses
              </h3>
              <p className="text-start text-[14px] leading-[1.8] text-[var(--text)] min-[600px]:text-[10px] min-[800px]:text-[11px] min-[1100px]:text-[12px] min-[1400px]:text-[14px]">
                Configure os horários e doses dos seus medicamentos para receber
                lembretes e manter sua rotina de cuidados.
              </p>
            </div>
          </div>
        </div>

        {/* Imagens das telas do aplicativo */}
        <div
          ref={stageRef}
          className={`how-it-work-stage ${
            isStageVisible ? "how-it-work-stage-visible" : ""
          }`}
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