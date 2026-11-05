"use client";

import { useEffect, useState } from "react";

const navigationItems = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "dispositivo", label: "Dispositivo" },
  { id: "contact", label: "Contato" },
];

const GITHUB_URL = "https://github.com/raphaelsoares01/pillreminder";

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", `#${id}`);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let frame = 0;

    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      frame = 0;
      setHasScrolled(window.scrollY > 30);

      const marker = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sections[0];

      sections.forEach((section) => {
        if (section.offsetTop <= marker) {
          currentSection = section;
        }
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        hasScrolled
          ? "border-blue-100/70 bg-white/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-white/80 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:gap-6 sm:px-5 md:px-8 lg:px-12">
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => scrollToSection(event, "home")}
          aria-label="PillReminder - Início"
          className="shrink-0"
        >
          <img
            src="/images/new-logo-pillreminder.png"
            alt="PillReminder"
            className="h-12 w-auto object-contain sm:h-17"
          />
        </a>

        {/* Navegação */}
        <div className="hidden items-center justify-center gap-7 lg:flex xl:gap-9">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) =>
                  scrollToSection(event, item.id)
                }
                aria-current={isActive ? "location" : undefined}
                className={`relative whitespace-nowrap py-2 text-[15px] font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-blue-600 after:transition-transform after:duration-300 ${
                  isActive
                    ? "text-blue-600 after:scale-x-100"
                    : "text-[#172b59] after:scale-x-0 hover:text-blue-600 hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 active:translate-y-0 sm:px-6 sm:py-3 sm:text-[13px]"
          >
            <img
              src="/images/github-icon.png"
              alt="Play"
              className="h-[22px] w-[22px] brightness-0 invert"
            />
            <span className="hidden sm:inline">Ver no GitHub</span>
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-[#172b59] shadow-sm lg:hidden"
          >
            <span className="sr-only">
              {isMenuOpen ? "Fechar menu" : "Abrir menu"}
            </span>
            <span className="flex flex-col gap-1">
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-blue-100 bg-white p-3 shadow-lg lg:hidden">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => scrollToSection(event, item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-[#172b59] hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}