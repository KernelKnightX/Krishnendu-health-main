import { Check } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTABand } from "@/components/shared";
import { IMG } from "@/data/site";

const range = [
  { name: "Baby Wet Wipes", desc: "Ultra-gentle, pH-balanced cleansing for delicate newborn skin." },
  { name: "Baby Hand & Mouth Wipes", desc: "Food-grade safe wipes for messy little moments." },
  { name: "Refreshing Wipes", desc: "Instant freshness for face, hands and body, on the go." },
  { name: "Bed Bath Wipes", desc: "Pre-moistened disposable wipes for rinse-free bed bathing." },
  { name: "Face & Body Bath Towel", desc: "Full-body cleansing in a single towel — no water needed." },
  { name: "Shampoo Bath Towel", desc: "Rinse-free hair cleansing, ideal for bed-bath care." },
  { name: "Nail Polish Remover Wipes", desc: "Quick, mess-free nail polish removal anywhere." },
  { name: "Makeup Remover Wipes", desc: "Gentle makeup removal with skin-loving actives." },
  { name: "Surface Cleaning Wipes", desc: "Multi-surface cleaning for home, travel and care settings." },
  { name: "Sanitizing Wipes", desc: "On-the-go sanitisation for hands and surfaces." },
  { name: "Intimate Hygiene Wipes", desc: "pH-balanced intimate care for everyday freshness." },
  { name: "Sexual Wellness Wipes", desc: "Discreet, gentle hygiene for wellness ranges." },
  { name: "Delay Wipes", desc: "Specialist wellness format for men's care brands." },
  { name: "Pet Wet Wipes", desc: "Gentle cleansing for paws, coat and everyday messes." },
];

const why = [
  "Microbiologically tested formulations",
  "Strict batch-by-batch quality standards",
  "Private-label and custom formulation ready",
  "Dedicated production lines per category",
];

export default function Wipes() {
  return (
    <div data-testid="wipes-page">
      <PageHero
        index="03.1"
        label="Services — Wipes"
        lines={[
          <>
            A promise of <span className="text-brand">care & hygiene.</span>
          </>,
        ]}
        desc="At Krishnendu Healthcare Private Limited, wet wipes are a promise of care and hygiene. From baby care to medical use, we craft wipes with microbiologically tested formulations and strict quality standards."
      />

      <section className="px-4 py-24 sm:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="group overflow-hidden rounded-[2rem] border border-border">
            <img
              src={IMG.wipes}
              alt="Premium wet wipes manufactured by KHPL"
              loading="lazy"
              decoding="async"
              className="aspect-[21/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="01"
            label="Product range"
            title="Wipes for every need."
            desc="Our range — baby, refreshing, bath, cosmetic, sanitizing, intimate and more — delivers safe and reliable solutions for every need, all private-label ready."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {range.map((r, i) => (
              <Reveal key={r.name} delay={(i % 4) * 0.06} y={28}>
                <div
                  data-testid={`wipe-product-${r.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="group h-full rounded-[1.5rem] border border-border bg-white p-7 transition-colors duration-300 hover:border-brand"
                >
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand">
                    /{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-ink">
                    {r.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead index="02" label="Why KHPL wipes" title="Tested like medicine. Made like care." />
            <div className="mt-10 space-y-5">
              {why.map((w, i) => (
                <Reveal key={w} delay={i * 0.06} x={-24} y={0}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light">
                      <Check className="h-4 w-4 text-brand" />
                    </span>
                    <p className="text-base font-semibold text-ink">{w}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.wipes}
                alt="Wet wipe formulations tested in KHPL labs"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Launch your own wipes brand."
        desc="From formulation to lotion to packaging — we handle the entire product journey under your label."
        cta="Enquire Now"
      />
    </div>
  );
}
