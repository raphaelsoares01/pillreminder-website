"use client";

import { useEffect, useState } from "react";
import React from "react";

export default function Device() {
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [viewerError, setViewerError] = useState(false);

  useEffect(() => {
    import("@google/model-viewer")
      .then(() => setIsViewerReady(true))
      .catch((error) => {
        console.error("Não foi possível carregar o visualizador 3D.", error);
        setViewerError(true);
      });
  }, []);

  return (
    <section
      id="dispositivo"
      className="overflow-x-clip bg-[#f7faff] pb-16 pt-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-12 px-5 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:gap-8 lg:gap-20 lg:px-12">
        <div className="order-1 md:order-1">
          <div className="mb-3 flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--primary)]">
            <div className="h-0.5 w-12 rounded-full bg-[var(--primary)]" />
            O dispositivo
          </div>
          <h2 className="max-w-[620px] text-[clamp(2.5rem,4.2vw,4.55rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[var(--title)]">
            Conheça o nosso {" "}
            <span className="text-[var(--primary)]">dispositivo físico.</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[18px] leading-[1.8] text-[var(--text)]">
            Conheça o dispositivo físico do PillReminder em todos os detalhes.
            Arraste para girar o modelo e use o zoom para explorar cada parte.
          </p>
          <p className="mt-6 max-w-[560px] text-[18px] leading-[1.8] text-[var(--text)]">
            Essa versão do dispositivo permite que o usuário utilize o PillReminder a qualquer distância, sem a necessidade de estar próximo do smartphone. Ele é portátil, fácil de usar e possui alertas visuais e sonoros para lembrar o usuário de tomar seus medicamentos.
          </p>

          <div className="mt-8 grid max-w-[560px] gap-3 sm:grid-cols-3">
            {[
              ["01", "Alertas visuais e sonoros"],
              ["02", "Conexão com o aplicativo"],
              ["03", "Portátil e fácil de usar"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm"
              >
                <span className="text-sm font-bold text-[var(--primary)]">
                  {number}
                </span>
                <p className="mt-2 text-sm font-semibold leading-snug text-[var(--title)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-2 min-w-0 md:order-2">
          <div className="relative mx-auto flex min-h-[360px] w-full max-w-[700px] items-center justify-center overflow-hidden rounded-[2rem] border border-blue-100 bg-white px-3 py-8 shadow-[0_24px_70px_rgba(27,83,180,0.12)] sm:min-h-[470px] sm:px-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-100/60 blur-3xl" />
            {isViewerReady ? (
              React.createElement("model-viewer", {
                src: "/3d/PillReminder%203d%20Box%202.glb",
                alt: "Modelo 3D do dispositivo PillReminder",
                "camera-controls": true,
                "auto-rotate": true,
                "rotation-per-second": "18deg",
                "interaction-prompt": "auto",
                "touch-action": "pan-y",
                exposure: "1",
                "shadow-intensity": "1",
                className: "relative z-10 h-full min-h-[310px] w-full sm:min-h-[420px]",
              })
            ) : viewerError ? (
              <div className="relative z-10 flex min-h-[310px] max-w-[280px] items-center justify-center text-center text-sm font-medium text-[var(--text)] sm:min-h-[420px]">
                Não foi possível carregar o modelo 3D. Tente atualizar a
                página.
              </div>
            ) : (
              <div className="relative z-10 flex min-h-[310px] items-center justify-center text-sm font-medium text-[var(--text)] sm:min-h-[420px]">
                Carregando modelo 3D...
              </div>
            )}
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/85 px-4 py-2 text-center text-xs font-medium text-[var(--text)] shadow-sm backdrop-blur-sm">
              Arraste para rotacionar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}