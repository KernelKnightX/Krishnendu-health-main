import { Check } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTABand } from "@/components/shared";
import { IMG } from "@/data/site";

const range = [
  { name: "Pet Wet Wipes", desc: "Gentle cleansing wipes for paws, coat and everyday messes." },
  { name: "Pet Dry Shampoo", desc: "Waterless freshness between baths — quick and stress-free." },
  { name: "Pet Liquid Shampoo", desc: "Mild, coat-loving bath-time care for clean, soft fur." },
  { name: "Pet Nose & Paw Butter", desc: "Nourishing balm that heals dry noses and cracked paws." },
  { name: "Pet Perfumes", desc: "Fresh, pet-safe fragrance finishes after grooming." },
];

const why = [
  "Pet-safe, gentle formulations",
  "Developed with hygiene and love at the core",
  "Tested under the same rigour as our human ranges",
  "Private-label ready for pet brands",
];

export default function PetCare() {
  return (
    <div data-testid="petcare-page">
      <PageHero
        index="03.3"
        label="Services — Pet Care"
        lines={[
          <>
            Because pets <span className="text-brand">are family.</span>
          </>,
        ]}
        desc="We believe pets deserve the same level of care and comfort as family. Our pet care range is designed to keep them clean, healthy and happy with specialized grooming solutions and gentle formulations."
      />

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.pet}
                alt="Happy, healthy dogs — KHPL pet care"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="group overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.petCare}
                alt="Pet grooming essentials by KHPL"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="01"
            label="Product range"
            title="Care for what matters most."
            desc="Every product is developed with safety, hygiene and love at its core — because caring for pets means caring for what matters most."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {range.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.08} y={28}>
                <div
                  data-testid={`petcare-product-${r.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="h-full rounded-[1.5rem] border border-border bg-white p-8 transition-colors duration-300 hover:border-brand"
                >
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand">
                    /{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-ink">
                    {r.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead index="02" label="Why KHPL pet care" title="Human-grade rigour, pet-grade gentleness." />
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
                alt="Pet wipes manufactured by KHPL"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Launch a pet care line they'll love."
        desc="Wipes, shampoos, paw butter and perfumes — formulated gently, manufactured at scale, under your brand."
        cta="Enquire Now"
      />
    </div>
  );
}
