import { useState } from "react";
import { Phone, Languages, Menu, X } from "lucide-react";
import logo from "@/assets/easy-car-logo.jpg";
import { useLang } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#fleet", label: t("nav_fleet") },
    { href: "#pricing", label: t("nav_pricing") },
    { href: "#services", label: t("nav_services") },
    { href: "#contact", label: t("nav_contact") },
  ];
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
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-yellow transition-smooth">{link.label}</a>
          ))}
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
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 text-white/90 hover:text-brand-yellow hover:border-brand-yellow/60 h-9 w-9 transition-smooth"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 bg-brand-black/98 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-brand-yellow transition-smooth"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
