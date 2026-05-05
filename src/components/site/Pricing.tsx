import { Info } from "lucide-react";
import { fleet, formatRange } from "@/data/fleet";
import { useLang } from "@/context/LanguageContext";

const Pricing = () => {
  const { t, lang } = useLang();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">{t("pricing_kicker")}</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
            {t("pricing_title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("pricing_sub")}</p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden md:block rounded-2xl border border-border overflow-hidden shadow-card">
          <table className="w-full text-left">
            <thead className="bg-brand-black text-white">
              <tr>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">{t("th_vehicle")}</th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">{t("th_inside")}</th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">{t("th_outside")}</th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider text-right">{t("th_perkm")}</th>
              </tr>
            </thead>
            <tbody>
              {fleet.map((c, i) => (
                <tr key={c.key} className={`${i % 2 === 0 ? "bg-background" : "bg-muted/40"} hover:bg-brand-yellow/10 transition-smooth`}>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{lang === "bn" ? c.type.bn : c.type.en} · {c.seats} {t("seats")}</div>
                  </td>
                  <td className="px-6 py-4 font-display font-semibold">{formatRange(c.inside.min, c.inside.max)}</td>
                  <td className="px-6 py-4 font-display font-semibold">{formatRange(c.outside.min, c.outside.max)}</td>
                  <td className="px-6 py-4 text-right font-display font-bold text-brand-red">৳{c.perKm}/km</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-3 text-xs text-muted-foreground bg-muted/30 border-t border-border">
            {t("fare_variable_note")}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="mt-10 grid gap-3 md:hidden">
          {fleet.map((c) => (
            <div key={c.key} className="rounded-xl border border-border p-4 bg-background shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-lg">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{lang === "bn" ? c.type.bn : c.type.en} · {c.seats} {t("seats")}</div>
                </div>
                <span className="font-display font-bold text-brand-red">৳{c.perKm}/km</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-muted/40 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("th_inside")}</div>
                  <div className="font-semibold">{formatRange(c.inside.min, c.inside.max)}</div>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("th_outside")}</div>
                  <div className="font-semibold">{formatRange(c.outside.min, c.outside.max)}</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{t("fare_variable_note")}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-4">
          <Info className="h-4 w-4 mt-0.5 text-brand-black shrink-0" />
          <p><span className="font-semibold text-brand-black">{t("note")}</span> {t("note_text")}</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
