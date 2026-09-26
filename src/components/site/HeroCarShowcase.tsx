import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Users, Fuel, Cog } from "lucide-react";
import noahFront from "@/assets/noah-front.jpg";
import hiaceFront from "@/assets/hiace-front.jpg";
import allionFront from "@/assets/allion-front.jpg";
import { useLang } from "@/context/LanguageContext";
import type { CarKey } from "@/data/fleet";

type ShowcaseCar = {
  key: CarKey;
  name: string;
  nameBn: string;
  image: string;
  seats: string;
  gear: { en: string; bn: string };
  fuel: { en: string; bn: string };
};

const cars: ShowcaseCar[] = [
  {
    key: "allion",
    name: "Toyota Allion",
    nameBn: "টয়োটা অ্যালিয়ন",
    image: allionFront,
    seats: "5",
    gear: { en: "Automatic", bn: "অটোমেটিক" },
    fuel: { en: "Petrol", bn: "পেট্রোল" },
  },
  {
    key: "hiace",
    name: "Toyota HiAce",
    nameBn: "টয়োটা হাইএস",
    image: hiaceFront,
    seats: "12",
    gear: { en: "Automatic", bn: "অটোমেটিক" },
    fuel: { en: "Diesel", bn: "ডিজেল" },
  },
  {
    key: "noah",
    name: "Toyota Noah",
    nameBn: "টয়োটা নোয়াহ",
    image: noahFront,
    seats: "7",
    gear: { en: "Automatic", bn: "অটোমেটিক" },
    fuel: { en: "Petrol", bn: "পেট্রোল" },
  },
];

const SLIDE_MS = 4000;
const TICK_MS = 50;

const bnDigits = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const HeroCarShowcase = () => {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const select = useCallback((i: number) => {
    setIndex(i);
    setProgress(0);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + cars.length) % cars.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = p + (TICK_MS / SLIDE_MS) * 100;
        if (next >= 100) {
          setIndex((i) => (i + 1) % cars.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = cars[index];
  const seatsLabel = lang === "bn" ? `${bnDigits(active.seats)} সিট` : `${active.seats} Seats`;

  return (
    <div
      className="liquid-glass rounded-3xl border border-brand-yellow/20 bg-brand-black/70 p-3 sm:p-4 backdrop-blur-xl shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Segmented progress timer */}
      <div className="mb-3 flex gap-1.5">
        {cars.map((c, i) => (
          <button
            key={c.key}
            type="button"
            aria-label={`Show ${c.name}`}
            onClick={() => select(i)}
            className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
          >
            <span
              className="block h-full rounded-full bg-brand-yellow shadow-[0_0_10px_hsl(var(--brand-yellow)/0.8)]"
              style={{
                width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                transition: "width 60ms linear",
              }}
            />
          </button>
        ))}
      </div>

      {/* Studio spotlight stage */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-brand-black via-brand-black/95 to-black">
        {/* golden halo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 42%, hsl(var(--brand-yellow) / 0.28), transparent 70%)",
          }}
        />
        {/* floor light pool */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 50% 100%, hsl(var(--brand-yellow) / 0.18), transparent 75%)",
          }}
        />
        {/* stage floor line */}
        <div className="pointer-events-none absolute bottom-[26%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/40 to-transparent" />

        <div className="relative h-40 sm:h-48 md:h-52">
          {cars.map((c, i) => (
            <div
              key={c.key}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                opacity: i === index ? 1 : 0,
                transform: `translateX(${(i - index) * 28}px) scale(${i === index ? 1 : 0.92})`,
                pointerEvents: i === index ? "auto" : "none",
              }}
            >
              <img
                src={c.image}
                alt={`${c.name} front view`}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-x-0 top-1 mx-auto h-[72%] w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)]"
              />
              {/* reflection */}
              <img
                src={c.image}
                alt=""
                aria-hidden
                className="absolute inset-x-0 mx-auto w-full object-contain opacity-20 blur-[2px]"
                style={{
                  top: "72%",
                  height: "26%",
                  transform: "scaleY(-1)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous car"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-smooth hover:border-brand-yellow/60 hover:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next car"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-smooth hover:border-brand-yellow/60 hover:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Floating glass info */}
        <div className="absolute bottom-2 left-2 right-2 z-10 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl">
          <div className="font-display text-base font-bold uppercase tracking-wide text-brand-yellow sm:text-lg">
            {lang === "bn" ? active.nameBn : active.name}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-white/85">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-0.5">
              <Users className="h-3 w-3 text-brand-yellow" />
              {seatsLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-0.5">
              <Cog className="h-3 w-3 text-brand-yellow" />
              {lang === "bn" ? active.gear.bn : active.gear.en}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-0.5">
              <Fuel className="h-3 w-3 text-brand-yellow" />
              {lang === "bn" ? active.fuel.bn : active.fuel.en}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {cars.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={() => select(i)}
            className={`min-w-[104px] flex-1 rounded-xl border bg-white/5 p-1.5 text-left backdrop-blur-md transition-smooth ${
              i === index
                ? "border-brand-yellow/70 shadow-[0_0_16px_hsl(var(--brand-yellow)/0.25)]"
                : "border-white/10 hover:border-brand-yellow/40"
            }`}
          >
            <img src={c.image} alt={c.name} className="h-12 w-full rounded-lg object-contain" />
            <div className="mt-1 truncate text-[11px] font-bold text-white/90">
              {lang === "bn" ? c.nameBn : c.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarShowcase;
