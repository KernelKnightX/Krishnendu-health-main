import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "khpl_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          data-testid="cookie-banner"
          className="fixed bottom-6 left-6 z-[95] max-w-sm rounded-2xl border border-border bg-white p-6 shadow-2xl sm:bottom-8 sm:left-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light">
              <Cookie className="h-5 w-5 text-brand" />
            </span>
            <div>
              <p className="font-display text-base font-extrabold tracking-tight text-ink">
                A quick note on cookies
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                We use cookies to improve your browsing experience and analyse
                site traffic. You can accept or decline — the site works either
                way.{" "}
                <a
                  href="/privacy-policy"
                  data-testid="cookie-learn-more-link"
                  className="font-semibold text-brand underline-offset-2 hover:underline"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              data-testid="cookie-accept-button"
              onClick={() => choose("accepted")}
              className="flex-1 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-dark active:scale-95"
            >
              Accept
            </button>
            <button
              type="button"
              data-testid="cookie-decline-button"
              onClick={() => choose("declined")}
              className="flex-1 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition-colors duration-200 hover:border-brand hover:text-brand active:scale-95"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
