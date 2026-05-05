import { useState } from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

const Hero = () => {
  const [outside, setOutside] = useState(false);

  return (
    <section id="home" className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={heroCar} alt="Premium rental car" className="w-full h-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 px-4 py-1.5 text-xs font-semibold text-brand-yellow uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
            Premium Car Rental · Dhaka
          </span>
          <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-balance">
            Your Premium Ride,{" "}
            <span className="text-brand-yellow">Just a Click</span> Away
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl">
            Reliable, comfortable and affordable car rentals across Bangladesh. From CNGs to luxury Hiace — Easy_Car has the perfect ride for every journey.
          </p>
        </div>

        {/* Booking Widget */}
        <div className="mt-12 bg-white text-brand-black rounded-2xl shadow-card p-5 md:p-6 max-w-5xl">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3 className="font-display font-semibold text-lg">Book Your Ride</h3>
            <div className="inline-flex items-center bg-muted rounded-full p-1 text-sm font-medium">
              <button
                onClick={() => setOutside(false)}
                className={`px-4 py-1.5 rounded-full transition-smooth ${!outside ? "bg-brand-black text-white" : "text-muted-foreground"}`}
              >
                Inside Dhaka
              </button>
              <button
                onClick={() => setOutside(true)}
                className={`px-4 py-1.5 rounded-full transition-smooth ${outside ? "bg-brand-yellow text-brand-black" : "text-muted-foreground"}`}
              >
                Outside Dhaka
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Field icon={<MapPin className="h-4 w-4" />} label="From" placeholder="Pickup location" />
            <Field icon={<MapPin className="h-4 w-4" />} label="To" placeholder="Destination" />
            <Field icon={<Calendar className="h-4 w-4" />} label="Date" type="date" />
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow text-brand-black font-semibold px-5 py-3 hover:bg-brand-black hover:text-brand-yellow transition-smooth"
            >
              Search Cars <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  icon, label, placeholder, type = "text",
}: { icon: React.ReactNode; label: string; placeholder?: string; type?: string }) => (
  <label className="block">
    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
    <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 focus-within:border-brand-yellow focus-within:ring-2 focus-within:ring-brand-yellow/20 transition-smooth">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </div>
  </label>
);

export default Hero;
