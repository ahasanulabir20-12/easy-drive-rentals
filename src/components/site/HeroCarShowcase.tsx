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
    fuel: { en: "Hybrid", bn: "হাইব্রিড" },
  },
];

const bnDigits = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const HeroCarShowcase = () => {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + cars.length) % cars.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % cars.length), 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = cars[index];
  const seatsLabel = lang === "bn" ? `${bnDigits(active.seats)} সিট` : `${active.seats} Seats`;

  return (
    <div
      className="liquid-glass rounded-3xl border border-white/15 bg-white/5 p-3 sm:p-4 backdrop-blur-xl shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main viewer */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-white/70">
        <div className="relative h-40 sm:h-48 md:h-52">
          {cars.map((c, i) => (
            <img
              key={c.key}
              src={c.image}
              alt={`${c.name} front view`}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-out"
              style={{
                opacity: i === index ? 1 : 0,
                transform: `translateX(${(i - index) * 24}px) scale(${i === index ? 1 : 0.94})`,
                pointerEvents: i === index ? "auto" : "none",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous car"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-brand-black/80 text-white shadow-md transition-smooth hover:bg-brand-black"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next car"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-brand-black/80 text-white shadow-md transition-smooth hover:bg-brand-black"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Info bar */}
        <div className="absolute bottom-2 left-2 right-2 rounded-2xl bg-white/95 px-3 py-2.5 shadow-md">
          <div className="min-w-0">
            <div className="font-display font-bold text-base sm:text-lg text-brand-black truncate">
              {lang === "bn" ? active.nameBn : active.name}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{seatsLabel}</span>
              <span className="inline-flex items-center gap-1"><Cog className="h-3 w-3" />{lang === "bn" ? active.gear.bn : active.gear.en}</span>
              <span className="inline-flex items-center gap-1"><Fuel className="h-3 w-3" />{lang === "bn" ? active.fuel.bn : active.fuel.en}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {cars.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setIndex(i)}
            className={`min-w-[104px] flex-1 rounded-xl border-2 bg-white/90 p-1.5 text-left transition-smooth ${
              i === index ? "border-brand-yellow" : "border-transparent hover:border-brand-yellow/50"
            }`}
          >
            <img src={c.image} alt={c.name} className="h-12 w-full rounded-lg bg-muted/40 object-contain" />
            <div className="mt-1 truncate text-[11px] font-bold text-brand-black">{lang === "bn" ? c.nameBn : c.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarShowcase;
