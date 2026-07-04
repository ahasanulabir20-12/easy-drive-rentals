import { CalendarDays, Plane, PartyPopper, Ambulance } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const Services = () => {
  const { t } = useLang();
  const services = [
    { icon: CalendarDays, title: t("s_daily"), desc: t("s_daily_d") },
    { icon: Plane, title: t("s_air"), desc: t("s_air_d") },
    { icon: PartyPopper, title: t("s_event"), desc: t("s_event_d") },
    { icon: Ambulance, title: t("s_em"), desc: t("s_em_d") },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">{t("services_kicker")}</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
            {t("services_title")}
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="relative overflow-hidden rounded-2xl bg-brand-black text-white p-7 hover:shadow-yellow hover:-translate-y-1 transition-smooth group animate-scale-in"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-yellow/20 blur-2xl group-hover:bg-brand-yellow/40 transition-smooth" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow text-brand-black grid place-items-center group-hover:rotate-6 group-hover:scale-110 transition-smooth">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl">{s.title}</h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
