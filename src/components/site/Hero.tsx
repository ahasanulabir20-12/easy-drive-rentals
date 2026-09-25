import { useEffect, useMemo, useState } from "react";
import { MapPin, ArrowRight, Car as CarIconLucide, Phone, MessageCircle, Timer } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { districts, distanceKm, isInsideDhakaDivision, estimateMinutes, formatDuration } from "@/data/districts";
import { fleet, formatBDT, formatRange, type CarKey } from "@/data/fleet";
import CarIcon from "@/components/site/CarIcon";
import { useLang } from "@/context/LanguageContext";
import BookingModal, { type BookingPayload } from "@/components/site/BookingModal";
import DateField from "@/components/site/DateField";
import TimeField from "@/components/site/TimeField";
import HeroCarShowcase from "@/components/site/HeroCarShowcase";


const WHATSAPP = "8801709539837";
const CALL_PHONE = "8801965155166";

const Hero = () => {
  const { t, lang } = useLang();
  const [outside, setOutside] = useState(false);
  const [autoSwitched, setAutoSwitched] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [carPickerOpen, setCarPickerOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarKey>("noah");
  const [modal, setModal] = useState<null | "whatsapp" | "call">(null);

  const car = useMemo(() => fleet.find((c) => c.key === selectedCar)!, [selectedCar]);

  const matchedFrom = useMemo(
    () => districts.find((d) => d.en.toLowerCase() === from.toLowerCase() || d.bn === from.trim()),
    [from]
  );
  const matchedTo = useMemo(
    () => districts.find((d) => d.en.toLowerCase() === to.toLowerCase() || d.bn === to.trim()),
    [to]
  );

  const km = useMemo(() => {
    if (!matchedFrom || !matchedTo) return null;
    if (matchedFrom.en === matchedTo.en) return 0;
    return distanceKm(matchedFrom, matchedTo);
  }, [matchedFrom, matchedTo]);

  // Auto-switch Inside/Outside Dhaka based on selected locations (Dhaka Division = inside)
  useEffect(() => {
    if (!matchedFrom || !matchedTo) { setAutoSwitched(false); return; }
    const bothInside = isInsideDhakaDivision(matchedFrom.en) && isInsideDhakaDivision(matchedTo.en);
    const shouldOutside = !bothInside;
    if (shouldOutside !== outside) {
      setOutside(shouldOutside);
      setAutoSwitched(true);
    } else {
      setAutoSwitched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedFrom, matchedTo]);

  // Estimated time based on km + trip type
  const minutes = useMemo(() => (km != null && km > 0 ? estimateMinutes(km, outside) : null), [km, outside]);

  // Approximate wording helpers (never show an exact-looking distance/fare)
  const approxWord = lang === "bn" ? "আনুমানিক" : "Approx";
  // Round to a friendly step so the number never reads as an exact measurement
  const approxKm = useMemo(() => {
    if (km == null) return null;
    if (km <= 10) return km;
    const step = km < 100 ? 5 : 10;
    return Math.round(km / step) * step;
  }, [km]);
  const approxKmText = approxKm == null ? "-" : `≈ ${approxKm} km`;

  // Fare estimate
  const estimate = useMemo(() => {
    if (km == null) return null;
    if (!outside) {
      return { label: t("inside_dhaka_daily"), text: formatRange(car.inside.min, car.inside.max), low: car.inside.min, high: car.inside.max };
    }
    const raw = Math.max(km, 80) * car.perKm;
    // ±~1500 BDT window around the raw estimate for a real-life quote feel
    const low = Math.max(1500, Math.round(raw - 1500));
    const high = Math.round(raw + 1500);
    return { label: t("est_fare"), text: `${formatBDT(low)} – ${formatBDT(high)}`, low, high };
  }, [km, outside, car, t]);

  const waMessage = encodeURIComponent(
    `Hi Easy_Car, I'd like to book a ${car.name}.\nFrom: ${from || "-"}\nTo: ${to || "-"}\nDate: ${date || "-"}\nPickup Time: ${time || "-"}\nDistance: ${approxKmText} (approx)\nEstimated Fare: ${estimate?.text || "-"} (approx)`
  );


  return (
    <section id="home" className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={heroCar} alt="Premium rental car" className="w-full h-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 px-4 py-1.5 text-xs font-semibold text-brand-yellow uppercase tracking-wider reveal">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
              {t("hero_badge")}
            </span>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance reveal reveal-delay-1">
              {t("hero_title_1")}{" "}
              <span className="shine-text">{t("hero_title_accent")}</span>
              {t("hero_title_2")}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl reveal reveal-delay-2">{t("hero_sub")}</p>

            {/* Trust stats */}
            <div className="mt-8 flex flex-wrap gap-3 reveal reveal-delay-2">
              <Stat value={t("trust_customers")} />
              <Stat value={t("trust_rides")} />
              <Stat value={t("trust_rating")} />
              <Stat value={t("trust_support")} />
            </div>
          </div>

          {/* Car showcase slider */}
          <div className="lg:col-span-5 reveal reveal-delay-3">
            <HeroCarShowcase onSelect={(k) => setSelectedCar(k)} />
          </div>
        </div>


        {/* Booking Widget — all-in-one */}
        <div className="mt-12 bg-white text-brand-black rounded-2xl shadow-card p-5 md:p-6 max-w-5xl reveal reveal-delay-3">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3 className="font-display font-semibold text-lg">{t("book_ride")}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {autoSwitched && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-red bg-brand-red/10 rounded-full px-2 py-1">
                  {t("auto_switched")}
                </span>
              )}
              <div className="liquid-glass liquid-light inline-flex items-center rounded-full p-1 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => { setOutside(false); setAutoSwitched(false); }}
                  className={`px-4 py-1.5 rounded-full transition-smooth ${!outside ? "liquid-glass liquid-dark shadow-sm" : "text-muted-foreground"}`}
                >
                  {t("inside")}
                </button>
                <button
                  type="button"
                  onClick={() => { setOutside(true); setAutoSwitched(false); }}
                  className={`px-4 py-1.5 rounded-full transition-smooth ${outside ? "liquid-glass liquid-gold shadow-sm" : "text-muted-foreground"}`}
                >
                  {t("outside")}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <DistrictField icon={<MapPin className="h-4 w-4" />} label={t("from")} placeholder={t("pickup_ph")} value={from} onChange={setFrom} />
            <DistrictField icon={<MapPin className="h-4 w-4" />} label={t("to")} placeholder={t("dest_ph")} value={to} onChange={setTo} />
            <DateField value={date} onChange={setDate} />
            <TimeField value={time} onChange={setTime} />



            {/* Select Car */}
            <div className="block relative">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("select_car")}</span>
              <button
                type="button"
                onClick={() => setCarPickerOpen((v) => !v)}
                className="mt-1 w-full flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 hover:border-brand-yellow transition-smooth"
              >
                <CarIcon type={car.key} className="h-6 w-8 text-brand-black shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{car.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{lang === "bn" ? car.type.bn : car.type.en}</div>
                </div>
                <CarIconLucide className="h-4 w-4 text-muted-foreground" />
              </button>
              {carPickerOpen && (
                <div className="absolute z-30 mt-1 right-0 left-0 md:right-0 md:left-auto md:w-[480px] bg-white rounded-2xl border border-border shadow-card p-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{t("choose_car")}</div>
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-auto">
                    {fleet.map((c) => {
                      const active = c.key === car.key;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => { setSelectedCar(c.key); setCarPickerOpen(false); }}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-smooth text-left ${active ? "border-brand-yellow bg-brand-yellow/10" : "border-border hover:border-brand-yellow/60 hover:bg-muted/40"}`}
                        >
                          <CarIcon type={c.key} className="h-8 w-10 text-brand-black shrink-0" />
                          <div className="min-w-0">
                            <div className="font-semibold text-sm truncate">{c.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{c.seats} {t("seats")} · ৳{c.perKm}/km</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trip estimate / route preview */}
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-brand-black">{t("route_preview")}</h4>
              <div className="flex items-center gap-2 flex-wrap">
                {approxKm != null && (
                  <span className="text-xs font-semibold text-brand-red bg-brand-red/10 rounded-full px-3 py-1">
                    {t("distance")}: ≈ {approxKm} km ({approxWord})
                  </span>
                )}
                {minutes != null && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-black bg-brand-yellow/25 rounded-full px-3 py-1">
                    <Timer className="h-3 w-3" /> {t("est_time")}: ≈ {formatDuration(minutes)}
                  </span>
                )}

              </div>
            </div>

            {!matchedFrom || !matchedTo ? (
              <p className="text-sm text-muted-foreground py-6 text-center">{t("pick_route")}</p>
            ) : (
              <RoutePreview
                fromLabel={lang === "bn" ? matchedFrom.bn : matchedFrom.en}
                toLabel={lang === "bn" ? matchedTo.bn : matchedTo.en}
                km={approxKm!}
                minutes={minutes}
                perKm={car.perKm}
                outside={outside}
                approxWord={approxWord}
              />
            )}

            {estimate && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div className="liquid-glass liquid-dark rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-wider text-brand-yellow">{estimate.label} ({approxWord})</div>
                  <div className="mt-1 font-display font-bold text-2xl text-white">≈ {estimate.text}</div>
                  <div className="text-[11px] text-white/60 mt-1">{t("fare_variable_note")}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModal("whatsapp")}
                    className="liquid-glass liquid-green flex flex-col items-center justify-center rounded-2xl px-3 py-2 font-semibold text-sm"
                  >
                    <MessageCircle className="h-4 w-4 mb-1" />
                    {t("book_via_wa")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal("call")}
                    className="liquid-glass liquid-gold flex flex-col items-center justify-center rounded-2xl px-3 py-2 font-semibold text-sm"
                  >
                    <Phone className="h-4 w-4 mb-1" />
                    {t("call_to_book")}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass liquid-dark mt-4 inline-flex items-center justify-center gap-2 rounded-2xl font-semibold px-5 py-3"
          >
            {t("search_cars")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Booking save modal */}
      {modal && (
        <BookingModal
          open={!!modal}
          onClose={() => setModal(null)}
          action={modal}
          whatsappUrl={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
          callUrl={`tel:+${CALL_PHONE}`}
          payload={{
            pickup_location: from || "-",
            destination: to || "-",
            trip_date: date || null,
            pickup_time: time || null,
            trip_type: outside ? "outside" : "inside",
            car_key: car.key,
            car_name: car.name,
            distance_km: km,
            estimate_min: estimate?.low ?? null,
            estimate_max: estimate?.high ?? null,
            source: "hero_widget",
          } as BookingPayload}
        />
      )}
    </section>
  );
};

/* ---------- Trust stat pill ---------- */
const Stat = ({ value }: { value: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
    {value}
  </span>
);

/* ---------- Route Preview (curved SVG line w/ midpoint km marker) ---------- */
const RoutePreview = ({ fromLabel, toLabel, km, minutes, perKm, outside, approxWord }: { fromLabel: string; toLabel: string; km: number; minutes: number | null; perKm: number; outside: boolean; approxWord: string }) => {
  const W = 600, H = 140;
  // Curved path from left to right
  const d = `M 40 ${H - 30} C ${W * 0.3} 20, ${W * 0.6} ${H - 10}, ${W - 40} 30`;
  const midX = W / 2;
  const midY = H / 2 + 5;
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32">
        {/* dashed road */}
        <path d={d} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
        {/* solid yellow overlay */}
        <path d={d} fill="none" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
        {/* From pin */}
        <circle cx="40" cy={H - 30} r="8" fill="#18181B" />
        <circle cx="40" cy={H - 30} r="3" fill="#FFD700" />
        <text x="40" y={H - 8} textAnchor="middle" className="fill-[#18181B]" fontSize="11" fontWeight="700">{fromLabel}</text>
        {/* To pin */}
        <circle cx={W - 40} cy="30" r="8" fill="#E11D48" />
        <circle cx={W - 40} cy="30" r="3" fill="#fff" />
        <text x={W - 40} y="55" textAnchor="middle" className="fill-[#18181B]" fontSize="11" fontWeight="700">{toLabel}</text>
        {/* Midpoint km marker (approximate) */}
        <g transform={`translate(${midX} ${midY})`}>
          <rect x="-48" y="-14" width="96" height="28" rx="14" fill="#18181B" />
          <text x="0" y="5" textAnchor="middle" fill="#FFD700" fontSize="13" fontWeight="800">≈ {km} km</text>
        </g>
      </svg>
      <div className="text-[11px] text-muted-foreground text-center mt-1">
        {outside ? <>≈ {km} km × ৳{perKm}/km{minutes != null && <> · ~{formatDuration(minutes)}</>} ({approxWord})</> : <>≈ {km} km{minutes != null && <> · ~{formatDuration(minutes)}</>} ({approxWord})</>}
      </div>

    </div>
  );
};

/* ---------- District autocomplete field ---------- */
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
