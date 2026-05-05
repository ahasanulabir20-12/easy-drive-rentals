import { Info } from "lucide-react";
import { fleet } from "@/data/fleet";
import { useLang } from "@/context/LanguageContext";

const Pricing = () => {
  const { t, lang } = useLang();
  const rows = fleet.map((c) => ({
    vehicle: c.name,
    area: lang === "bn" ? c.area.bn : c.area.en,
    fare: c.fare,
  }));

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
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">{t("th_area")}</th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider text-right">{t("th_fare")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.vehicle} className={`${i % 2 === 0 ? "bg-background" : "bg-muted/40"} hover:bg-brand-yellow/10 transition-smooth`}>
                  <td className="px-6 py-5 font-semibold">{r.vehicle}</td>
                  <td className="px-6 py-5 text-muted-foreground">{r.area}</td>
                  <td className="px-6 py-5 text-right font-display font-bold text-lg">{r.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-10 grid gap-3 md:hidden">
          {rows.map((r) => (
            <div key={r.vehicle} className="rounded-xl border border-border p-4 bg-background shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-lg">{r.vehicle}</span>
                <span className="font-display font-bold text-brand-black">{r.fare}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.area}</p>
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
