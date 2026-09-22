import { useState } from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

type Props = {
  value: string; // HH:mm
  onChange: (v: string) => void;
};

const bnDigits = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const slots: { time: string; part: { en: string; bn: string } }[] = [
  { time: "05:30", part: { en: "Dawn", bn: "ভোর" } },
  { time: "06:00", part: { en: "Morning", bn: "সকাল" } },
  { time: "07:00", part: { en: "Morning", bn: "সকাল" } },
  { time: "07:30", part: { en: "Morning", bn: "সকাল" } },
  { time: "08:00", part: { en: "Morning", bn: "সকাল" } },
  { time: "09:00", part: { en: "Morning", bn: "সকাল" } },
  { time: "10:00", part: { en: "Morning", bn: "সকাল" } },
  { time: "11:00", part: { en: "Noon", bn: "দুপুর" } },
  { time: "12:00", part: { en: "Noon", bn: "দুপুর" } },
  { time: "14:00", part: { en: "Afternoon", bn: "দুপুর" } },
  { time: "16:00", part: { en: "Afternoon", bn: "বিকেল" } },
  { time: "18:00", part: { en: "Evening", bn: "সন্ধ্যা" } },
  { time: "20:00", part: { en: "Night", bn: "রাত" } },
  { time: "21:30", part: { en: "Night", bn: "রাত" } },
  { time: "23:00", part: { en: "Late night", bn: "গভীর রাত" } },
];

const to12 = (v: string) => {
  const [hStr, m] = v.split(":");
  const h = Number(hStr);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, "0")}:${m} ${suffix}`;
};

const partOf = (v: string) => {
  const h = Number(v.split(":")[0]);
  if (h < 5) return { en: "Late night", bn: "গভীর রাত" };
  if (h < 6) return { en: "Dawn", bn: "ভোর" };
  if (h < 12) return { en: "Morning", bn: "সকাল" };
  if (h < 15) return { en: "Noon", bn: "দুপুর" };
  if (h < 18) return { en: "Afternoon", bn: "বিকেল" };
  if (h < 20) return { en: "Evening", bn: "সন্ধ্যা" };
  return { en: "Night", bn: "রাত" };
};

const TimeField = ({ value, onChange }: Props) => {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  const fmt = (v: string) => (lang === "bn" ? bnDigits(to12(v)) : to12(v));

  return (
    <div className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("pickup_time")}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "mt-1 w-full flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-left transition-smooth",
              "hover:border-brand-yellow hover:shadow-[0_0_0_4px_hsl(var(--brand-yellow)/0.12)]",
              open && "border-brand-yellow ring-2 ring-brand-yellow/20"
            )}
          >
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-brand-yellow/15 text-brand-yellow-foreground shrink-0">
              <Clock className="h-4 w-4" />
            </span>
            <span className="flex-1 min-w-0">
              <span className={cn("block text-sm font-semibold truncate", !value && "text-muted-foreground font-normal")}>
                {value ? fmt(value) : lang === "bn" ? "সময় নির্বাচন করুন" : "Select a time"}
              </span>
              {value && (
                <span className="block text-[10px] text-muted-foreground truncate">
                  {lang === "bn" ? partOf(value).bn : partOf(value).en}
                </span>
              )}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[min(20rem,90vw)] p-3 rounded-2xl border-border shadow-card">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {lang === "bn" ? "পিকআপ সময় বাছুন" : "Choose pickup time"}
          </div>
          <div className="grid grid-cols-3 gap-2 max-h-56 overflow-auto pointer-events-auto">
            {slots.map((s) => {
              const active = value === s.time;
              return (
                <button
                  key={s.time}
                  type="button"
                  onClick={() => { onChange(s.time); setOpen(false); }}
                  className={cn(
                    "rounded-xl border px-2 py-2 text-center transition-smooth",
                    active
                      ? "border-brand-yellow bg-brand-yellow/10"
                      : "border-border hover:border-brand-yellow/60 hover:bg-muted/40"
                  )}
                >
                  <div className="text-xs font-semibold">{fmt(s.time)}</div>
                  <div className="text-[10px] text-muted-foreground">{lang === "bn" ? s.part.bn : s.part.en}</div>
                </button>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {lang === "bn" ? "নিজের সময় দিন" : "Custom time"}
            </label>
            <input
              type="time"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-yellow"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeField;
