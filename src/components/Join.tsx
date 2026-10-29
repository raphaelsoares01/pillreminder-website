
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface JoinProps {
  onComplete: () => void;
}

export default function Join({ onComplete }: JoinProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const pill = pillRef.current;
    const name = nameRef.current;

    if (!overlay || !pill || !name) return;

    const ctx = gsap.context(() => {
      const textWidth = name.scrollWidth;
      const startX = textWidth;
      const revealDelay = 0.2;
      const travelDuration = 1.35;

      const pillMovement = { progress: 0 };
      const textReveal = { progress: 0 };

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
      <div className="relative flex h-40 w-[min(96vw,900px)] items-center">
        <h1
          ref={nameRef}
          className="absolute left-0 whitespace-nowrap pl-[clamp(100px,16vw,170px)] text-5xl font-extrabold tracking-tight text-[#102D69] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          PillReminder
        </h1>

        <img
          ref={pillRef}
          src="/images/only-pill-new-logo.png"
          alt=""
          className="absolute left-0 z-10 w-[clamp(96px,15vw,160px)]"
        />
      </div>
    </div>
  );
}
