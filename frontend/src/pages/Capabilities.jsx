import {
  ShieldCheck,
  FlaskConical,
  Factory,
  Lightbulb,
  Microscope,
  BadgeCheck,
  Building2,
  Target,
  Link2,
  Bot,
} from "lucide-react";
import { PageHero, SectionHead, Reveal, Marquee, CTABand } from "@/components/shared";
import { CERTIFICATIONS } from "@/data/site";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Global Certifications",
    copy: "FDA, Sedex and ISO approved facility ensuring compliance with international quality and safety standards.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Quality Systems",
    copy: "Integrated EDI system supported by micro and QC labs for precision monitoring and traceability.",
  },
  {
    icon: Factory,
    title: "Specialized Production Lines",
    copy: "Multiple designated lines tailored for baby wipes, refreshing wipes, adult hygiene, intimate care and cosmetic ranges.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Trust",
    copy: "Combining cutting-edge technology with rigorous testing to deliver safe, reliable and world-class personal care products.",
  },
];

const quality = [
  {
    icon: FlaskConical,
    title: "Dedicated R&D Experts",
    copy: "A specialized team driving innovation and developing safe, effective formulations tailored to diverse needs.",
  },
  {
    icon: Microscope,
    title: "In-House Product Testing",
    copy: "Rigorous testing protocols ensure every batch meets the highest standards of performance and safety.",
  },
  {
    icon: BadgeCheck,
    title: "Commitment to Product Safety",
    copy: "Every product is crafted with a focus on skin-friendliness, reliability and consumer trust.",
  },
  {
    icon: Building2,
    title: "Clean Room Production Units",
    copy: "Controlled environments that guarantee hygiene and purity across every production run.",
  },
];

const assurance = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Expert Innovation",
    copy: "Driven by specialists who continuously develop advanced hygiene and personal care solutions.",
  },
  {
    num: "02",
    icon: Target,
    title: "Tailor-Made Solutions",
    copy: "Customized formulations designed to meet diverse consumer needs across wipes and cosmetics.",
  },
  {
    num: "03",
    icon: Link2,
    title: "Supply Chain Excellence",
    copy: "Streamlined systems ensuring efficiency, reliability and global compliance at every stage.",
  },
  {
    num: "04",
    icon: Bot,
    title: "No Human Intervention Production",
    copy: "Automated, state-of-the-art processes guaranteeing consistency, hygiene and safety.",
  },
];

export default function Capabilities() {
  return (
    <div data-testid="capabilities-page">
      <PageHero
        index="02"
        label="Our Capabilities"
        lines={[
          <>
            Precision at <span className="text-brand">every stage.</span>
          </>,
        ]}
        desc="From raw material to finished pack, every step inside our facility is measured, monitored and certified to global standards."
      />

      <Marquee items={CERTIFICATIONS} />

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="01"
            label="Core strengths"
            title="Certified. Monitored. Specialized."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <div
                  data-testid={`pillar-${p.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-border p-10 transition-colors duration-300 hover:border-brand sm:p-12"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-light transition-colors duration-300 group-hover:bg-brand">
                    <p.icon className="h-6 w-6 text-brand transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-500">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-border">
            <video
              src="/videos/micro-lab.mp4"
              poster="/images/factory/micro-lab.jpg"
              autoPlay
              muted
              loop
              playsInline
              data-testid="capabilities-lab-video"
              className="aspect-[21/9] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                Inside the facility
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Every batch, tested in our own labs.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="02"
            label="Quality products"
            title="Tested, retested, trusted."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quality.map((q, i) => (
              <Reveal key={q.title} delay={(i % 4) * 0.07}>
                <div className="h-full rounded-[1.5rem] border border-border bg-white p-8 transition-colors duration-300 hover:border-brand">
                  <q.icon className="h-6 w-6 text-brand" />
                  <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-ink">
                    {q.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{q.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="03"
            label="Assurance & expertise"
            title="The KHPL operating standard."
          />
          <div className="mt-16">
            {assurance.map((a, i) => (
              <Reveal key={a.num} delay={i * 0.05}>
                <div
                  data-testid={`assurance-${a.num}`}
                  className="grid gap-4 border-t border-border py-10 last:border-b lg:grid-cols-12 lg:items-center"
                >
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand lg:col-span-1">
                    /{a.num}
                  </p>
                  <div className="flex items-center gap-4 lg:col-span-5">
                    <a.icon className="h-6 w-6 shrink-0 text-brand" />
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                      {a.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-neutral-500 lg:col-span-6">{a.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to audit our claims?"
        desc="Share your product brief and we'll walk you through certifications, capacity and quality protocols in detail."
        cta="Request Capability Deck"
      />
    </div>
  );
}
