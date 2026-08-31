import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const IMAGE_DURATION = 6000;
const VIDEO_DURATION = 13500;

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  useEffect(() => {
    const duration = current.type === "video" ? VIDEO_DURATION : IMAGE_DURATION;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), duration);
    return () => clearTimeout(t);
  }, [index, current.type, slides.length]);

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
              poster={current.poster}
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
              transition={{ duration: IMAGE_DURATION / 1000 + 1.2, ease: "linear" }}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1400px] items-end justify-between px-4 pb-24 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Krishnendu Healthcare Pvt. Ltd.
            </p>
            <h1
              data-testid="hero-slide-caption"
              className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.02]"
            >
              {current.caption}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="hidden items-center gap-2 sm:flex">
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
                  i === index ? "w-full duration-[6000ms]" : i < index ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
