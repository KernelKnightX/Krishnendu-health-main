import { PageHero, SectionHead, Reveal, PillLink, CTABand } from "@/components/shared";
import { SERVICES } from "@/data/site";

export default function Services() {
  return (
    <div data-testid="services-page">
      <PageHero
        index="03"
        label="Our Services"
        lines={[
          <>
            Three verticals. One <span className="text-brand">standard of care.</span>
          </>,
        ]}
        desc="Private-label and contract manufacturing of wet wipes, cosmetics and pet care — from formulation and testing to finished, shelf-ready product."
      />

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl space-y-24 sm:space-y-32">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              className={`grid items-center gap-12 lg:grid-cols-12 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              <Reveal className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-border">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute left-6 top-6 rounded-full bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand backdrop-blur-md">
                    0{i + 1}
                  </div>
                </div>
              </Reveal>
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <SectionHead index={`0${i + 1}`} label="Service vertical" title={s.name} desc={s.desc} />
                <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </Reveal>
                <Reveal delay={0.3} className="mt-10">
                  <PillLink
                    to={s.slug}
                    testId={`services-explore-${s.name.toLowerCase().replace(/\s+/g, "-")}-button`}
                  >
                    Explore {s.name}
                  </PillLink>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title="Not sure which vertical fits your idea?"
        desc="Send us your brief — our team will map it to the right production line and formulation experts."
        cta="Enquire Now"
      />
    </div>
  );
}
