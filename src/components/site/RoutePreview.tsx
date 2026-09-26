import { useEffect, useId, useRef, useState } from "react";
import { MapPin, Clock, Plane, Hospital, TrainFront, GraduationCap } from "lucide-react";
import { formatDuration } from "@/data/districts";
import { getDestinationType, type DestinationType } from "@/data/destination";
import { useLang } from "@/context/LanguageContext";

/* ============================================================================
   RoutePreview — animated illustrated route card.
   Layout: FROM (left: home + car at road start) → winding road → TO (right:
   landmark scene that changes by destination type).
   Destination types: airport | hospital | railway | school | generic
   ========================================================================== */

/* ------------------------------ motion helpers ----------------------------- */

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
};

/** Eased count-up number (used for the on-road distance badge). */
const useCountUp = (target: number, duration = 900) => {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return val;
};

/* ------------------------------ scene pieces ------------------------------- */

const Tree = ({ x, y, s = 1, c = "#4ade80" }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-2.5" y="-2" width="5" height="12" rx="2" fill="#8a5a33" />
    <circle cx="-7" cy="-6" r="8" fill={c} opacity="0.9" />
    <circle cx="7" cy="-6" r="8" fill={c} opacity="0.9" />
    <circle cx="0" cy="-13" r="10" fill={c} />
    <circle cx="-3" cy="-15" r="3.5" fill="#ffffff" opacity="0.35" />
  </g>
);

const Pond = ({ x, y, rx = 24, ry = 10 }: { x: number; y: number; rx?: number; ry?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={rx} ry={ry} fill="#9fd8f5" opacity="0.8" />
    <ellipse rx={rx * 0.55} ry={ry * 0.4} cy={-ry * 0.3} fill="#dff3ff" opacity="0.9" />
  </g>
);

const Cloud = ({ x, y, s = 1, dur = "9s" }: { x: number; y: number; s?: number; dur?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g className="ecr-cloud" style={{ animationDuration: dur }}>
      <ellipse cx="0" cy="0" rx="22" ry="9" fill="#ffffff" opacity="0.95" />
      <circle cx="-12" cy="-4" r="8" fill="#ffffff" opacity="0.95" />
      <circle cx="2" cy="-7" r="10" fill="#ffffff" opacity="0.95" />
      <circle cx="14" cy="-3" r="7" fill="#ffffff" opacity="0.95" />
    </g>
  </g>
);

const OriginHome = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    {/* walkway down to the road */}
    <rect x="-7" y="22" width="14" height="34" rx="3" fill="#d6cfc2" opacity="0.9" />
    <rect x="-17" y="0" width="34" height="24" rx="1.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
    <path d="M -21 1 L 0 -16 L 21 1 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" />
    <rect x="10" y="-12" width="5" height="9" fill="#cbd5e1" />
    <rect x="-4" y="10" width="8" height="14" rx="1" fill="#92653b" />
    <rect x="-14" y="6" width="6" height="6" rx="1" fill="#7dd3fc" stroke="#94a3b8" strokeWidth="0.7" />
    <rect x="8" y="6" width="6" height="6" rx="1" fill="#7dd3fc" stroke="#94a3b8" strokeWidth="0.7" />
  </g>
);

/** Cute side-view car facing +x (used with rotate="auto" on the road path). */
const DrivingCar = () => (
  <g>
    <ellipse cx="0" cy="10" rx="18" ry="3" fill="#000000" opacity="0.18" />
    <rect x="-18" y="-3" width="36" height="8" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
    <path d="M -11 -3 L -6 -11 L 7 -11 L 13 -3 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" strokeLinejoin="round" />
    <rect x="-8.5" y="-10" width="6.5" height="5" rx="1" fill="#7dd3fc" />
    <rect x="1" y="-10" width="6.5" height="5" rx="1" fill="#7dd3fc" />
    <rect x="-18" y="0.5" width="36" height="2.4" fill="#FFD700" opacity="0.9" />
    <circle cx="16.5" cy="-0.5" r="1.6" fill="#fef08a" stroke="#eab308" strokeWidth="0.8" />
    <g>
      <circle cx="-10" cy="5" r="4" fill="#18181B" />
      <circle cx="10" cy="5" r="4" fill="#18181B" />
      <g className="ecr-wheel">
        <line x1="-10" y1="2.2" x2="-10" y2="7.8" stroke="#94a3b8" strokeWidth="1.4" />
        <line x1="10" y1="2.2" x2="10" y2="7.8" stroke="#94a3b8" strokeWidth="1.4" />
      </g>
    </g>
  </g>
);

/* --------------------- destination landmark scenes ------------------------- */
/* Each scene is drawn around the destination area (x ~545-745, baseline ~208) */

const GenericScene = () => (
  <g>
    <ellipse cx="650" cy="206" rx="70" ry="9" fill="#16A34A" opacity="0.12" />
    {/* block 1 */}
    <rect x="598" y="158" width="30" height="42" rx="2" fill="#d7e0ec" />
    <rect x="598" y="158" width="30" height="5" fill="#b9c6d8" />
    {Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 2 }).map((_, c) => (
        <rect key={`${r}-${c}`} x={603 + c * 13} y={167 + r * 10} width="8" height="6" rx="1" fill="#fffdf5" opacity="0.95" />
      ))
    )}
    {/* block 2 (tall) */}
    <rect x="630" y="136" width="34" height="64" rx="2" fill="#aebdd2" />
    <rect x="630" y="136" width="34" height="5" fill="#8ba0bd" />
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 2 }).map((_, c) => (
        <rect key={`${r}-${c}`} x={635 + c * 15} y={145 + r * 10} width="9" height="6" rx="1" fill="#fffdf5" opacity="0.9" />
      ))
    )}
    <rect x="642" y="186" width="10" height="14" rx="1" fill="#475569" />
    {/* block 3 */}
    <rect x="666" y="164" width="28" height="36" rx="2" fill="#e6dcc8" />
    <rect x="666" y="164" width="28" height="5" fill="#cfc2a4" />
    {Array.from({ length: 2 }).map((_, r) =>
      Array.from({ length: 2 }).map((_, c) => (
        <rect key={`${r}-${c}`} x={670 + c * 12} y={173 + r * 10} width="7" height="6" rx="1" fill="#ffffff" opacity="0.9" />
      ))
    )}
    <Tree x={588} y={200} s={0.8} />
  </g>
);

