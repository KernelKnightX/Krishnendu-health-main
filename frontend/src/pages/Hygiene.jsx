import { Check } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTABand } from "@/components/shared";
import { IMG } from "@/data/site";

const babyCare = [
  "Baby Wet Wipes",
  "Baby Hand & Mouth Wipes",
  "Baby Massage Oil",
  "Baby Hair Oil",
  "Baby Head-to-Toe Body Wash",
  "Baby Liquid Cleanser",
  "Baby Liquid Detergent",
  "Baby Shampoo",
  "Baby Lotion",
  "Baby Nappy Rash Cream",
  "Baby Mosquito Repellent Spray",
];

const adultCare = [
  "Refreshing Wipes",
  "Bath Towels",
  "Face & Body Bath Towel",
  "Shampoo Bath Towel",
  "Nail Polish Remover Wipes",
  "Makeup Remover Wipes",
  "Surface Cleaning Wipes",
  "Sanitizing Wipes",
  "Intimate Hygiene Wipes",
  "Sexual Wellness Wipes",
  "Delay Wipes",
  "Adult Mosquito Repellent Spray",
  "Adult Massage Oil",
  "Adult Hair Oil",
  "Adult Head-to-Toe Body Wash",
  "Adult Liquid Cleanser",
  "Adult Liquid Detergent",
  "Adult Lotion",
  "Adult Creams",
  "Adult Face Serums",
  "Adult Shampoos",
];

const why = [
  "Gentle, dermatologically mindful formulations",
  "Innovation backed by dedicated R&D experts",
  "Safety tested in in-house micro & QC labs",
  "Custom formulations for your brand's audience",
];

const ProductList = ({ title, items, testIdPrefix }) => (
  <div>
    <Reveal>
      <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {title}
      </h3>
    </Reveal>
    <div className="mt-8">
      {items.map((item, i) => (
        <Reveal key={item} delay={Math.min(i * 0.03, 0.3)} y={16}>
          <div
            data-testid={`${testIdPrefix}-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="group flex items-baseline gap-4 border-t border-border py-4 last:border-b"
          >
            <p className="font-display text-xs font-bold tracking-[0.2em] text-brand">
              /{String(i + 1).padStart(2, "0")}
            </p>
            <p className="text-base font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
              {item}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export default function Hygiene() {
  return (
    <div data-testid="hygiene-page">
      <PageHero
        index="03.2"
        label="Services — Personal Hygiene"
        lines={[
          <>
            World-class care, <span className="text-brand">every single day.</span>
          </>,
        ]}
        desc="We bring world-class care into personal care for babies and adults. Our baby creams and oils are crafted with gentle, nourishing ingredients, while our adult skincare and wellness products combine innovation with safety to support everyday confidence."
      />

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.baby}
                alt="Baby care range by KHPL"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="group overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.hygiene}
                alt="Adult personal hygiene range by KHPL"
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
            title="Gentle by design."
            desc="Complete baby care and adult care ranges — every formulation developed in-house and manufactured under your label."
          />
          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <ProductList title="Baby Care" items={babyCare} testIdPrefix="baby-product" />
            <ProductList title="Adult Care" items={adultCare} testIdPrefix="adult-product" />
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.lab}
                alt="Formulation testing in KHPL labs"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHead index="02" label="Why KHPL hygiene" title="Formulated with science. Finished with care." />
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
        </div>
      </section>

      <CTABand
        title="Build your hygiene range with us."
        desc="Baby care, adult skincare or intimate wellness — our R&D team will craft formulations your customers will love."
        cta="Talk to Our R&D Team"
      />
    </div>
  );
}
