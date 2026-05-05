import { Users, Fuel, Gauge } from "lucide-react";

const fleet = [
  { name: "CNG", seats: "3 Seats", type: "Auto-rickshaw", desc: "Quick city errands and short trips at the most affordable rate." },
  { name: "Axio", seats: "4 Seats", type: "Sedan", desc: "Smooth, fuel-efficient sedan for business and city rides." },
  { name: "Allion", seats: "4 Seats", type: "Premium Sedan", desc: "Refined comfort and premium interiors for executive travel." },
  { name: "Noah", seats: "7 Seats", type: "Family MPV", desc: "Spacious people-mover ideal for family outings and trips." },
  { name: "Hiace", seats: "12 Seats", type: "Microbus", desc: "Tour groups, weddings, corporate transfers — handled with ease." },
  { name: "Bus", seats: "30+ Seats", type: "Coach", desc: "Long-distance group travel with comfort and reliability." },
];

const Fleet = () => {
  return (
    <section id="fleet" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 max-w-3xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">Our Fleet</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
              The right ride for every journey.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((car) => (
            <article
              key={car.name}
              className="group rounded-2xl bg-background border border-border p-6 hover:border-brand-yellow hover:-translate-y-1 transition-smooth shadow-sm hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-brand-black text-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {car.type}
                </span>
                <Gauge className="h-5 w-5 text-muted-foreground group-hover:text-brand-yellow transition-smooth" />
              </div>
              <h3 className="mt-5 font-display font-bold text-3xl">{car.name}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{car.desc}</p>

              <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {car.seats}</span>
                <span className="inline-flex items-center gap-1.5"><Fuel className="h-4 w-4" /> Premium</span>
              </div>

              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-black text-white font-semibold py-3 hover:bg-brand-yellow hover:text-brand-black transition-smooth"
              >
                Book Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
