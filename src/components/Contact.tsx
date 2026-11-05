"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "pillreminder.contato@gmail.com";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSent, setIsSent] = useState(false);

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
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "Contato pelo site");
    const message = String(formData.get("message") ?? "");
    const body = `Nome: ${name}\nE-mail: ${email}\n\n${message}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setIsSent(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`overflow-x-clip bg-white px-5 py-16 sm:px-8 sm:py-28 lg:px-12 lg:py-36 ${
        isVisible ? "contact-section-visible" : "contact-section"
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <div className="mb-3 flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--primary)]">
            <div className="h-0.5 w-12 rounded-full bg-[var(--primary)]" />
            Entre em contato
          </div>
          <h2 className="max-w-[560px] text-[clamp(2.5rem,4.2vw,4.55rem)] font-bold leading-[1.04] tracking-[-0.055em] text-[var(--title)]">
            Vamos conversar sobre o{" "}
            <span className="text-[var(--primary)]">PillReminder?</span>
          </h2>
          <p className="mt-6 max-w-[500px] text-[18px] leading-[1.8] text-[var(--text)]">
            Tem dúvidas, sugestões ou quer saber mais sobre o projeto? Envie
            uma mensagem e nossa equipe ficará feliz em responder.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex items-center gap-3 text-base font-semibold text-[var(--title)] transition-colors hover:text-[var(--primary)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--thirdary)] text-xl text-[var(--primary)]">
              @
            </span>
            {CONTACT_EMAIL}
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-blue-100 bg-[#f7faff] p-6 shadow-[0_20px_60px_rgba(27,83,180,0.08)] sm:p-8 lg:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[var(--title)]">
              Nome
              <input
                name="name"
                required
                type="text"
                placeholder="Como podemos chamar você?"
                className="contact-input"
              />
            </label>
            <label className="text-sm font-semibold text-[var(--title)]">
              E-mail
              <input
                name="email"
                required
                type="email"
                placeholder="voce@email.com"
                className="contact-input"
              />
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-[var(--title)]">
            Assunto
            <select name="subject" defaultValue="Dúvida sobre o projeto" className="contact-input">
              <option>Dúvida sobre o projeto</option>
              <option>Sugestão</option>
              <option>Parceria</option>
              <option>Outro assunto</option>
            </select>
          </label>
          <label className="mt-5 block text-sm font-semibold text-[var(--title)]">
            Mensagem
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Escreva sua mensagem..."
              className="contact-input resize-y"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-gradient-to-r from-[#0750dc] to-[#367aff] px-7 text-base font-semibold text-white shadow-[0_8px_24px_rgba(30,100,240,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(30,100,240,0.28)]"
          >
            Enviar mensagem
          </button>
          {isSent && (
            <p className="mt-4 text-sm font-medium text-green-700" role="status">
              Seu aplicativo de e-mail foi aberto para concluir o envio.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
