import type { ReactNode } from "react";

const SectionKicker = ({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "yellow" }) => (
  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${tone === "yellow" ? "text-brand-yellow" : "text-brand-red"}`}>
    <span className={`h-1.5 w-6 rounded-full ${tone === "yellow" ? "bg-brand-yellow" : "bg-brand-red"}`} />
    {children}
  </span>
);

export default SectionKicker;