const AirportScene = () => (
  <g>
    <ellipse cx="650" cy="206" rx="72" ry="9" fill="#16A34A" opacity="0.12" />
    {/* tarmac */}
    <rect x="586" y="194" width="150" height="10" rx="3" fill="#9aa3b2" opacity="0.85" />
    <rect x="592" y="198" width="14" height="2" fill="#ffffff" opacity="0.8" />
    <rect x="614" y="198" width="14" height="2" fill="#ffffff" opacity="0.8" />
    <rect x="636" y="198" width="14" height="2" fill="#ffffff" opacity="0.8" />
    {/* terminal */}
    <rect x="600" y="150" width="88" height="46" rx="3" fill="#eef4fb" stroke="#b9c6d8" strokeWidth="1.2" />
    <rect x="596" y="143" width="96" height="9" rx="4.5" fill="#ffffff" stroke="#b9c6d8" strokeWidth="1.2" />
    {Array.from({ length: 5 }).map((_, c) => (
      <g key={c}>
        <rect x={605 + c * 16} y={157} width="12" height="14" rx="1" fill="#7db8e8" opacity="0.9" />
        <rect x={605 + c * 16} y={174} width="12" height="14" rx="1" fill="#7db8e8" opacity="0.65" />
      </g>
    ))}
    <rect x="634" y="184" width="20" height="12" rx="1" fill="#334155" opacity="0.85" />
    {/* control tower */}
    <rect x="700" y="118" width="13" height="78" fill="#dde5ef" stroke="#b9c6d8" strokeWidth="1" />
    <rect x="693" y="104" width="27" height="17" rx="3" fill="#334155" />
    <rect x="695.5" y="107" width="22" height="7" rx="1.5" fill="#7dd3fc" />
    <line x1="706.5" y1="104" x2="706.5" y2="94" stroke="#64748b" strokeWidth="1.6" />
    <circle cx="706.5" cy="92.5" r="1.8" fill="#E11D48" />
    {/* parked planes (top view) */}
    <g transform="translate(618 199)">
      <ellipse cx="0" cy="0" rx="9" ry="2.6" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
      <path d="M2 -7 L6 -7 L3 0 L6 7 L2 7 L0 0 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
      <path d="M-9 -3 L-6 -3 L-6 3 L-9 3 Z" fill="#E11D48" />
    </g>
    <g transform="translate(664 199) rotate(180)">
      <ellipse cx="0" cy="0" rx="9" ry="2.6" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
      <path d="M2 -7 L6 -7 L3 0 L6 7 L2 7 L0 0 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
      <path d="M-9 -3 L-6 -3 L-6 3 L-9 3 Z" fill="#eab308" />
    </g>
    {/* flying plane — drifts across the whole sky, behind the clouds */}
  </g>
);

