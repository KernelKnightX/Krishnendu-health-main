import { Check } from "lucide-react";
import { PageHero, SectionHead, Reveal, CTABand } from "@/components/shared";
import { IMG } from "@/data/site";

const babyProducts = [
  "Massage and hair oils",
  "Sulphate Free body wash",
  "Liquid detergent & cleanser",
  "Sulphate Free Shampoo",
  "Moisturizing and nourishing lotions",
  "Nappy rash cream",
  "Baby mosquito repellent spray",
  "Liquid Talc",
  "Alcohol free hand sanitizer",
];

const adultProducts = [
  "Hair care products",
  "Complete range of bath & body care",
  "Nourishing Serums",
  "Creams and lotion",
  "Sexual wellness range",
];

const feminineProducts = [
  "Nipple repair cream",
  "Postpartum cooling foam",
  "Stretchmark repair oils",
  "Intimate hygiene wash",
];

const why = [
  "Gentle, dermatologically mindful formulations",
  "Innovation backed by dedicated R&D experts",
  "Safety tested in in-house micro & QC labs",
  "Custom formulations for your brand's audience",
];

const ProductList = ({ title, items, testIdPrefix }) => (
  <div className="h-full rounded-[1.5rem] border border-border bg-white p-6 sm:p-8">
    <Reveal>
      <h3 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
        {title}
      </h3>
    </Reveal>
    <div className="mt-6">
      {items.map((item, i) => (
        <Reveal key={item} delay={Math.min(i * 0.03, 0.2)} y={12}>
          <div
            data-testid={`${testIdPrefix}-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="group flex items-baseline gap-3 border-t border-border py-3 last:border-b"
          >
            <p className="font-display text-xs font-bold tracking-[0.2em] text-brand">
              /{String(i + 1).padStart(2, "0")}
            </p>
            <p className="text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
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
        label="Services — Cosmetics"
        lines={[
          <>
            Formulated with care, <span className="text-brand">finished with science.</span>
          </>,
        ]}
        desc="Contract manufacturing for baby, adult and feminine care cosmetics — from massage oils and sulphate-free washes to serums, creams and intimate wellness ranges, all developed and made under your label."
      />

      <section className="px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.baby}
                alt="Baby care cosmetics by KHPL"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="group overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.hygiene}
                alt="Adult cosmetics and personal care by KHPL"
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
            label="Cosmetics"
            title="Three ranges. One manufacturing standard."
            desc="Complete baby, adult and feminine care portfolios — every product developed in-house and manufactured on dedicated production lines."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            <ProductList title="Baby Category" items={babyProducts} testIdPrefix="baby-cosmetic" />
            <ProductList title="Adult Category" items={adultProducts} testIdPrefix="adult-cosmetic" />
            <ProductList title="Feminine Care" items={feminineProducts} testIdPrefix="feminine-cosmetic" />
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-[2rem] border border-border">
              <img
                src={IMG.feminineCare}
                alt="Feminine care cosmetics by KHPL"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHead index="02" label="Why KHPL cosmetics" title="Formulated with science. Finished with care." />
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
        title="Build your cosmetics range with us."
        desc="Baby care, adult skincare or feminine wellness — our R&D team crafts formulations your customers will love."
        cta="Enquire Now"
      />
    </div>
  );
}
