import { useMemo, useState } from "react";
import { format, parse, addDays, isSameDay, startOfToday } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

type Props = {
  value: string; // yyyy-MM-dd
  onChange: (v: string) => void;
};

const bnDigits = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const DateField = ({ value, onChange }: Props) => {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const today = startOfToday();

  const selected = useMemo(() => {
    if (!value) return undefined;
    const d = parse(value, "yyyy-MM-dd", new Date());
    return isNaN(d.getTime()) ? undefined : d;
  }, [value]);

  const pick = (d?: Date) => {
    if (!d) return;
    onChange(format(d, "yyyy-MM-dd"));
    setOpen(false);
  };

  const quick = [
    { label: lang === "bn" ? "আজ" : "Today", date: today },
    { label: lang === "bn" ? "আগামীকাল" : "Tomorrow", date: addDays(today, 1) },
    { label: lang === "bn" ? "পরশু" : "Day after", date: addDays(today, 2) },
  ];

  const display = selected
    ? lang === "bn"
      ? bnDigits(format(selected, "d MMM, EEE"))
      : format(selected, "d MMM, EEE")
    : lang === "bn"
      ? "তারিখ বেছে নিন"
      : "Select a date";

  return (
    <div className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("date")}</span>
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
              <CalendarDays className="h-4 w-4" />
            </span>
            <span className="flex-1 min-w-0">
              <span className={cn("block text-sm font-semibold truncate", !selected && "text-muted-foreground font-normal")}>
                {display}
              </span>
              {selected && (
                <span className="block text-[10px] text-muted-foreground truncate">
                  {lang === "bn" ? bnDigits(format(selected, "yyyy")) : format(selected, "yyyy")}
                </span>
              )}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0 rounded-2xl border-border shadow-card overflow-hidden">
          <div className="flex gap-2 p-3 pb-0">
            {quick.map((q) => {
              const active = selected && isSameDay(selected, q.date);
              return (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => pick(q.date)}
                  className={cn(
                    "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-smooth border",
                    active
                      ? "liquid-glass liquid-gold border-transparent"
                      : "border-border text-muted-foreground hover:border-brand-yellow/60 hover:text-foreground"
                  )}
                >
                  {q.label}
                </button>
              );
            })}
          </div>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={pick}
            disabled={{ before: today }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateField;