/** Passenger plane flying across the sky (rendered above the sky, below clouds). */
const FlyingPlane = () => (
  <g transform="translate(0 46)">
    <g className="ecr-fly">
      <line x1="-72" y1="4" x2="-30" y2="4" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="-66" y1="10" x2="-34" y2="10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <g className="ecr-bob" style={{ animationDuration: "2.2s" }}>
        <rect x="-28" y="-6" width="54" height="12" rx="6" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
        <path d="M-28 -6 L-35 -17 L-26 -17 L-21 -6 Z" fill="#E11D48" />
        <path d="M-4 -6 L-13 -19 L-4 -19 L7 -6 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.2" strokeLinejoin="round" />
        {[-12, -5, 2, 9].map((x) => (
          <circle key={x} cx={x} cy="-1" r="1.7" fill="#38bdf8" />
        ))}
        <rect x="20" y="-4.5" width="5" height="5" rx="2" fill="#334155" />
      </g>
    </g>
  </g>
);

const HospitalScene = () => (
  <g>
    <ellipse cx="650" cy="208" rx="72" ry="9" fill="#16A34A" opacity="0.12" />
    {/* side wing */}
    <rect x="586" y="158" width="22" height="40" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
    <rect x="590" y="164" width="14" height="8" rx="1" fill="#bae6fd" />
    <rect x="590" y="176" width="14" height="8" rx="1" fill="#bae6fd" />
    {/* main building */}
    <rect x="606" y="140" width="86" height="58" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
    {Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 3 }).map((_, c) => (
        <rect key={`${r}-${c}`} x={612 + c * 13} y={148 + r * 11} width="9" height="6.5" rx="1" fill="#bae6fd" />
      ))
    )}
    {/* red cross */}
    <rect x="664" y="146" width="12" height="30" rx="2" fill="#E11D48" />
    <rect x="655" y="155" width="30" height="12" rx="2" fill="#E11D48" />
    {/* entrance */}
    <rect x="624" y="174" width="30" height="5" rx="2" fill="#E11D48" />
    <rect x="628" y="179" width="22" height="19" rx="1" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
    {/* ambulance */}
    <g>
      <rect x="548" y="196" width="34" height="15" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M582 196 h6 l6 6 v9 h-12 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="585" y1="199" x2="589" y2="199" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="548" y="202" width="44" height="3.5" fill="#E11D48" />
      <rect x="558" y="197.5" width="4" height="9" fill="#E11D48" />
      <rect x="555.5" y="200" width="9" height="4" fill="#E11D48" />
      <circle cx="556" cy="212" r="3.6" fill="#18181B" />
      <circle cx="584" cy="212" r="3.6" fill="#18181B" />
      <circle cx="553" cy="194" r="3" fill="#ef4444" className="ecr-blink-a" />
      <circle cx="561" cy="194" r="3" fill="#3b82f6" className="ecr-blink-b" />
    </g>
    {/* flower bushes */}
    <g transform="translate(600 202)">
      <circle cx="0" cy="0" r="5" fill="#4ade80" />
      <circle cx="-3" cy="-2" r="1.4" fill="#f472b6" />
      <circle cx="3" cy="-1" r="1.4" fill="#ffffff" />
    </g>
    <g transform="translate(700 202)">
      <circle cx="0" cy="0" r="5" fill="#4ade80" />
      <circle cx="2" cy="-2" r="1.4" fill="#f472b6" />
      <circle cx="-3" cy="0" r="1.4" fill="#facc15" />
    </g>
  </g>
);

