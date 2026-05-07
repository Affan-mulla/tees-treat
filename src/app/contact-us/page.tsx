"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// ─── EMAILJS CONFIG ────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

// ─── DATA ──────────────────────────────────────────────────────────────────
const TOPICS = [
  "Custom Cake Order",
  "General Enquiry",
  "Wholesale / Events",
  "Feedback",
  "Something Else",
];

const CONTACT_METHODS = ["Email", "Phone", "Either"];

const FAQS = [
  {
    q: "Do you take walk-ins?",
    a: "Yes — come in any time we're open. No booking needed for coffee and bakes. Just turn up and we'll sort you out.",
  },
  {
    q: "Can I order a custom cake?",
    a: "Absolutely. Drop us a message using the form with your date and what you have in mind. We'll get back to you within 48 hours to talk through the details.",
  },
  {
    q: "Are you dog friendly?",
    a: "Always. Bring them in — water bowl's ready and they might even get a treat. Four legs are as welcome as two.",
  },
  {
    q: "Where can I park?",
    a: "There's street parking available on Stonelaw Road right outside. Bus routes 18 and 31 also stop nearby if you're coming by public transport.",
  },
  {
    q: "How quickly will you reply to messages?",
    a: "Within 48 hours — usually faster. If it's urgent, give us a call on 0141 471 2727 and we'll pick up when we're in.",
  },
];

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef   = useRef<HTMLSpanElement>(null);

  const toggle = () => {
    const el = answerRef.current;
    if (!el) return;

    if (!open) {
      // Open — smooth entrance
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.5, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }
      );
      gsap.to(iconRef.current, { rotate: 45, duration: 0.4, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" });
    } else {
      // Close — smooth exit
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: "cubic-bezier(0.55, 0.055, 0.675, 0.19)" });
      gsap.to(iconRef.current, { rotate: 0, duration: 0.4, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" });
    }
    setOpen(!open);
  };

  return (
    <div
      className="w-full border-b border-[#1A1A1A]/10 py-6 cursor-pointer"
      onClick={toggle}
    >
      <div className="flex items-start justify-between gap-8">
        {/* Number + Question */}
        <div className="flex items-start gap-5">
          <span className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] tracking-[2px] text-[#E8470A] opacity-50 mt-1 flex-shrink-0">
            0{index + 1}
          </span>
          <h3 className="font-caprasimo text-[#1A1A1A] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.2]">
            {q}
          </h3>
        </div>

        {/* Icon */}
        <span
          ref={iconRef}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#E8470A] text-[clamp(1rem,3vw,1.125rem)] mt-0.5"
          style={{ willChange: "transform" }}
        >
          +
        </span>
      </div>

      {/* Answer */}
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="font-dmsans text-[#1A1A1A] opacity-55 text-[clamp(0.95rem,3vw,1rem)] leading-[1.8] pt-4 pl-9 max-w-2xl">
          {a}
        </p>
      </div>
    </div>
  );
}

