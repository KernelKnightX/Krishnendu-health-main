import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_VIDEO } from "@/data/site";

export default function IntroSplash() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname === "/" && !sessionStorage.getItem("khpl_intro_seen")) {
      sessionStorage.setItem("khpl_intro_seen", "1");
      setShow(true);
      const t = setTimeout(() => setShow(false), 12000);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const close = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          data-testid="intro-splash"
          className="fixed inset-0 z-[200] bg-ink"
        >
          <video
            src={INTRO_VIDEO}
            autoPlay
            muted
            playsInline
            onEnded={close}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-10 flex justify-center">
            <button
              type="button"
              data-testid="intro-skip-button"
              onClick={close}
              className="rounded-full border border-white/40 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-ink"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
