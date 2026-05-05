import { useMemo, useState } from "react";
import { MapPin, Calendar, ArrowRight, Search, X } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { districts } from "@/data/districts";
import { fleet } from "@/data/fleet";
import CarIcon from "@/components/site/CarIcon";
import { useLang } from "@/context/LanguageContext";

const Hero = () => {
  const { t, lang } = useLang();
  const [outside, setOutside] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [searched, setSearched] = useState<null | { from: string; to: string }>(null);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;
    setSearched({ from, to });
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const matchedFrom = useMemo(
    () => districts.find((d) => d.en.toLowerCase() === from.toLowerCase() || d.bn === from),
    [from]
  );
  const matchedTo = useMemo(
    () => districts.find((d) => d.en.toLowerCase() === to.toLowerCase() || d.bn === to),
    [to]
  );

  const results = useMemo(() => {
    if (!searched || !matchedFrom || !matchedTo) return [];
    return fleet.filter(
      (c) => c.availableIn.includes(matchedFrom.en) && c.availableIn.includes(matchedTo.en)
    );
  }, [searched, matchedFrom, matchedTo]);

  return (
    <section id="home" className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={heroCar} alt="Premium rental car" className="w-full h-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 px-4 py-1.5 text-xs font-semibold text-brand-yellow uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
            {t("hero_badge")}
          </span>
          <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-balance">
            {t("hero_title_1")}{" "}
            <span className="text-brand-yellow">{t("hero_title_accent")}</span>
            {t("hero_title_2")}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl">{t("hero_sub")}</p>
        </div>

        {/* Booking Widget */}
        <form
          onSubmit={search}
          className="mt-12 bg-white text-brand-black rounded-2xl shadow-card p-5 md:p-6 max-w-5xl"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3 className="font-display font-semibold text-lg">{t("book_ride")}</h3>
            <div className="inline-flex items-center bg-muted rounded-full p-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => setOutside(false)}
                className={`px-4 py-1.5 rounded-full transition-smooth ${!outside ? "bg-brand-black text-white" : "text-muted-foreground"}`}
              >
                {t("inside")}
              </button>
              <button
                type="button"
                onClick={() => setOutside(true)}
                className={`px-4 py-1.5 rounded-full transition-smooth ${outside ? "bg-brand-yellow text-brand-black" : "text-muted-foreground"}`}
              >
                {t("outside")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <DistrictField
              icon={<MapPin className="h-4 w-4" />}
              label={t("from")}
              placeholder={t("pickup_ph")}
              value={from}
              onChange={setFrom}
            />
            <DistrictField
              icon={<MapPin className="h-4 w-4" />}
              label={t("to")}
              placeholder={t("dest_ph")}
              value={to}
              onChange={setTo}
            />
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("date")}</span>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 focus-within:border-brand-yellow focus-within:ring-2 focus-within:ring-brand-yellow/20 transition-smooth">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow text-brand-black font-semibold px-5 py-3 hover:bg-brand-black hover:text-brand-yellow transition-smooth"
            >
              {t("search_cars")} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div id="results" className="mt-8 max-w-5xl bg-white text-brand-black rounded-2xl shadow-card p-5 md:p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-brand-red" />
                <h3 className="font-display font-semibold text-lg">
                  {t("available_cars")}: {lang === "bn" ? matchedFrom?.bn ?? searched.from : matchedFrom?.en ?? searched.from}
                  {" → "}
                  {lang === "bn" ? matchedTo?.bn ?? searched.to : matchedTo?.en ?? searched.to}
                </h3>
              </div>
              <button
                onClick={() => setSearched(null)}
                aria-label="Close results"
                className="rounded-full p-1.5 hover:bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">{t("no_results")}</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((car) => (
                  <a
                    key={car.key}
                    href="#contact"
                    className="rounded-xl border border-border p-4 hover:border-brand-yellow hover:shadow-card transition-smooth group"
                  >
                    <div className="flex items-center justify-between">
                      <CarIcon type={car.key} className="h-10 w-12 text-brand-black group-hover:text-brand-red transition-smooth" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        ● {t("available")}
                      </span>
                    </div>
                    <h4 className="mt-3 font-display font-bold text-xl">{car.name}</h4>
                    <p className="text-xs text-muted-foreground">{lang === "bn" ? car.type.bn : car.type.en} · {car.seats} {t("seats")}</p>
                    <p className="mt-2 text-sm font-bold text-brand-red">{car.fare}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const DistrictField = ({
  icon, label, placeholder, value, onChange,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (q.length < 2) return [];
    return districts
      .filter((d) => d.en.toLowerCase().startsWith(q) || d.bn.startsWith(value.trim()))
      .slice(0, 8);
  }, [value]);

  return (
    <label className="block relative">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 focus-within:border-brand-yellow focus-within:ring-2 focus-within:ring-brand-yellow/20 transition-smooth">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />
      </div>
      {open && matches.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full bg-white rounded-xl border border-border shadow-card max-h-60 overflow-auto">
          {matches.map((d) => (
            <li key={d.en}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); onChange(d.en); setOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-brand-yellow/15 flex items-center justify-between"
              >
                <span className="font-medium">{d.en}</span>
                <span className="text-xs text-muted-foreground">{d.bn}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};

export default Hero;