// ─── FORM FIELD ────────────────────────────────────────────────────────────
function Field({ label, error, children }: {
  label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[2px] text-[#1A1A1A] opacity-40">
        {label}
      </label>
      {children}
      {error && (
        <span className="font-outfit text-[clamp(0.7rem,2.4vw,0.8rem)] text-[#E8470A]">{error}</span>
      )}
    </div>
  );
}

const inputClass = `
  w-full bg-transparent border-b border-[#1A1A1A]/15
  font-dmsans text-[clamp(0.95rem,3vw,1rem)] text-[#1A1A1A]
  py-3 px-0 outline-none
  placeholder:text-[#1A1A1A]/25
  focus:border-[#E8470A]
  transition-colors duration-200
`;

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef   = useRef<HTMLElement>(null);
  const splitRef  = useRef<HTMLElement>(null);
  const faqRef    = useRef<HTMLElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "", email: "", phone: "",
    topic: "", contact_method: "", date: "", message: "",
  });

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Hero words ─────────────────────────────────────────────────
      const heroWords = heroRef.current?.querySelectorAll<HTMLSpanElement>(".word");
      if (heroWords?.length) {
        gsap.fromTo(heroWords,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", stagger: 0.045, delay: 0.2 }
        );
      }

      gsap.fromTo(
        heroRef.current?.querySelector(".hero-sub") as HTMLElement,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", delay: 0.7 }
      );

      // ── Split section — desktop x, mobile y ─────────────────────
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          splitRef.current?.querySelector(".split-left") as HTMLElement,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            scrollTrigger: {
              trigger: splitRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          splitRef.current?.querySelector(".split-right") as HTMLElement,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            scrollTrigger: {
              trigger: splitRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          splitRef.current?.querySelector(".split-left") as HTMLElement,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            scrollTrigger: {
              trigger: splitRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          splitRef.current?.querySelector(".split-right") as HTMLElement,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            scrollTrigger: {
              trigger: splitRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // ── FAQ headline ───────────────────────────────────────────────
      const faqWords = faqRef.current?.querySelectorAll<HTMLSpanElement>(".faq-word");
      if (faqWords?.length) {
        gsap.fromTo(faqWords,
          { y: "110%", opacity: 0 },
          {
            y: "0%", opacity: 1,
            duration: 0.75, ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", stagger: 0.045,
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── FAQ items stagger ──────────────────────────────────────────
      gsap.fromTo(
        faqRef.current?.querySelectorAll(".faq-item") as NodeListOf<HTMLElement>,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", stagger: 0.06,
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Parallax on FAQ section as footer approaches ─────────────
      gsap.to(faqRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1.8,
          markers: false,
        },
      });

      return () => mm.revert();
    });
    return () => ctx.revert();
  }, []);

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim())    e.name    = "Name is required";
    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email))
      e.email = "Valid email required";
    if (!values.topic)          e.topic   = "Please select a topic";
    if (!values.message.trim()) e.message = "Please tell us a bit more";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:       values.name,
        from_email:      values.email,
        phone:           values.phone,
        topic:           values.topic,
        contact_method:  values.contact_method,
        ideal_date:      values.date,
        message:         values.message,
      });
      setStatus("success");
      gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power3.in" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(err => { const n = { ...err }; delete n[e.target.name]; return n; });
  };

  const HEADLINE = "Tell us what you're craving. We'll handle the details.";

  return (
    <main className="bg-[#FFF5EC] min-h-screen relative z-10">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[60svh] flex flex-col justify-center px-5 md:px-8 lg:px-16 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24 lg:pb-32 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Noise */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%">
            <filter id="contact-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#contact-noise)" opacity="0.04"/>
          </svg>
        </div>

        <p className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#1A1A1A] opacity-30 mb-6">
          Contact Us
        </p>

        {/* Split headline — first half chalk, second half orange */}
        <h1 className="font-caprasimo text-[clamp(2rem,6vw,5rem)] leading-none max-w-4xl">
          {HEADLINE.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
              <span
                className="word inline-block"
                style={{
                  color: i >= 7 ? "#E8470A" : "#1A1A1A",
                  willChange: "transform, opacity",
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub font-dmsans text-chalk opacity-50 text-[clamp(0.95rem,3vw,1.125rem)] tracking-tight leading-normal max-w-md mt-6 ">
          Whether it&apos;s coffee for a team, weekend bakes, or a cozy celebration — 
          drop us a note. We&apos;ll reply within 24–48 hours with the next steps.
        </p>
      </section>

      {/* ── SPLIT — Left context + Right form ─────────────────────────── */}
      <section
        ref={splitRef}
        className="w-full px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-start">

          {/* LEFT — Context + trust */}
          <div className="split-left flex flex-col gap-8 md:sticky md:top-28">
            <div className="flex flex-col gap-3">
              <p className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#1A1A1A] opacity-30">
                Get in touch
              </p>
              <h2 className="font-caprasimo text-[#1A1A1A] text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.1]">
                We&apos;re a small team.<br />We read every message.
              </h2>
              <p className="font-dmsans text-chalk opacity-50 text-[clamp(0.95rem,3vw,1rem)] leading-[1.8]">
                No bots. No automated replies. Just Tee and the team 
                getting back to you as soon as we can.
              </p>
            </div>

            {/* Direct contact */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:01414712727"
                className="font-caprasimo text-[#E8470A] text-[clamp(1.4rem,4vw,1.8rem)] leading-none hover:opacity-70 transition-opacity duration-200 w-fit"
              >
                0141 471 2727
              </a>
              <p className="font-outfit text-[clamp(0.7rem,2.4vw,0.8rem)] text-[#1A1A1A] opacity-30 uppercase tracking-[1px]">
                Available Fri · Sat · Sun during opening hours
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-3 pt-2">
              {[
                "Reply within 48 hours",
                "No automated responses",
                "Open Fri, Sat & Sun",
                "Dogs welcome 🐾",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#E8470A] text-sm">✓</span>
                  <span className="font-dmsans text-[clamp(0.75rem,2.6vw,0.875rem)] text-[#1A1A1A] opacity-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="split-right">

            {/* Success */}
            {status === "success" && (
              <div className="flex flex-col items-start gap-6 py-16">
                <span className="text-[clamp(2.2rem,7vw,3rem)]">✉️</span>
                <h3 className="font-caprasimo text-[#1A1A1A] text-[clamp(1.6rem,5vw,2rem)] leading-[1.1]">
                  Message sent.
                </h3>
                <p className="font-dmsans text-[#1A1A1A] opacity-55 text-[clamp(0.95rem,3vw,1rem)] leading-[1.8] max-w-sm">
                  We&apos;ve got your message and we&apos;ll be back in touch within 48 hours. 
                  See you at the weekend.
                </p>
              </div>
            )}

            {status !== "success" && (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                noValidate
              >
                {/* Row 1 — Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Your Name *" error={errors.name}>
                    <input name="name" type="text" value={values.name}
                      onChange={handleChange} placeholder="Alex Porter"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input name="email" type="email" value={values.email}
                      onChange={handleChange} placeholder="hello@email.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Row 2 — Phone + Topic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Phone Number">
                    <input name="phone" type="tel" value={values.phone}
                      onChange={handleChange} placeholder="07700 000000"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Topic *" error={errors.topic}>
                    <div className="relative">
                      <select name="topic" value={values.topic}
                        onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select a topic</option>
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1A1A1A] opacity-30 pointer-events-none text-sm">↓</span>
                    </div>
                  </Field>
                </div>

                {/* Row 3 — Contact method + Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Preferred Contact Method">
                    <div className="relative">
                      <select name="contact_method" value={values.contact_method}
                        onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select a preference</option>
                        {CONTACT_METHODS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1A1A1A] opacity-30 pointer-events-none text-sm">↓</span>
                    </div>
                  </Field>
                  <Field label="Ideal Visit Date">
                    <input name="date" type="date" value={values.date}
                      onChange={handleChange}
                      className={inputClass}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field label="Your Message *" error={errors.message}>
                  <textarea name="message" value={values.message}
                    onChange={handleChange} rows={5}
                    placeholder="Let us know the date, headcount, and any must-haves."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {/* Submit */}
                <div className="flex flex-col gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="
                      inline-flex items-center gap-3
                      bg-[#E8470A] text-[#FFF5EC]
                      px-8 py-4 rounded-full w-fit
                      font-outfit text-[clamp(0.75rem,2.6vw,0.85rem)] font-semibold uppercase tracking-[1px]
                      hover:bg-[#F26522] transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    onMouseEnter={(e) => {
                      if (status !== "sending")
                        gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    {status !== "sending" && <span>→</span>}
                  </button>

                  {status === "error" && (
                    <p className="font-dmsans text-[clamp(0.75rem,2.6vw,0.875rem)] text-[#E8470A]">
                      Something went wrong. Call us on 0141 471 2727.
                    </p>
                  )}

                  <p className="font-dmsans text-[clamp(0.65rem,2.4vw,0.75rem)] text-[#1A1A1A] opacity-55 leading-[1.6] max-w-sm">
                    By submitting this form you agree to be contacted about your enquiry. 
                    Your details are never shared with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section
        ref={faqRef}
        className="w-full px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row mx-auto"
      >
        {/* FAQ Headline */}
        <div className="mb-14">
          <p className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#1A1A1A] opacity-30 mb-4">
            FAQ
          </p>
          <h2 className="font-caprasimo text-[#1A1A1A] text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] max-w-xl overflow-hidden">
            {"Quick answers before you visit.".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
                <span className="faq-word inline-block" style={{ willChange: "transform, opacity" }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <FAQItem q={faq.q} a={faq.a} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM STRIP ──────────────────────────────────────────────── */}
      <div className="w-full py-8 px-5 md:px-8 lg:px-16 text-center" style={{ backgroundColor: "#E8470A" }}>
        <p className="font-caprasimo text-[#FFF5EC] text-[clamp(1rem,2.5vw,1.4rem)]">
          Open every Friday, Saturday & Sunday · 90 Stonelaw Road, Rutherglen · 0141 471 2727
        </p>
      </div>

    </main>
  );
}
