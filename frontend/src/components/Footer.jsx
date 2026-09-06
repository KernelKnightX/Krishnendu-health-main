import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";
import { LOGO_URL, SITE } from "@/data/site";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/services", label: "Services" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const waNumber = SITE.phoneHref.replace("tel:+", "");

  return (
    <footer data-testid="site-footer" className="mt-8 border-t border-neutral-200 bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="w-fit rounded-xl bg-white p-2">
              <img src={LOGO_URL} alt="Krishnendu Healthcare Pvt. Ltd." className="h-10 w-auto object-contain" />
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-400">
              Contract manufacturers of premium wet wipes, personal hygiene and pet care essentials.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Explore</p>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-neutral-300 transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Capabilities</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>FDA-approved automated lines</li>
              <li>Clean room production</li>
              <li>Micro & QC labs</li>
              <li>Pharma grade water purification</li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Contact</p>
            <ul className="mt-3 space-y-2.5 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <a href={`mailto:${SITE.email}`} data-testid="footer-email-link" className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <a href={SITE.phoneHref} data-testid="footer-phone-link" className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <span className="text-xs leading-relaxed">{SITE.address}</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href="https://www.linkedin.com/company/krishnendu-healthcare"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-linkedin-link"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello, reaching out from the Krishnendu Healthcare website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-link"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.fullName}. All rights reserved.</p>
          <Link to="/privacy-policy" className="hover:text-neutral-300">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
