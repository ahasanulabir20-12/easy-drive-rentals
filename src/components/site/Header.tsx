import { Phone, Languages } from "lucide-react";
import logo from "@/assets/easy-car-logo.jpg";
import { useLang } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLang();
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black/95 backdrop-blur supports-[backdrop-filter]:bg-brand-black/80 border-b border-white/5">
      <div className="container flex h-16 items-center justify-between gap-3">
        <a href="#home" className="flex items-center gap-2 group min-w-0">
          <img
            src={logo}
            alt="Easy_Car logo"
            className="h-10 w-auto rounded-md bg-white/95 p-1 object-contain group-hover:scale-105 transition-smooth"
          />
          <span className="font-display font-bold text-lg sm:text-xl text-white hidden xs:inline sm:inline leading-tight">
            Abir <span className="text-brand-yellow">Rent A Car</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#fleet" className="hover:text-brand-yellow transition-smooth">{t("nav_fleet")}</a>
          <a href="#pricing" className="hover:text-brand-yellow transition-smooth">{t("nav_pricing")}</a>
          <a href="#services" className="hover:text-brand-yellow transition-smooth">{t("nav_services")}</a>
          <a href="#contact" className="hover:text-brand-yellow transition-smooth">{t("nav_contact")}</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 text-white/90 hover:text-brand-yellow hover:border-brand-yellow/60 px-3 py-1.5 text-xs font-semibold transition-smooth"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "বাংলা" : "EN"}
          </button>
          <a
            href="tel:+8801965155166"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-brand-black px-4 py-2 text-sm font-semibold hover:shadow-yellow hover:scale-105 transition-smooth"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{t("call_now")}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
