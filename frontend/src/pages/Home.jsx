import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  Sparkles,
  PawPrint,
  Flower2,
  FlaskConical,
  Factory,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import CertificatesStrip from "@/components/CertificatesStrip";
import {
  Reveal,
  CountUp,
  SectionHead,
  PillLink,
  CTABand,
} from "@/components/shared";
import { IMG, HERO_SLIDES } from "@/data/site";
import { getContent } from "@/lib/store";

const content = getContent();

const stats = [
  { k: "04", v: "Specialized production lines" },
  { k: "100%", v: "Batch-tested quality" },
  { k: "50+", v: "Brand partners" },
  { k: "24/7", v: "FDA-approved machines" },
];

const categories = [
  {
    icon: Baby,
    title: "Baby Wet Wipes",
    desc: "Gentle wet wipes, nourishing creams and oils designed for delicate baby skin.",
    img: IMG.baby,
    span: "lg:col-span-7",
    to: "/services",
    testId: "category-baby-care-card",
  },
  {
    icon: Sparkles,
    title: "Adult Personal Hygiene & Wellness",
    desc: "Refreshing wet wipes and hygiene solutions that support everyday comfort and confidence.",
    img: IMG.hygiene,
    span: "lg:col-span-5",
    to: "/services",
    testId: "category-adult-hygiene-card",
  },
  {
    icon: PawPrint,
    title: "Pet Care",
    desc: "Pet wet wipes and grooming essentials to keep pets clean, healthy and happy.",
    img: IMG.pet,
    span: "lg:col-span-5",
    to: "/services",
    testId: "category-pet-care-card",
  },
  {
    icon: Flower2,
    title: "Feminine Hygiene",
    desc: "Intimate wet wipes and feminine care products crafted with safety, sensitivity and trust.",
    img: IMG.feminineCare,
    span: "lg:col-span-7",
    to: "/services",
    testId: "category-feminine-hygiene-card",
  },
];

const manifesto = [
  { num: "01", title: "Our Mission", copy: content.mission },
  { num: "02", title: "Our Vision", copy: content.vision },
  {
    num: "03",
    title: "Our Values",
    copy: content.values,
    tags: ["Safety Before Speed", "Quality Without Compromise", "Radical Transparency", "Care in Every Detail"],
  },
];

const capabilityRows = [
  { num: "01", title: "Global Certifications", desc: "FDA, Sedex and ISO approved facility", icon: ShieldCheck },
  { num: "02", title: "Advanced Quality Systems", desc: "Pharma grade water purification with micro & QC labs", icon: FlaskConical },
  { num: "03", title: "Specialized Production Lines", desc: "Dedicated lines for every category", icon: Factory },
  { num: "04", title: "Innovation & Trust", desc: "R&D driven, rigorously tested", icon: Lightbulb },
];

export default function Home() {
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const yImg1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yImg2 = useTransform(scrollYProgress, [0, 1], [90, -70]);

  return (
    <div data-testid="home-page">
      <HeroSlider slides={HERO_SLIDES} />

      <CertificatesStrip />

      <section ref={aboutRef} className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead
              index="01"
              label="Who we are"
              title="Hygiene, engineered like medicine."
              desc="From premium wet wipes to everyday hygiene essentials, our mission is to deliver solutions that care for your skin and simplify your life. With a commitment to quality ingredients and thoughtful design, we bring innovation you can trust."
            />
            <Reveal delay={0.2} className="mt-10">
              <PillLink to="/about" variant="outline" testId="home-about-link">
                Our Story
              </PillLink>
            </Reveal>
            <Reveal delay={0.3} className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.k} data-testid={`home-stat-${s.k.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}>
                  <p className="font-display text-3xl font-black text-ink">
                    <CountUp value={s.k} />
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {s.v}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="relative lg:col-span-6">
            <motion.div style={{ y: yImg1 }} className="relative z-10 ml-auto w-4/5">
              <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] border border-border">
                <motion.img
                  src={IMG.cleanroom}
                  alt="KHPL clean room production unit"
                  className="aspect-[4/3] w-full object-cover"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </Reveal>
            </motion.div>
            <motion.div style={{ y: yImg2 }} className="relative z-20 -mt-24 w-3/5">
              <Reveal delay={0.25} className="overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                <motion.img
                  src={IMG.packing}
                  alt="KHPL automated packing machine"
                  className="aspect-[4/3] w-full object-cover"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </Reveal>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="02"
            label="What we make"
            title="Wet wipes and beyond. One standard of care."
            desc="From baby wet wipes to cosmetics and pet care — every range is developed in-house, tested batch by batch, and manufactured on dedicated production lines."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} y={48} className={c.span}>
                <a
                  href={c.to}
                  data-testid={c.testId}
                  className="group relative block h-80 overflow-hidden rounded-[2rem] border border-border sm:h-96"
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <c.icon className="h-6 w-6 text-brand" />
                    <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{c.desc}</p>
                  </div>
                  <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-colors duration-300 group-hover:bg-brand">
                    <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead index="03" label="What drives us" title="A manifesto of care." />
          <div className="mt-16">
            {manifesto.map((m, i) => (
              <Reveal key={m.num} delay={i * 0.06} x={-48} y={0}>
                <div
                  data-testid={`manifesto-${m.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group grid gap-6 border-t border-border py-12 transition-colors duration-300 hover:bg-neutral-50 lg:grid-cols-12 lg:items-start"
                >
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand lg:col-span-2">
                    /{m.num}
                  </p>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand sm:text-4xl lg:col-span-4">
                    {m.title}
                  </h3>
                  <div className="lg:col-span-6">
                    <p className="text-base md:text-lg leading-relaxed text-neutral-500">{m.copy}</p>
                    {m.tags && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {m.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-brand/30 bg-brand-light px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-24 text-white sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand">
              <span className="h-px w-10 bg-brand" />
              04 — Why KHPL
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
              Built for brands that refuse to compromise.
            </h2>
          </Reveal>
          <div className="mt-16">
            {capabilityRows.map((r, i) => (
              <Reveal key={r.num} delay={i * 0.05} x={-32} y={0}>
                <a
                  href="/capabilities"
                  data-testid={`capability-row-${r.num}`}
                  className="group grid items-center gap-4 border-t border-white/15 py-8 transition-colors duration-300 last:border-b hover:bg-white/5 sm:grid-cols-12 sm:px-4"
                >
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand sm:col-span-1">
                    {r.num}
                  </p>
                  <div className="flex items-center gap-4 sm:col-span-6">
                    <r.icon className="h-6 w-6 shrink-0 text-brand" />
                    <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {r.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 sm:col-span-4">{r.desc}</p>
                  <ArrowUpRight className="hidden h-6 w-6 text-brand transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:col-span-1 sm:block" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-24 sm:pt-32">
        <CTABand
          label="Partner with us"
          title="Ready to bring your product to market?"
          desc="Contract manufacturing from formulation to finished pack — share your brief and our team will respond."
          cta="Enquire Now"
        />
      </div>
    </div>
  );
}