const RailwayScene = () => (
  <g>
    <ellipse cx="650" cy="208" rx="72" ry="9" fill="#16A34A" opacity="0.12" />
    {/* tracks */}
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={i} x={474 + i * 14} y={246} width={5} height={13} rx={1.5} fill="#b09a8c" />
    ))}
    <rect x="470" y="249" width="275" height="3" rx="1.5" fill="#6b7280" />
    <rect x="470" y="256" width="275" height="3" rx="1.5" fill="#6b7280" />
    {/* sliding train */}
    <g>
      <g className="ecr-train">
        {[560, 618].map((x) => (
          <g key={x}>
            <rect x={x + 3} y={223} width={48} height={5} rx={2.5} fill="#9ca3af" />
            <rect x={x} y={226} width={54} height={20} rx={6} fill="#f8f1e3" stroke="#b91c1c" strokeWidth="1.5" />
            <rect x={x + 3} y={237} width={48} height={5} fill="#dc2626" />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={x + 6 + i * 15} y={229} width={11} height={7} rx={1.5} fill="#7dd3fc" stroke="#94a3b8" strokeWidth="0.6" />
            ))}
            <circle cx={x + 12} cy={247} r={4.2} fill="#18181B" />
            <circle cx={x + 42} cy={247} r={4.2} fill="#18181B" />
            <circle cx={x + 12} cy={247} r={1.5} fill="#d1d5db" />
            <circle cx={x + 42} cy={247} r={1.5} fill="#d1d5db" />
          </g>
        ))}
      </g>
    </g>
    {/* station building */}
    <rect x="610" y="156" width="80" height="40" rx="2" fill="#f3e7d3" stroke="#d6c3a3" strokeWidth="1.2" />
    <path d="M604 156 L650 134 L696 156 Z" fill="#8a6f4d" stroke="#6b5636" strokeWidth="1.2" strokeLinejoin="round" />
    <rect x="600" y="168" width="100" height="6" rx="2" fill="#64748b" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={616 + i * 17} y={179} width={11} height={12} rx="1" fill="#fde68a" stroke="#d6c3a3" strokeWidth="0.8" />
    ))}
    {/* clock tower */}
    <rect x="676" y="116" width="18" height="80" fill="#e8dcc6" stroke="#d6c3a3" strokeWidth="1.2" />
    <path d="M673 116 L685 102 L697 116 Z" fill="#8a6f4d" stroke="#6b5636" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="685" cy="128" r="8" fill="#ffffff" stroke="#57534e" strokeWidth="1.2" />
    <line x1="685" y1="128" x2="685" y2="122.5" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="685" y1="128" x2="689" y2="129.5" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" />
  </g>
);

