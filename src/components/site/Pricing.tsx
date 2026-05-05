import { Info } from "lucide-react";

const rows = [
  { vehicle: "CNG", area: "Inside Dhaka Daily", fare: "1,500 BDT" },
  { vehicle: "Axio", area: "Inside Dhaka Daily", fare: "3,500 BDT" },
  { vehicle: "Allion", area: "Inside Dhaka Daily", fare: "4,000 BDT" },
  { vehicle: "Noah", area: "Outside Dhaka Trip", fare: "7,500 BDT" },
  { vehicle: "Hiace", area: "Outside Dhaka Trip", fare: "9,500 BDT" },
  { vehicle: "Bus", area: "Outside Dhaka Trip", fare: "18,000 BDT" },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">Transparent Pricing</span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
            Estimated Fare Guide
          </h2>
          <p className="mt-4 text-muted-foreground">
            Clear, upfront pricing for every vehicle in our fleet. No hidden charges.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden md:block rounded-2xl border border-border overflow-hidden shadow-card">
          <table className="w-full text-left">
            <thead className="bg-brand-black text-white">
              <tr>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">Vehicle Type</th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">Service Area</th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider text-right">Estimated Base Fare</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.vehicle} className={`${i % 2 === 0 ? "bg-background" : "bg-muted/40"} hover:bg-brand-yellow/10 transition-smooth`}>
                  <td className="px-6 py-5 font-semibold">{r.vehicle}</td>
                  <td className="px-6 py-5 text-muted-foreground">{r.area}</td>
                  <td className="px-6 py-5 text-right font-display font-bold text-lg">{r.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-10 grid gap-3 md:hidden">
          {rows.map((r) => (
            <div key={r.vehicle} className="rounded-xl border border-border p-4 bg-background shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-lg">{r.vehicle}</span>
                <span className="font-display font-bold text-brand-black">{r.fare}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.area}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-4">
          <Info className="h-4 w-4 mt-0.5 text-brand-black shrink-0" />
          <p><span className="font-semibold text-brand-black">Note:</span> Fares are variable based on gas/fuel prices and distance.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
