import { useEffect, useMemo, useState } from "react";
import { MapPin, ArrowRight, Car as CarIconLucide, Phone, MessageCircle, Timer, Plane, Hospital } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { districts, distanceKm, isInsideDhakaDivision, estimateMinutes, formatDuration } from "@/data/districts";
import { fleet, formatBDT, formatRange, type CarKey } from "@/data/fleet";
import CarIcon from "@/components/site/CarIcon";
import { useLang } from "@/context/LanguageContext";
import BookingModal, { type BookingPayload } from "@/components/site/BookingModal";
import DateField from "@/components/site/DateField";
import TimeField from "@/components/site/TimeField";

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
        <img src={heroCar} alt="" aria-hidden="true" fetchPriority="high" className="w-full h-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 px-4 py-1.5 text-xs font-semibold text-brand-yellow uppercase tracking-wider reveal">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
            {t("hero_badge")}
          </span>
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] text-balance reveal reveal-delay-1">
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
          <div className="mt-6 rounded-2xl border border-border/70 bg-muted/10 p-5 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h4 className="font-display font-semibold text-base text-brand-black flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                {t("route_preview")}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {approxKm != null && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1.5">
                    <MapPin className="h-3 w-3" /> {t("distance")}: ≈ {approxKm} km ({approxWord})
                  </span>
                )}
                {minutes != null && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-black bg-brand-yellow/25 rounded-full px-3 py-1.5">
                    <Timer className="h-3 w-3" /> {t("est_time")}: ≈ {formatDuration(minutes)}
                  </span>
                )}

              </div>
            </div>

            {!matchedFrom || !matchedTo ? (
              <p className="text-sm text-muted-foreground py-10 text-center">{t("pick_route")}</p>
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

/* ---------- Small illustrated scene pieces (kept as reusable vector components) ---------- */
const SceneTree = ({ x, y, s = 1, c = "#4ade80" }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-2" y="0" width="4" height="9" fill="#92653b" />
    <circle cx="-6" cy="-3" r="6.5" fill={c} opacity="0.85" />
    <circle cx="6" cy="-3" r="6.5" fill={c} opacity="0.85" />
    <circle cx="0" cy="-8" r="8.5" fill={c} />
  </g>
);

const ScenePond = ({ x, y, rx = 24, ry = 10 }: { x: number; y: number; rx?: number; ry?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={rx} ry={ry} fill="#7dd3fc" opacity="0.55" />
    <ellipse rx={rx * 0.55} ry={ry * 0.4} cy={-ry * 0.3} fill="#e0f2fe" opacity="0.7" />
  </g>
);

const SceneHome = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="-12" y="-2" width="24" height="17" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    <path d="M -15 -2 L 0 -15 L 15 -2 Z" fill="#f59e0b" />
    <rect x="-3.5" y="5" width="7" height="10" fill="#92653b" />
    <rect x="5" y="2" width="4.5" height="4.5" fill="#7dd3fc" stroke="#94a3b8" strokeWidth="0.6" />
    <rect x="-9.5" y="2" width="4.5" height="4.5" fill="#7dd3fc" stroke="#94a3b8" strokeWidth="0.6" />
  </g>
);

const SceneBuildings = ({ x, y }: { x: number; y: number }) => {
  const blocks = [
    { dx: 0, h: 46, w: 15, fill: "#cbd5e1" },
    { dx: 17, h: 64, w: 15, fill: "#94a3b8" },
    { dx: 34, h: 38, w: 15, fill: "#cbd5e1" },
  ];
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.92">
      {blocks.map((b, i) => (
        <g key={i} transform={`translate(${b.dx} ${-b.h})`}>
          <rect width={b.w} height={b.h} fill={b.fill} />
          {Array.from({ length: Math.max(1, Math.floor(b.h / 11)) }).map((_, r) => (
            <g key={r}>
              <rect x={3} y={6 + r * 11} width={3} height={3.5} fill="#fefce8" opacity="0.85" />
              <rect x={b.w - 6} y={6 + r * 11} width={3} height={3.5} fill="#fefce8" opacity="0.6" />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
};

const SceneCar = ({ x, y, className = "" }: { x: number; y: number; className?: string }) => (
  <g transform={`translate(${x} ${y})`} className={className}>
    <ellipse cx="0" cy="15" rx="17" ry="3" fill="#000" opacity="0.16" />
    <path d="M -17 6 Q -15 -7 -6 -9 L 6 -9 Q 15 -7 17 6 Z" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
    <rect x="-17" y="4" width="34" height="6" rx="3" fill="#e2e8f0" />
    <rect x="-10" y="-9" width="7" height="5" rx="1" fill="#bae6fd" opacity="0.9" />
    <rect x="3" y="-9" width="7" height="5" rx="1" fill="#bae6fd" opacity="0.9" />
    <circle cx="-9" cy="10" r="3.6" fill="#18181B" />
    <circle cx="9" cy="10" r="3.6" fill="#18181B" />
    <circle cx="-9" cy="10" r="1.4" fill="#94a3b8" />
    <circle cx="9" cy="10" r="1.4" fill="#94a3b8" />
  </g>
);

/* ---------- Route Preview (illustrated road, two curve designs + conditional destination markers) ---------- */

// Lucide icon path data (Plane / Hospital) embedded as nested <svg> so the marker
// renders pixel-accurate inside the road SVG at any viewport size.
const PLANE_ICON_PATH =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";
const HOSPITAL_ICON_PATHS = [
  "M12 6v4",
  "M14 14h-4",
  "M14 18h-4",
  "M14 8h-4",
  "M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
  "M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18",
];

type DestinationMarkerType = "airport" | "hospital" | "pin";

const getDestinationMarkerType = (label: string): DestinationMarkerType => {
  const l = label.toLowerCase();
  if (l.includes("airport") || l.includes("বিমানবন্দর")) return "airport";
  if (l.includes("hospital") || l.includes("clinic") || l.includes("হাসপাতাল") || l.includes("ক্লিনিক")) return "hospital";
  return "pin";
};

const RoutePreview = ({ fromLabel, toLabel, km, minutes, perKm, outside, approxWord }: { fromLabel: string; toLabel: string; km: number; minutes: number | null; perKm: number; outside: boolean; approxWord: string }) => {
  const W = 760, H = 230;
  const destType = useMemo(() => getDestinationMarkerType(toLabel), [toLabel]);

  // Two custom road designs: a sweeping open-highway curve for "Outside Dhaka" trips,
  // and a tighter winding street curve for "Inside Dhaka" trips.
  const d = outside
    ? `M 56 172 C 210 44, 330 214, 470 120 S 630 22, 706 70`
    : `M 56 130 C 178 202, 276 32, 388 130 S 596 204, 706 106`;
  const fromX = 56;
  const fromY = outside ? 172 : 130;
  const toX = 706;
  const toY = outside ? 70 : 106;
  const carX = outside ? 470 : 388;
  const carY = outside ? 120 : 130;
  const midX = W / 2 + 8;
  const midY = outside ? 150 : 168;

  const pinFill = destType === "pin" ? "#E11D48" : "#18181B";

  return (
    <div className="group relative w-full rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-br from-sky-50 via-emerald-50/50 to-amber-50/40 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <style>{`
        @keyframes ecr-drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        .ecr-car { animation: ecr-drift 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .ecr-car { animation: none; } }
      `}</style>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-52 sm:h-60" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ecr-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
          <linearGradient id="ecr-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#ecr-sky)" opacity="0.5" />

        {/* ponds */}
        <ScenePond x={140} y={outside ? 200 : 40} rx={30} ry={13} />
        <ScenePond x={600} y={outside ? 30 : 195} rx={26} ry={11} />

        {/* scattered trees for depth */}
        <SceneTree x={95} y={outside ? 148 : 60} s={0.9} c="#4ade80" />
        <SceneTree x={225} y={outside ? 195 : 185} s={1.1} c="#22c55e" />
        <SceneTree x={330} y={outside ? 45 : 40} s={0.8} c="#4ade80" />
        <SceneTree x={420} y={outside ? 200 : 195} s={1} c="#22c55e" />
        <SceneTree x={545} y={outside ? 40 : 55} s={0.9} c="#4ade80" />
        <SceneTree x={655} y={outside ? 195 : 175} s={1} c="#22c55e" />

        {/* origin home */}
        <SceneHome x={fromX - 4} y={fromY - 42} />

        {/* destination skyline for generic pin case */}
        {destType === "pin" && <SceneBuildings x={toX + 16} y={toY + 6} />}

        {/* road shadow + surface + dashed centerline */}
        <path d={d} fill="none" stroke="#000" strokeWidth="15" strokeLinecap="round" opacity="0.08" transform="translate(0,4)" />
        <path d={d} fill="none" stroke="url(#ecr-road)" strokeWidth="12" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="8 8" opacity="0.9" />

        {/* riding car */}
        <SceneCar x={carX} y={carY - 15} className="ecr-car" />

        {/* From marker with live-pulse ring */}
        <circle cx={fromX} cy={fromY} r="10" fill="#16A34A" opacity="0.35" className="animate-ping" />
        <circle cx={fromX} cy={fromY} r="10" fill="#ffffff" stroke="#16A34A" strokeWidth="3.5" />
        <circle cx={fromX} cy={fromY} r="3.5" fill="#16A34A" />

        {/* Distance badge on the road */}
        <g transform={`translate(${midX} ${midY})`}>
          <rect x="-42" y="-16" width="84" height="32" rx="16" fill="#18181B" />
          <text x="0" y="5" textAnchor="middle" fill="#FFD700" fontSize="14" fontWeight="800">≈ {km} km</text>
        </g>

        {/* To marker: teardrop pin, colored/iconed by destination type, with live-pulse ring */}
        <circle cx={toX} cy={toY - 4} r="11" fill={pinFill} opacity="0.3" className="animate-ping" />
        <g transform={`translate(${toX} ${toY})`}>
          <path
            d="M0 -26 C 12 -26 21 -16 21 -4 C 21 11 0 28 0 28 C 0 28 -21 11 -21 -4 C -21 -16 -12 -26 0 -26 Z"
            fill={pinFill}
          />
          <circle cx="0" cy="-4" r="11" fill="#ffffff" />
          {destType === "airport" && (
            <svg x="-7.5" y="-11.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={PLANE_ICON_PATH} />
            </svg>
          )}
          {destType === "hospital" && (
            <svg x="-7.5" y="-11.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {HOSPITAL_ICON_PATHS.map((p) => (
                <path key={p} d={p} />
              ))}
            </svg>
          )}
          {destType === "pin" && <circle cx="0" cy="-4" r="4.5" fill="#E11D48" />}
        </g>
      </svg>

      {/* From / To labels */}
      <div className="absolute left-4 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-brand-black/90 text-white text-xs font-bold px-3 py-1.5 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {fromLabel}
      </div>
      <div className="absolute right-4 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-black/90 text-white text-xs font-bold px-3 py-1.5 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
        {destType === "airport" && <Plane className="h-3.5 w-3.5 text-brand-yellow" />}
        {destType === "hospital" && <Hospital className="h-3.5 w-3.5 text-red-400" />}
        {destType === "pin" && <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />}
        {toLabel}
      </div>
      <div className="relative text-xs text-muted-foreground text-center py-2.5 bg-background/40 border-t border-border/40">
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
