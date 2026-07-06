import { Users } from "lucide-react";
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

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {fleet.map((car, i) => (
            <article
              key={car.key}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group animate-fade-in liquid-glass liquid-light rounded-2xl p-4 hover:-translate-y-1 transition-smooth"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-brand-black text-brand-yellow px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                  {lang === "bn" ? car.type.bn : car.type.en}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <CarIcon type={car.key} className="h-7 w-9 text-brand-red group-hover:scale-110 transition-smooth" />
                <h3 className="font-display font-bold text-xl leading-none">{car.name}</h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {car.seats}</span>
                <span className="font-semibold text-brand-black">৳{car.perKm}/km</span>
              </div>
              <a
                href="#contact"
                className="liquid-glass liquid-dark mt-3 inline-flex w-full items-center justify-center rounded-xl font-semibold py-2 text-xs"
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
