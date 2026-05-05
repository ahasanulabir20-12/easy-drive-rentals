import type { CarKey } from "@/data/fleet";

// Minimalist vector car silhouettes — color via currentColor
const paths: Record<CarKey, JSX.Element> = {
  noah: (
    // Tall MPV / van shape
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 36V22l5-9h28l5 9v14" />
      <path d="M11 13h28" />
      <path d="M6 28h44" />
      <path d="M16 22h10M30 22h10" />
      <circle cx="16" cy="38" r="4" />
      <circle cx="40" cy="38" r="4" />
    </g>
  ),
  hiace: (
    // Long microbus
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 36V18l4-6h40v24" />
      <path d="M7 12h40" />
      <path d="M3 28h44" />
      <path d="M11 18h8M21 18h8M31 18h8" />
      <circle cx="14" cy="38" r="4" />
      <circle cx="40" cy="38" r="4" />
    </g>
  ),
  axio: (
    // Standard sedan
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 36c0-4 2-8 6-9l4-7c1-2 3-3 5-3h16c2 0 4 1 5 3l4 7c4 1 6 5 6 9" />
      <path d="M14 20l-3 7h32l-3-7" />
      <path d="M28 20v7" />
      <circle cx="14" cy="38" r="4" />
      <circle cx="40" cy="38" r="4" />
    </g>
  ),
  allion: (
    // Premium sedan w/ extra trim line
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 36c0-5 2-9 7-10l4-7c1-2 3-3 5-3h16c2 0 4 1 5 3l4 7c5 1 7 5 7 10" />
      <path d="M14 19l-4 8h34l-4-8" />
      <path d="M27 19v8" />
      <path d="M9 32h32" />
      <circle cx="14" cy="38" r="4" />
      <circle cx="40" cy="38" r="4" />
    </g>
  ),
  "x-corolla": (
    // Sporty sedan with raked roof
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 36c0-4 2-8 6-9l5-8c1-2 3-3 5-3h14c2 0 4 1 5 3l5 8c4 1 6 5 6 9" />
      <path d="M15 19l-4 8h30l-4-8" />
      <path d="M26 19v8" />
      <circle cx="14" cy="38" r="4" />
      <circle cx="40" cy="38" r="4" />
      <path d="M44 30l3-2" />
    </g>
  ),
  "g-corolla": (
    // Premium corolla — boxier roof + grille
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 36c0-5 2-9 6-10l4-7c1-2 3-3 5-3h17c2 0 4 1 5 3l4 7c4 1 6 5 6 10" />
      <path d="M13 19l-3 8h32l-3-8" />
      <path d="M27 19v8" />
      <path d="M20 33h14" />
      <circle cx="14" cy="38" r="4" />
      <circle cx="40" cy="38" r="4" />
    </g>
  ),
};

const CarIcon = ({ type, className = "" }: { type: CarKey; className?: string }) => (
  <svg
    viewBox="0 0 54 44"
    className={className}
    aria-hidden="true"
  >
    {paths[type]}
  </svg>
);

export default CarIcon;
