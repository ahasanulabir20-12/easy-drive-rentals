import { Users, Gauge } from "lucide-react";
import { fleet } from "@/data/fleet";
import CarIcon from "@/components/site/CarIcon";
import { useLang } from "@/context/LanguageContext";

const Fleet = () => {
  const { t, lang } = useLang();
  return (
    <section id="fleet" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 max-w-3xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">{t("fleet_kicker")}</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
              {t("fleet_title")}
            </h2>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((car, i) => (
            <article
              key={car.key}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group animate-fade-in rounded-2xl bg-background border border-border p-6 hover:border-brand-yellow hover:-translate-y-2 transition-smooth shadow-sm hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-brand-black text-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {lang === "bn" ? car.type.bn : car.type.en}
                </span>
                <Gauge className="h-5 w-5 text-muted-foreground group-hover:text-brand-yellow transition-smooth" />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <CarIcon type={car.key} className="h-10 w-12 text-brand-red group-hover:scale-110 group-hover:-translate-y-0.5 transition-smooth" />
                <h3 className="font-display font-bold text-4xl">{car.name}</h3>
              </div>

              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {lang === "bn" ? car.desc.bn : car.desc.en}
              </p>

              <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {car.seats} {t("seats")}</span>
              </div>

              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-black text-white font-semibold py-3 hover:bg-brand-yellow hover:text-brand-black transition-smooth"
              >
                {t("book_now")}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
