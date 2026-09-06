import {
  Factory,
  Handshake,
  ShieldCheck,
  Workflow,
  Sparkles,
  Layers,
  Microscope,
  FlaskConical,
} from "lucide-react";
import { PageHero, SectionHead, Reveal, Marquee, CTABand } from "@/components/shared";
import { IMG } from "@/data/site";
import { getContent } from "@/lib/store";

const facility = [
  {
    icon: Factory,
    title: "World-Class Manufacturing Plant",
    copy: "A purpose-built facility engineered for hygiene manufacturing at scale, designed around global best practices from day one.",
  },
  {
    icon: Handshake,
    title: "Relationships Built on Trust",
    copy: "We believe long-term success comes from strong partnerships. Our relationships with clients and stakeholders are built on transparency, reliability and mutual trust.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    copy: "Every product is developed under strict quality protocols, ensuring safety, consistency and performance at every stage of production.",
  },
  {
    icon: Workflow,
    title: "Pharma Grade Water Purification",
    copy: "Our pharma-grade RO water purification system ensures every formulation starts with the highest quality purified water, meeting stringent hygiene and safety standards.",
  },
  {
    icon: Sparkles,
    title: "Designated Clean Rooms",
    copy: "Controlled clean room environments guarantee hygiene and purity, maintaining the highest standards in production.",
  },
  {
    icon: Layers,
    title: "Multiple Production Lines",
    copy: "Specialized lines are dedicated to different product categories, ensuring flexibility, efficiency and precision in manufacturing.",
  },
  {
    icon: Microscope,
    title: "Micro & Quality Control Labs",
    copy: "In-house micro and QC labs provide continuous monitoring and testing, safeguarding product integrity and compliance.",
  },
  {
    icon: FlaskConical,
    title: "Dedicated R&D Experts",
    copy: "Our research and development team drives innovation, creating tailored solutions that meet evolving consumer needs.",
  },
];

const clientNames = [
  "Amazon",
  "Lifestyle Group",
  "Reliance",
  "Morrison",
  "Flipkart",
  "Piramal",
  "FirstCry",
  "Pigeon",
  "Medplus",
  "Swara Baby",
  "Vishal Mega Mart",
  "Sirona",
  "Mothercare",
];

const tourClips = [
  {
    src: "/videos/tour-drone.mp4",
    poster: "/images/factory/tour-drone.jpg",
    title: "Aerial View",
    sub: "The plant from above",
  },
  {
    src: "/videos/tour-mixing.mp4",
    poster: "/images/factory/tour-mixing.jpg",
    title: "Mixing & Formulation",
    sub: "Where every lotion begins",
  },
  {
    src: "/videos/tour-edi-ro.mp4",
    poster: "/images/factory/tour-edi-ro.jpg",
    title: "Pharma Grade Water Purification",
    sub: "Pharma-grade purified water",
  },
];

const clients = [
  { name: "Amazon", parent: "Supples · Solimo · Presto · Mamabear" },
  { name: "Iksu", parent: "Lifestyle Group" },
  { name: "Morrison", parent: "JL Morrison India Limited" },
  { name: "Mothercare", parent: "Reliance" },
  { name: "Miss n Chief", parent: "Flipkart" },
  { name: "CIR", parent: "Piramal" },
  { name: "Baby Hug", parent: "FirstCry" },
  { name: "Pigeon", parent: "Pigeon India Pvt Ltd" },
  { name: "BonnyBoo", parent: "Medplus" },
  { name: "Cuddle", parent: "Swara Baby Products" },
  { name: "Yellow Hippo", parent: "Vishal Mega Mart" },
  { name: "Juniorrs", parent: "Baby Shop" },
  { name: "Shills", parent: "Shills Professional" },
  { name: "Glam 21", parent: "Cosmoline" },
  { name: "Bumtum", parent: "Familycare Consumer Pvt Ltd" },
  { name: "Tuco", parent: "" },
  { name: "Bodyguard", parent: "Sirona" },
];

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHero
        index="01"
        label="About Us"
        lines={[
          <>
            Care is our core <span className="text-brand">material.</span>
          </>,
        ]}
        desc="Krishnendu Healthcare Private Limited is a contract manufacturing partner for brands that put safety, science and skin-first thinking at the centre of everything they make."
      />

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead index="02" label="Our brand story" title="Born from a simple belief." />
            {getContent().brandStory.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-500">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-6">
            <Reveal className="relative">
              <div className="absolute -left-6 -top-6 h-full w-full rounded-[2rem] bg-brand-light" />
              <img
                src={IMG.prodWide}
                alt="Inside the KHPL clean room production hall"
                className="relative aspect-[4/3] w-full rounded-[2rem] border border-border object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="03"
            label="Inside the facility"
            title="A plant built for precision."
            desc="Every square foot of our facility exists to protect one thing — the integrity of the products your customers trust."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facility.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.07}>
                <div
                  data-testid={`facility-${f.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="group h-full rounded-[1.5rem] border border-border bg-white p-8 transition-colors duration-300 hover:border-brand"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light transition-colors duration-300 group-hover:bg-brand">
                    <f.icon className="h-5 w-5 text-brand transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <p className="mt-6 font-display text-sm font-bold tracking-[0.2em] text-brand">
                    /{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{f.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" data-testid="clients-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHead
            index="04"
            label="Our clients"
            title="Trusted by brands you already know."
            desc="From global marketplaces to beloved baby-care labels — leading companies across India manufacture their products with us."
          />
        </div>
        <Reveal className="mt-14">
          <Marquee items={clientNames} />
        </Reveal>
        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 0.06} y={24}>
                <div
                  data-testid={`client-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-6 transition-colors duration-300 hover:border-brand"
                >
                  <p className="font-display text-xs font-bold tracking-[0.2em] text-brand">
                    /{String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
                      {c.name}
                    </h3>
                    {c.parent && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        {c.parent}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32" data-testid="manufacturing-showcase-section">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="05"
            label="Manufacturing at a glance"
            title="Precision at every stage."
            desc="A look at how we manufacture — from production floors to quality control and purified water systems."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {tourClips.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div
                  data-testid={`tour-${v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-border"
                >
                  <video
                    src={v.src}
                    poster={v.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
                    <p className="font-display text-lg font-extrabold tracking-tight text-white">
                      {v.title}
                    </p>
                    <p className="text-xs font-semibold text-white/75">{v.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[IMG.qcLab, IMG.microLab, IMG.teamOutro].map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-[2rem] border border-border">
                <img
                  src={src}
                  alt="Life and work at Krishnendu Healthcare"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        label="Partner with us"
        title="Interested in manufacturing with KHPL?"
        desc="Share your product requirements — we'll respond with capabilities, timelines and next steps."
        cta="Send an Enquiry"
      />
    </div>
  );
}
