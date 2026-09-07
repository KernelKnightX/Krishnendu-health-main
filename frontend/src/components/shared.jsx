import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Asterisk } from "lucide-react";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 36, x = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const Fade = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const CountUp = ({ value, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (inView && match) mv.set(target);
  }, [inView, match, mv, target]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      {String(display ?? 0).padStart(match[1].length, "0")}
      {match[2]}
    </span>
  );
};

export const MaskedLines = ({ lines, delay = 0 }) => (
  <>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <motion.span
          className="block will-change-transform"
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.13, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </>
);

export const Label = ({ children, light = false, className = "" }) => (
  <span
    className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${
      light ? "text-white" : "text-brand"
    } ${className}`}
  >
    <span className={`h-px w-10 ${light ? "bg-white" : "bg-brand"}`} />
    {children}
  </span>
);

export const SectionHead = ({ index, label, title, desc, className = "" }) => (
  <div className={`max-w-3xl ${className}`}>
    <Reveal>
      <Label>
        {index} — {label}
      </Label>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-6 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
        {title}
      </h2>
    </Reveal>
    {desc && (
      <Reveal delay={0.16}>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-500">
          {desc}
        </p>
      </Reveal>
    )}
  </div>
);

export const PillLink = ({
  to,
  children,
  variant = "primary",
  testId,
  className = "",
}) => {
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-dark"
      : "border border-ink/15 text-ink hover:border-brand hover:text-brand";
  return (
    <Link
      to={to}
      data-testid={testId}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 active:scale-95 ${styles} ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
};

export const Marquee = ({ items }) => (
  <div
    data-testid="certifications-marquee"
    className="overflow-hidden border-y border-border bg-brand-light/60 py-5"
  >
    <div className="marquee-track flex w-max items-center">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="flex items-center whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-brand"
        >
          <span className="px-8">{item}</span>
          <Asterisk className="h-4 w-4 shrink-0" />
        </span>
      ))}
    </div>
  </div>
);

export const PageHero = ({ index, label, lines, desc, children }) => (
  <section className="relative overflow-hidden px-4 pt-28 sm:px-8 sm:pt-32">
    <div className="mx-auto max-w-7xl border-b border-border pb-14 sm:pb-20">
      <Fade>
        <Label>
          {index} — {label}
        </Label>
      </Fade>
      <h1 className="mt-8 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink leading-[1.04]">
        <MaskedLines lines={lines} delay={0.15} />
      </h1>
      {desc && (
        <Fade delay={0.5}>
          <p className="mt-8 max-w-4xl text-base md:text-lg leading-relaxed text-neutral-500">
            {desc}
          </p>
        </Fade>
      )}
      {children}
    </div>
  </section>
);

export const CTABand = ({
  label = "Partner with us",
  title = "Have a product idea?",
  desc = "Tell us about your brand and let our R&D and manufacturing teams take it from concept to shelf.",
  cta = "Enquire Now",
}) => (
  <section className="px-4 pb-24 pt-4 sm:px-8">
    <Reveal className="mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-8 py-16 sm:px-16 sm:py-20">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-48 h-48 w-48 rounded-full bg-white/10" />
        <Label light>{label}</Label>
        <h2 className="mt-6 max-w-4xl font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
          {title}
        </h2>
        {desc && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            {desc}
          </p>
        )}
        <Link
          to="/contact"
          data-testid="cta-band-button"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Reveal>
  </section>
);
