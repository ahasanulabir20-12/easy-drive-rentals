import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black/95 backdrop-blur supports-[backdrop-filter]:bg-brand-black/80 border-b border-white/5">
      <div className="container flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-brand-yellow grid place-items-center font-display font-bold text-brand-black text-lg group-hover:rotate-6 transition-smooth">
            E
          </div>
          <span className="font-display font-bold text-xl text-white">
            Easy<span className="text-brand-yellow">_</span>Car
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#fleet" className="hover:text-brand-yellow transition-smooth">Fleet</a>
          <a href="#pricing" className="hover:text-brand-yellow transition-smooth">Pricing</a>
          <a href="#services" className="hover:text-brand-yellow transition-smooth">Services</a>
          <a href="#contact" className="hover:text-brand-yellow transition-smooth">Contact</a>
        </nav>

        <a
          href="tel:+8801700000000"
          className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-brand-black px-4 py-2 text-sm font-semibold hover:shadow-yellow hover:scale-105 transition-smooth"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Call Now</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
