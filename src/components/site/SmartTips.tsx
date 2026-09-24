import { CalendarCheck, Car as CarIcon, Fuel, Snowflake, Phone, Camera } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const SmartTips = () => {
  const { t } = useLang();

  const tips = [
    { icon: CalendarCheck, title: t("tip1_t"), desc: t("tip1_d") },
    { icon: CarIcon, title: t("tip2_t"), desc: t("tip2_d") },
    { icon: Fuel, title: t("tip3_t"), desc: t("tip3_d") },
    { icon: Snowflake, title: t("tip4_t"), desc: t("tip4_d") },
    { icon: Phone, title: t("tip5_t"), desc: t("tip5_d") },
    { icon: Camera, title: t("tip6_t"), desc: t("tip6_d") },
  ];

  return (
    <section id="tips" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">{t("tips_kicker")}</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">{t("tips_title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("tips_sub")}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tips.map((tip, i) => (
            <article
              key={tip.title}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group liquid-glass liquid-light rounded-2xl p-6 hover:-translate-y-1 transition-smooth animate-fade-in"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-brand-yellow text-brand-black grid place-items-center group-hover:rotate-6 group-hover:scale-110 transition-smooth shrink-0">
                  <tip.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-brand-red bg-brand-red/10 rounded-full px-2.5 py-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display font-bold text-lg text-brand-black">{tip.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartTips;