const SchoolScene = () => (
  <g>
    <ellipse cx="650" cy="208" rx="72" ry="9" fill="#16A34A" opacity="0.12" />
    {/* main building */}
    <rect x="602" y="152" width="90" height="44" rx="2" fill="#b85c38" />
    <path d="M596 152 L647 132 L698 152 Z" fill="#7c3f21" stroke="#5b2d15" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="647" cy="146" r="7" fill="#ffffff" stroke="#7c3f21" strokeWidth="1.5" />
    <line x1="647" y1="146" x2="647" y2="141.5" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="647" y1="146" x2="650" y2="147.5" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={609 + i * 18} y={162} width={12} height={10} rx={1} fill="#fef3c7" />
    ))}
    <rect x="641" y="178" width="12" height="18" rx="1" fill="#5b2d15" />
    {/* side tower + waving flag */}
    <rect x="694" y="150" width="16" height="46" fill="#a34d2c" />
    <path d="M692 150 L702 140 L712 150 Z" fill="#7c3f21" />
    <line x1="702" y1="140" x2="702" y2="122" stroke="#57534e" strokeWidth="1.6" />
    <g className="ecr-wave">
      <rect x="702" y="122" width="20" height="11" rx="1.5" fill="#FFD700" stroke="#d97706" strokeWidth="0.8" />
    </g>
    {/* playground slide */}
    <rect x="588" y="184" width="10" height="6" rx="1" fill="#f59e0b" />
    <line x1="590" y1="190" x2="590" y2="206" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    <line x1="596" y1="190" x2="596" y2="206" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    <line x1="590" y1="195" x2="596" y2="195" stroke="#64748b" strokeWidth="1.5" />
    <line x1="590" y1="200" x2="596" y2="200" stroke="#64748b" strokeWidth="1.5" />
    <path d="M598 187 L577 208" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
    {/* book stack + apple */}
    <rect x="700" y="208" width="26" height="6" rx="1" fill="#3b82f6" />
    <rect x="702" y="202" width="22" height="6" rx="1" fill="#E11D48" />
    <rect x="705" y="196" width="17" height="6" rx="1" fill="#16A34A" />
    <circle cx="728" cy="209" r="4.5" fill="#ef4444" />
    <line x1="728" y1="205" x2="729" y2="202.5" stroke="#166534" strokeWidth="1.4" />
    {/* students */}
    <g>
      <circle cx="568" cy="198" r="3.2" fill="#fbbf24" />
      <rect x="565" y="201.5" width="6" height="9" rx="2.5" fill="#3b82f6" />
    </g>
    <g>
      <circle cx="581" cy="202" r="3.2" fill="#fbbf24" />
      <rect x="578" y="205.5" width="6" height="9" rx="2.5" fill="#E11D48" />
    </g>
  </g>
);

/* --------------------------- pins & road badge ----------------------------- */

const PLANE_ICON_PATH =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";

