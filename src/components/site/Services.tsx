import { CalendarDays, Plane, PartyPopper } from "lucide-react";

const services = [
  { icon: CalendarDays, title: "Daily Rental", desc: "Flexible per-day rentals across the city with chauffeur or self-drive options." },
  { icon: Plane, title: "Airport Transfer", desc: "Punctual pickups and drop-offs to and from Hazrat Shahjalal International Airport." },
  { icon: PartyPopper, title: "Event / Wedding", desc: "Decorated cars and microbuses for weddings, ceremonies, and corporate events." },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">What We Offer</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
            Service Options Tailored For You
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-2xl bg-brand-black text-white p-8 hover:shadow-yellow transition-smooth group"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-yellow/20 blur-2xl group-hover:bg-brand-yellow/40 transition-smooth" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow text-brand-black grid place-items-center">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display font-bold text-2xl">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
