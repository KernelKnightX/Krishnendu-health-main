import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SLIDE_DURATION = 5000;

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const current = slides[index];
  const nextIndex = (index + 1) % slides.length;
  const nextSlide = slides[nextIndex];

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [index, slides.length]);

  useEffect(() => {
    if (nextSlide?.type !== "video") return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "video";
    link.href = nextSlide.src;
    document.head.appendChild(link);
    return () => link.remove();
  }, [nextSlide?.src, nextSlide?.type]);

  return (
    <section data-testid="hero-slider" className="relative h-screen w-full overflow-hidden bg-ink">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {current.type === "video" ? (
            <video
              key={current.src}
              src={current.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          ) : (
            <motion.img
              src={current.src}
              alt={current.caption}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.2, ease: "linear" }}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/35 sm:from-ink/70 sm:via-ink/10 sm:to-ink/40" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[1400px] px-4 pb-28 sm:px-8 sm:pb-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-w-0 max-w-3xl"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 sm:text-xs sm:tracking-[0.3em]">
                Krishnendu Healthcare Pvt. Ltd.
              </p>
              <h1
                data-testid="hero-slide-caption"
                className="mt-3 max-w-full break-words font-display text-3xl font-black tracking-tight text-white leading-[1.05] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {current.caption}
              </h1>
            </motion.div>
          </AnimatePresence>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                data-testid={`hero-slide-indicator-${i}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative h-1.5 w-12 overflow-hidden rounded-full bg-white/30"
              >
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-brand transition-[width] ${
                    i === index ? "w-full duration-[5000ms]" : i < index ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-testid={`hero-slide-dot-${i}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-brand" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 sm:bottom-8 sm:block"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
