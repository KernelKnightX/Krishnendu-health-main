import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  Droplets,
  Sparkles,
  PawPrint,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { LOGO_URL, SITE } from "@/data/site";

const primaryLinks = [
  { to: "/", label: "Home", testId: "nav-home-link" },
  { to: "/about", label: "About Us", testId: "nav-about-link" },
  { to: "/capabilities", label: "Capabilities", testId: "nav-capabilities-link" },
];

const secondaryLinks = [
  { to: "/careers", label: "Careers", testId: "nav-careers-link" },
  { to: "/contact", label: "Contact Us", testId: "nav-contact-link" },
];

const serviceLinks = [
  { to: "/services", label: "All Services", icon: LayoutGrid, testId: "nav-services-all-link" },
  { to: "/services/wipes", label: "Wipes", icon: Droplets, testId: "nav-services-wipes-link" },
  { to: "/services/personal-hygiene", label: "Cosmetics", icon: Sparkles, testId: "nav-services-hygiene-link" },
  { to: "/services/pet-care", label: "Pet Care", icon: PawPrint, testId: "nav-services-petcare-link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const servicesActive = pathname.startsWith("/services");
  const light = pathname === "/" && !scrolled;

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? "text-brand"
        : light
          ? "text-white/85 hover:text-white"
          : "text-ink/70 hover:text-ink"
    }`;

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-b border-border/80 bg-white/80 shadow-[0_8px_40px_-16px_rgba(10,10,10,0.12)] backdrop-blur-xl"
            : "bg-white/0"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8">
          <Link to="/" data-testid="nav-logo" className="flex items-center">
              <img
              src={LOGO_URL}
              alt="Krishnendu Healthcare Pvt. Ltd."
              className="h-12 w-auto rounded-lg object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {primaryLinks.map((l) => (
              <NavLink key={l.to} to={l.to} data-testid={l.testId} className={linkClass} end={l.to === "/"}>
                {l.label}
              </NavLink>
            ))}

            <div className="group relative">
              <button
                type="button"
                data-testid="nav-services-dropdown"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${
                  servicesActive
                    ? "text-brand"
                    : light
                      ? "text-white/85 hover:text-white"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                Services
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
                <div className="w-64 rounded-2xl border border-border bg-white/95 p-2 shadow-xl backdrop-blur-xl">
                  {serviceLinks.map((s) => (
                    <NavLink
                      key={s.to}
                      to={s.to}
                      end={s.to === "/services"}
                      data-testid={s.testId}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                          isActive ? "bg-brand-light text-brand" : "text-ink/70 hover:bg-neutral-50 hover:text-ink"
                        }`
                      }
                    >
                      <s.icon className="h-4 w-4 text-brand" />
                      {s.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {secondaryLinks.map((l) => (
              <NavLink key={l.to} to={l.to} data-testid={l.testId} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              to="/contact"
              data-testid="nav-email-cta"
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-colors duration-200 ${
                light
                  ? "border-white/40 text-white hover:border-brand hover:text-brand"
                  : "border-ink/15 text-ink hover:border-brand hover:text-brand"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              {SITE.email}
            </Link>
            <Link
              to="/contact"
              data-testid="nav-phone-cta"
              className="flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-xs font-bold text-white transition-colors duration-200 hover:bg-brand-dark"
            >
              <Phone className="h-3.5 w-3.5" />
              {SITE.phone}
            </Link>
          </div>

          <button
            type="button"
            data-testid="mobile-menu-button"
            onClick={() => setOpen(!open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 ${
              light ? "border-white/40 text-white" : "border-ink/15 text-ink"
            } lg:hidden`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex min-h-full flex-col px-8 pb-12 pt-32">
              {[...primaryLinks, ...secondaryLinks].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    data-testid={`mobile-${l.testId}`}
                    className={({ isActive }) =>
                      `block border-b border-border py-5 font-display text-4xl font-extrabold tracking-tight ${
                        isActive ? "text-brand" : "text-ink"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-brand"
              >
                Services
              </motion.p>
              {serviceLinks.map((s, i) => (
                <motion.div
                  key={s.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                >
                  <NavLink
                    to={s.to}
                    end={s.to === "/services"}
                    data-testid={`mobile-${s.testId}`}
                    className="flex items-center gap-3 py-3 text-lg font-semibold text-ink/80"
                  >
                    <s.icon className="h-5 w-5 text-brand" />
                    {s.label}
                    <ArrowUpRight className="ml-auto h-4 w-4 text-brand" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-10 space-y-2 text-sm font-semibold text-ink/70"
              >
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand" /> {SITE.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand" /> {SITE.phone}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
