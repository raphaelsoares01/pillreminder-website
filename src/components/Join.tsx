
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface JoinProps {
  onComplete: () => void;
}

export default function Join({ onComplete }: JoinProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    const pill = pillRef.current;
    const name = nameRef.current;

    if (!overlay || !stage || !pill || !name) return;

    const ctx = gsap.context(() => {
      const textWidth = name.scrollWidth;
      const pillWidth = Math.min(160, Math.max(68, window.innerWidth * 0.15));
      const startX = Math.max(0, textWidth - pillWidth);
      const revealDelay = 0.2;
      const travelDuration = 1.35;

      const pillMovement = { progress: 0 };
      const textReveal = { progress: 0 };

      gsap.set(stage, {
        width: textWidth,
      });

      gsap.set(name, {
        clipPath: `inset(0 0 0 ${textWidth + 2}px)`,
      });

      gsap.set(pill, {
        x: startX,
        y: -window.innerHeight,
        rotation: -12,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current(),
      });

      tl.to(pill, {
        y: 10,
        rotation: 7,
        duration: 0.95,
        ease: "power2.in",
      })
        .to(pill, {
          y: -6,
          rotation: 2,
          duration: 0.16,
          ease: "power2.out",
        })
        .to(pill, {
          y: 0,
          rotation: 0,
          duration: 0.2,
          ease: "back.out(1.4)",
        })
        .to({}, { duration: 0.18 });

      tl.add("travel");

      tl.to(
        pillMovement,
        {
          progress: 1,
          duration: travelDuration,
          ease: "power1.inOut",
          onUpdate: () => {
            gsap.set(pill, {
              x: startX * (1 - pillMovement.progress),
            });
          },
        },
        "travel"
      );

      tl.to(
        textReveal,
        {
          progress: 1,
          duration: travelDuration,
          ease: "power1.inOut",
          onUpdate: () => {
            const visibleWidth = textWidth * textReveal.progress;

            gsap.set(name, {
              clipPath: `inset(0 0 0 ${
                textWidth - visibleWidth
              }px)`,
            });
          },
        },
        `travel+=${revealDelay}`
      );

      tl.to(pill, {
        x: -3,
        rotation: -3,
        duration: 0.055,
        ease: "none",
      })
        .to(pill, {
          x: 3,
          rotation: 3,
          duration: 0.055,
          ease: "none",
        })
        .to(pill, {
          x: -2,
          rotation: -2,
          duration: 0.05,
          ease: "none",
        })
        .to(pill, {
          x: 2,
          rotation: 2,
          duration: 0.05,
          ease: "none",
        })
        .to(pill, {
          x: 0,
          rotation: 0,
          duration: 0.09,
          ease: "power1.out",
        });

      tl.to({}, { duration: 0.3 });

      tl.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
    }, overlay);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
    >
      <div ref={stageRef} className="relative flex h-40 items-center">
        <h1
          ref={nameRef}
          style={{ clipPath: "inset(0 0 0 100%)" }}
          className="absolute left-0 whitespace-nowrap pl-[clamp(68px,16vw,170px)] text-[clamp(1.75rem,10vw,9rem)] font-extrabold leading-none tracking-tight text-[#102D69]"
        >
          PillReminder
        </h1>

        <img
          ref={pillRef}
          src="/images/only-pill-new-logo.png"
          alt=""
          className="absolute left-0 z-10 w-[clamp(68px,15vw,160px)]"
        />
      </div>
    </div>
  );
}