/** Green origin marker at the road start. */
const FromPin = ({ x, y, label }: { x: number; y: number; label: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cx="0" cy="0" r="10" fill="#16A34A" className="ecr-ping" />
    <g className="ecr-bob">
      <g className="ecr-pin">
        <title>{label}</title>
        <circle cx="0" cy="0" r="9.5" fill="#ffffff" stroke="#16A34A" strokeWidth="3.5" />
        <circle cx="0" cy="0" r="3.5" fill="#16A34A" />
      </g>
    </g>
  </g>
);

/** Red destination teardrop with a type-specific glyph. */
const ToPin = ({ x, y, type, label }: { x: number; y: number; type: DestinationType; label: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cx="0" cy="-24" r="12" fill="#E11D48" className="ecr-ping" style={{ animationDelay: "0.5s" }} />
    <g className="ecr-bob" style={{ animationDelay: "0.6s" }}>
      <g className="ecr-pin">
        <title>{label}</title>
        <path
          d="M0 0 C -3 -9 -17 -15 -17 -28 A 17 17 0 1 1 17 -28 C 17 -15 3 -9 0 0 Z"
          fill="#E11D48"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <circle cx="0" cy="-28" r="10.5" fill="#ffffff" />
        {type === "airport" && (
          <svg x="-8" y="-36" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={PLANE_ICON_PATH} />
          </svg>
        )}
        {type === "hospital" && (
          <g fill="#E11D48">
            <rect x="-3" y="-35" width="6" height="14" rx="1.5" />
            <rect x="-7" y="-31" width="14" height="6" rx="1.5" />
          </g>
        )}
        {type === "railway" && (
          <g>
            <rect x="-7" y="-36" width="14" height="12" rx="3" fill="#18181B" />
            <rect x="-5" y="-34" width="10" height="4.5" rx="1" fill="#ffffff" />
            <circle cx="-3.5" cy="-22.5" r="1.8" fill="#18181B" />
            <circle cx="3.5" cy="-22.5" r="1.8" fill="#18181B" />
          </g>
        )}
        {type === "school" && (
          <g fill="#18181B">
            <polygon points="0,-34.5 9,-31 0,-27.5 -9,-31" />
            <rect x="-4.5" y="-27.5" width="9" height="3.5" rx="1" />
            <line x1="9" y1="-31" x2="9" y2="-26.5" stroke="#18181B" strokeWidth="1.4" />
            <circle cx="9" cy="-25.5" r="1.2" />
          </g>
        )}
        {type === "generic" && <circle cx="0" cy="-28" r="5" fill="#E11D48" />}
      </g>
    </g>
  </g>
);

/* --------------------------------- main card -------------------------------- */

export type RoutePreviewProps = {
  fromLabel: string;
  toLabel: string;
  km: number;
  minutes: number | null;
  perKm: number;
  outside: boolean;
  approxWord: string;
};

const ROAD_D = "M 56 232 C 170 232 170 108 290 108 C 410 108 380 226 510 226 C 620 226 640 140 706 138";
const FROM_X = 56;
const FROM_Y = 232;
const TO_X = 706;
const TO_Y = 142;
const PILL_X = 382;
const PILL_Y = 116;

const RoutePreview = ({ fromLabel, toLabel, km, minutes, perKm, outside, approxWord }: RoutePreviewProps) => {
  const { t } = useLang();
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();
  const destType = getDestinationType(toLabel);
  const displayKm = useCountUp(km);

  const roadId = `ecr-road-${uid}`;
  const skyId = `ecr-sky-${uid}`;
  const groundId = `ecr-ground-${uid}`;
  const roadGradId = `ecr-roadg-${uid}`;

  // Pause the SMIL car motion for reduced-motion users (car rests at origin).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    try {
      if (reduced) svg.pauseAnimations();
      else svg.unpauseAnimations();
    } catch {
      /* older browsers: ignore */
    }
  }, [reduced]);

  return (
    <div className="group relative w-full rounded-2xl overflow-hidden border border-border/60 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <style>{`
        @keyframes ecr-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .ecr-bob { animation: ecr-bob 2.6s ease-in-out infinite; }
        @keyframes ecr-ping { 0% { transform: scale(0.55); opacity: 0.65; } 80%, 100% { transform: scale(2.1); opacity: 0; } }
        .ecr-ping { animation: ecr-ping 1.9s cubic-bezier(0, 0, 0.2, 1) infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes ecr-dash { to { stroke-dashoffset: -18; } }
        .ecr-dash { animation: ecr-dash 0.9s linear infinite; }
        @keyframes ecr-fly { from { transform: translateX(-140px); } to { transform: translateX(830px); } }
        .ecr-fly { animation: ecr-fly 17s linear infinite; }
        @keyframes ecr-train { from { transform: translateX(0); } to { transform: translateX(34px); } }
        .ecr-train { animation: ecr-train 4.5s ease-in-out infinite alternate; }
        @keyframes ecr-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
        .ecr-blink-a { animation: ecr-blink 0.9s ease-in-out infinite; }
        .ecr-blink-b { animation: ecr-blink 0.9s ease-in-out 0.45s infinite; }
        @keyframes ecr-wave { 0%, 100% { transform: skewY(0deg); } 50% { transform: skewY(7deg); } }
        .ecr-wave { animation: ecr-wave 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        @keyframes ecr-cloud-drift { from { transform: translateX(-14px); } to { transform: translateX(14px); } }
        .ecr-cloud { animation: ecr-cloud-drift 8s ease-in-out infinite alternate; }
        @keyframes ecr-spin { to { transform: rotate(360deg); } }
        .ecr-wheel { animation: ecr-spin 0.7s linear infinite; transform-box: fill-box; transform-origin: center; }
        .ecr-pin { transform-box: fill-box; transform-origin: bottom center; transition: transform 0.25s ease; cursor: pointer; }
        .ecr-pin:hover { transform: scale(1.18); }
        @keyframes ecr-enter { from { opacity: 0; transform: translateY(10px) scale(0.992); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .ecr-enter { animation: ecr-enter 0.45s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .ecr-bob, .ecr-ping, .ecr-dash, .ecr-fly, .ecr-train,
          .ecr-blink-a, .ecr-blink-b, .ecr-wave, .ecr-cloud, .ecr-wheel, .ecr-enter { animation: none; }
        }
      `}</style>

      {/* Header: title + railway-style rounded stat badges */}
      <div className="flex items-center justify-between gap-3 flex-wrap px-4 sm:px-5 pt-4 pb-3">
        <h4 className="font-display font-bold text-xl sm:text-2xl tracking-wide text-slate-900">
          {t("route_preview")}
        </h4>
        <div className="flex items-center gap-2">
          <span className="inline-flex flex-col items-center rounded-full bg-slate-100 px-5 py-1.5 leading-tight">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
              <MapPin className="h-3 w-3" /> {t("distance")}
            </span>
            <span className="text-sm font-extrabold text-slate-900">≈ {displayKm} km</span>
          </span>
          {minutes != null && (
            <span className="inline-flex flex-col items-center rounded-full bg-slate-100 px-5 py-1.5 leading-tight">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                <Clock className="h-3 w-3" /> {t("est_time")}
              </span>
              <span className="text-sm font-extrabold text-slate-900">≈ {formatDuration(minutes)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Illustrated scene (re-mounts with a transition when destination type changes) */}
      <div key={destType} className="ecr-enter relative bg-gradient-to-b from-sky-100/70 to-emerald-50/60">
        <svg ref={svgRef} viewBox="0 0 760 300" className="block w-full h-60 sm:h-72" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${fromLabel} to ${toLabel}`}>
          <defs>
            <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dceefc" />
              <stop offset="100%" stopColor="#f2fbf3" />
            </linearGradient>
            <linearGradient id={groundId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9f1dd" />
              <stop offset="100%" stopColor="#c4e8cb" />
            </linearGradient>
            <linearGradient id={roadGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f4652" />
              <stop offset="100%" stopColor="#23262d" />
            </linearGradient>
            <path id={roadId} d={ROAD_D} fill="none" />
          </defs>

          {/* sky + sun */}
          <rect x="0" y="0" width="760" height="300" fill={`url(#${skyId})`} />
          <circle cx="62" cy="42" r="21" fill="#FDE68A" opacity="0.45" />
          <circle cx="62" cy="42" r="14" fill="#FDE68A" />

          {/* airport flyover plane (behind clouds for depth) */}
          {destType === "airport" && <FlyingPlane />}

          {/* drifting clouds */}
          <Cloud x={205} y={38} s={1} dur="9s" />
          <Cloud x={480} y={30} s={0.8} dur="11s" />
          <Cloud x={655} y={52} s={0.9} dur="7.5s" />

          {/* ground */}
          <rect x="-24" y="96" width="808" height="228" rx="44" fill={`url(#${groundId})`} />
          <ellipse cx="250" cy="270" rx="90" ry="14" fill="#ffffff" opacity="0.35" />
          <ellipse cx="560" cy="120" rx="70" ry="10" fill="#ffffff" opacity="0.3" />

          {/* ponds */}
          <Pond x={120} y={150} rx={24} ry={10} />
          <Pond x={425} y={64} rx={20} ry={8} />

          {/* road: shadow + white edge + asphalt + marching centerline */}
          <use href={`#${roadId}`} stroke="#000000" strokeWidth="17" strokeLinecap="round" opacity="0.08" transform="translate(0 4)" />
          <use href={`#${roadId}`} stroke="#ffffff" strokeWidth="15" strokeLinecap="round" />
          <use href={`#${roadId}`} stroke={`url(#${roadGradId})`} strokeWidth="12" strokeLinecap="round" />
          <use href={`#${roadId}`} className="ecr-dash" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="9 9" strokeLinecap="round" opacity="0.95" />

          {/* origin home + destination landmark */}
          <OriginHome x={52} y={168} />
          {destType === "generic" && <GenericScene />}
          {destType === "airport" && <AirportScene />}
          {destType === "hospital" && <HospitalScene />}
          {destType === "railway" && <RailwayScene />}
          {destType === "school" && <SchoolScene />}

          {/* roadside trees */}
          <Tree x={100} y={72} s={1.05} />
          <Tree x={205} y={265} s={1} c="#22c55e" />
          <Tree x={330} y={58} s={0.85} />
          <Tree x={455} y={265} s={1} c="#22c55e" />
          <Tree x={565} y={72} s={0.9} />
          <Tree x={735} y={222} s={0.95} c="#22c55e" />

          {/* car driving along the road, starting at FROM */}
          <g>
            <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${roadId}`} />
            </animateMotion>
            <DrivingCar />
          </g>

          {/* on-road distance badge */}
          <g transform={`translate(${PILL_X} ${PILL_Y})`}>
            <rect x="-48" y="-17" width="96" height="34" rx="17" fill="#18181B" />
            <rect x="-48" y="-17" width="96" height="34" rx="17" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.55" />
            <text x="0" y="5.5" textAnchor="middle" fill="#FFD700" fontSize="15" fontWeight="800">
              ≈ {displayKm} km
            </text>
          </g>

          {/* markers */}
          <FromPin x={FROM_X} y={FROM_Y} label={fromLabel} />
          <ToPin x={TO_X} y={TO_Y} type={destType} label={toLabel} />
        </svg>

        {/* FROM / TO label pills */}
        <div className="absolute left-3 bottom-2.5 sm:left-4 sm:bottom-3 inline-flex items-center gap-1.5 rounded-full bg-brand-black/90 text-white text-xs font-bold px-3 py-1.5 shadow-sm max-w-[42%] transition-transform duration-300 group-hover:-translate-y-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="truncate">{fromLabel}</span>
        </div>
        <div className="absolute right-3 top-2.5 sm:right-4 sm:top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-black/90 text-white text-xs font-bold px-3 py-1.5 shadow-sm max-w-[46%] transition-transform duration-300 group-hover:-translate-y-0.5">
          {destType === "airport" && <Plane className="h-3.5 w-3.5 text-brand-yellow shrink-0" />}
          {destType === "hospital" && <Hospital className="h-3.5 w-3.5 text-red-400 shrink-0" />}
          {destType === "railway" && <TrainFront className="h-3.5 w-3.5 text-sky-300 shrink-0" />}
          {destType === "school" && <GraduationCap className="h-3.5 w-3.5 text-brand-yellow shrink-0" />}
          {destType === "generic" && <span className="h-1.5 w-1.5 rounded-full bg-brand-red shrink-0" />}
          <span className="truncate">{toLabel}</span>
        </div>
      </div>

      {/* fare context strip */}
      <div className="relative text-xs text-muted-foreground text-center py-2.5 bg-background/40 border-t border-border/40">
        {outside ? (
          <>
            ≈ {km} km × ৳{perKm}/km{minutes != null && <> · ~{formatDuration(minutes)}</>} ({approxWord})
          </>
        ) : (
          <>
            ≈ {km} km{minutes != null && <> · ~{formatDuration(minutes)}</>} ({approxWord})
          </>
        )}
      </div>
    </div>
  );
};

export default RoutePreview;
