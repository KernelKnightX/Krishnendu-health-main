import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";
import { LOGO_URL, SITE, SERVICES } from "@/data/site";
import { Label } from "@/components/shared";

const quickLinks = [
  { to: "/", label: "Home", testId: "footer-home-link" },
  { to: "/about", label: "About Us", testId: "footer-about-link" },
  { to: "/capabilities", label: "Capabilities", testId: "footer-capabilities-link" },
  { to: "/careers", label: "Careers", testId: "footer-careers-link" },
  { to: "/contact", label: "Contact Us", testId: "footer-contact-link" },
  { to: "/privacy-policy", label: "Privacy Policy", testId: "footer-privacy-link" },
];

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-16 bottom-40 h-56 w-56 rounded-full bg-white/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
        <Label light>Get in touch</Label>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98]">
            Let&apos;s create something people trust.
          </h2>
          <Link
            to="/contact"
            data-testid="footer-get-in-touch-button"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Start a Conversation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/25 pt-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="w-fit rounded-2xl bg-white p-3">
              <img src={LOGO_URL} alt="Krishnendu Healthcare Pvt. Ltd." className="h-14 w-auto object-contain" />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/85">
              {SITE.fullName} — contract manufacturers of premium wet wipes, personal hygiene and pet care essentials.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Quick Links</p>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={l.testId}
                    className="text-sm font-semibold text-white/90 transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Services</p>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.slug}
                    data-testid={`footer-service-${s.name.toLowerCase().replace(/\s+/g, "-")}-link`}
                    className="text-sm font-semibold text-white/90 transition-colors duration-200 hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Contact</p>
            <ul className="mt-6 space-y-4 text-sm font-semibold text-white/90">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${SITE.email}`} data-testid="footer-email-link" className="transition-colors duration-200 hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={SITE.phoneHref} data-testid="footer-phone-link" className="transition-colors duration-200 hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="font-normal leading-relaxed">{SITE.address}</span>
              </li>
            </ul>
            <div className="mt-8 flex gap-3">
              <a
                href="https://www.linkedin.com/company/krishnendu-healthcare"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-linkedin-link"
                aria-label="Krishnendu Healthcare on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white hover:text-brand"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919826000000?text=Hello%2C%20reaching%20out%20from%20the%20Krishnendu%20Healthcare%20website."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-link"
                aria-label="Chat on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white hover:text-brand"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/25 pt-8 text-xs font-semibold text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.fullName}. All rights reserved.</p>
          <p className="uppercase tracking-[0.25em]">Wipes · Personal Hygiene · Pet Care</p>
        </div>
      </div>
    </footer>
  );
}
