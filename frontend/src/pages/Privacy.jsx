import { PageHero, SectionHead, Reveal, CTABand } from "@/components/shared";
import { SITE } from "@/data/site";

const sections = [
  {
    title: "Information We Collect",
    copy: "When you contact us through our website forms (Contact Us or Careers), we collect the details you voluntarily provide — your name, email address, phone number, and the message or application you send. We do not collect payment information or sensitive personal data through this website.",
  },
  {
    title: "How We Use Your Information",
    copy: "We use the information you share solely to respond to your enquiries, discuss potential manufacturing partnerships, process job applications, and improve our services. We never sell, rent, or trade your personal information to third parties.",
  },
  {
    title: "Cookies & Analytics",
    copy: "Our website uses essential cookies to function and may use analytics cookies to understand how visitors use the site — which pages are visited and for how long. When you first visit, you can accept or decline cookies through the consent banner. Declining does not affect your ability to browse the site.",
  },
  {
    title: "Third-Party Services",
    copy: "Our website may embed third-party services such as Google Maps and links to WhatsApp and LinkedIn. These services are governed by their own privacy policies, and we encourage you to review them.",
  },
  {
    title: "Data Security",
    copy: "We apply the same rigour to your data as we do to our products. Enquiry details are accessed only by authorised team members and retained only as long as needed to serve your request or as required by law.",
  },
  {
    title: "Your Rights",
    copy: "You may request access to, correction of, or deletion of your personal information at any time by writing to us. We will respond to every request promptly.",
  },
];

export default function Privacy() {
  return (
    <div data-testid="privacy-page">
      <PageHero
        index="06"
        label="Privacy Policy"
        lines={[
          <>
            Your data, treated <span className="text-brand">with care.</span>
          </>,
        ]}
        desc="Last updated: August 2026. This policy explains what Krishnendu Healthcare Private Limited collects through this website, why, and the choices you have."
      />

      <section className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            index="01"
            label="The essentials"
            title="Simple, transparent, no fine print games."
          />
          <div className="mt-16">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.05, 0.3)} x={-32} y={0}>
                <div
                  data-testid={`privacy-${s.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="grid gap-4 border-t border-border py-10 last:border-b lg:grid-cols-12"
                >
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand lg:col-span-2">
                    /{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink lg:col-span-4">
                    {s.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-500 lg:col-span-6">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-16 rounded-[1.5rem] border border-border bg-brand-light/50 p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
              Questions?
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/80">
              For any privacy-related questions or requests, write to us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                data-testid="privacy-email-link"
                className="font-bold text-brand underline-offset-4 hover:underline"
              >
                {SITE.email}
              </a>{" "}
              or call {SITE.phone}.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ready to work together?"
        desc="Tell us about your brand and product idea — we'll take it from concept to shelf."
        cta="Enquire Now"
      />
    </div>
  );
}
