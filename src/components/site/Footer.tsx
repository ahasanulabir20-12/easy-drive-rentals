import { Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/easy-car-logo.jpg";
import { useLang } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  const navLinks = [
    { href: "#fleet", label: t("nav_fleet") },
    { href: "#pricing", label: t("nav_pricing") },
    { href: "#services", label: t("nav_services") },
    { href: "#contact", label: t("nav_contact") },
  ];

  return (
    <footer className="bg-brand-black text-white/70 py-10 border-t border-white/5">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Easy_Car" width={36} height={36} className="h-9 w-auto rounded-md bg-white/95 p-1 object-contain" />
            <span className="font-display font-bold text-white">Abir <span className="text-brand-yellow">Rent A Car</span></span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-yellow transition-smooth">{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+8801965155166"
              aria-label={t("call_now")}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 hover:border-brand-yellow/60 hover:text-brand-yellow px-3 py-1.5 text-xs font-semibold transition-smooth"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> +880 1965-155166
            </a>
            <a
              href="https://wa.me/8801709539837"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-brand-yellow/60 hover:text-brand-yellow h-8 w-8 transition-smooth"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-white/5 text-sm">
          <p>© {new Date().getFullYear()} Abir Rent A Car. All rights reserved.</p>
          <p>Munshiganj · Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
