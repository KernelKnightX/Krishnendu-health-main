import {
  ShieldCheck,
  BadgeCheck,
  Award,
  FileCheck,
  Microscope,
  Leaf,
  Globe,
} from "lucide-react";
import { Reveal, Label } from "@/components/shared";

const badges = [
  { icon: ShieldCheck, name: "FDA", sub: "Approved Facility" },
  { icon: BadgeCheck, name: "Sedex", sub: "SMETA Audited" },
  { icon: Award, name: "ISO 9001:2015", sub: "Quality Management" },
  { icon: FileCheck, name: "GMP", sub: "Good Manufacturing Practice" },
  { icon: Microscope, name: "Micro & QC Labs", sub: "In-House Testing" },
  { icon: Leaf, name: "Skin-Safe", sub: "Dermatologically Mindful" },
  { icon: Globe, name: "Export Ready", sub: "Global Compliance" },
];

export default function CertificatesStrip() {
  return (
    <section data-testid="certificates-strip" className="border-b border-border bg-white py-14">
      <Reveal className="mx-auto mb-10 max-w-7xl px-4 sm:px-8">
        <Label>Quality Certificates</Label>
        <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
          Certified. Audited. Trusted.
        </h2>
      </Reveal>
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-stretch gap-5 pr-5">
          {[...badges, ...badges].map((b, i) => (
            <div
              key={i}
              data-testid={i < badges.length ? `certificate-badge-${b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : undefined}
              className="flex w-56 shrink-0 items-center gap-4 rounded-2xl border border-border bg-white px-6 py-5 transition-colors duration-300 hover:border-brand"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light">
                <b.icon className="h-5 w-5 text-brand" />
              </span>
              <span>
                <span className="block font-display text-base font-extrabold tracking-tight text-ink">
                  {b.name}
                </span>
                <span className="block text-xs font-semibold text-neutral-500">{b.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
