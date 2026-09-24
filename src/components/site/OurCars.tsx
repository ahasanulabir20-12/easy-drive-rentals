import { useEffect, useState } from "react";
import { Users, Snowflake, Fuel, Cog, X, UserRound } from "lucide-react";
import CarIcon from "@/components/site/CarIcon";
import SectionKicker from "@/components/site/SectionKicker";
import { useLang } from "@/context/LanguageContext";

type CatKey = "sedan" | "micro" | "bus";

type Category = {
  key: CatKey;
  iconType: "axio" | "hiace" | "noah";
  seats: string;
  ac: "dual" | "single";
  engine: string;
  fuel: string;
  drivers: { name: string; years: number; car: string }[];
};

const CATS: Category[] = [
  {
    key: "sedan",
    iconType: "axio",
    seats: "4",
    ac: "dual",
    engine: "1500 CC",
    fuel: "Octane",
    drivers: [{ name: "MD Sabbir", years: 6, car: "Axio" }],
  },
  {
    key: "micro",
    iconType: "noah",
    seats: "7–12",
    ac: "dual",
    engine: "2000 CC",
    fuel: "Diesel / CNG",
    drivers: [
      { name: "MD Rifat", years: 4, car: "Noah" },
      { name: "MD Jakir", years: 13, car: "Noah" },
      { name: "Rasel Molla", years: 8, car: "Hiace" },
      { name: "Rayhan", years: 4, car: "Hiace" },
    ],
  },
  {
    key: "bus",
    iconType: "hiace",
    seats: "27–45",
    ac: "single",
    engine: "3000+ CC",
    fuel: "Diesel",
    drivers: [],
  },
];

const OurCars = () => {
  const { t } = useLang();
  const [driversOpen, setDriversOpen] = useState(false);

  useEffect(() => {
    if (!driversOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDriversOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [driversOpen]);

  const allDrivers = CATS.flatMap((c) => c.drivers);

  return (
    <section id="our-cars" className="py-20 md:py-24 bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(60% 60% at 50% 0%, hsl(45 80% 60% / 0.4), transparent)" }} />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto">
          <SectionKicker tone="yellow">{t("our_cars")}</SectionKicker>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">{t("our_cars_title")}</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {CATS.map((c, i) => (
            <article
              key={c.key}
              style={{ animationDelay: `${i * 90}ms` }}
              className="liquid-glass rounded-3xl p-6 animate-fade-in text-white"
            >
              <div className="flex items-center justify-between">
                <span className="liquid-glass liquid-gold rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  {t(`cat_${c.key}` as any)}
                </span>
                <CarIcon type={c.iconType} className="h-10 w-14 text-brand-yellow" />
              </div>

              <h3 className="mt-4 font-display font-bold text-3xl">{t(`cat_${c.key}` as any)}</h3>
              <p className="mt-1 text-sm text-white/70">{t(`cat_${c.key}_d` as any)}</p>

              <ul className="mt-5 space-y-2.5 text-sm">
                <Row icon={<Users className="h-4 w-4" />} label={t("seats")} value={c.seats} />
                <Row icon={<Snowflake className="h-4 w-4" />} label="AC" value={c.ac === "dual" ? t("ac_dual") : t("ac_single")} />
                <Row icon={<Cog className="h-4 w-4" />} label={t("engine")} value={c.engine} />
                <Row icon={<Fuel className="h-4 w-4" />} label={t("fuel")} value={c.fuel} />
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setDriversOpen(true)}
            className="liquid-glass liquid-gold inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold"
          >
            <UserRound className="h-4 w-4" />
            {t("view_drivers")}
          </button>
        </div>
      </div>

      {driversOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4" onClick={() => setDriversOpen(false)} role="presentation">
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drivers-modal-title"
            className="w-full max-w-lg liquid-glass liquid-light rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 id="drivers-modal-title" className="font-display font-bold text-2xl text-brand-black">{t("our_drivers")}</h3>
              <button onClick={() => setDriversOpen(false)} className="rounded-full p-2 hover:bg-black/5 text-brand-black" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-2.5">
              {allDrivers.map((d, i) => (
                <li key={i} className="liquid-glass liquid-light rounded-2xl p-3 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full liquid-glass liquid-gold grid place-items-center font-display font-bold text-lg">
                    {d.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-brand-black">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.car} · {d.years} {t("experience")}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 last:border-none">
    <span className="inline-flex items-center gap-2 text-white/70">{icon} {label}</span>
    <span className="font-semibold text-brand-yellow">{value}</span>
  </li>
);

export default OurCars;
