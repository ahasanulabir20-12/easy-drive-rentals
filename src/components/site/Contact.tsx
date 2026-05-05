import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Quote Requested!", description: "Our team will contact you within 30 minutes." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">Get In Touch</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
              Contact us & request your quote.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Our team is available 24/7 for bookings, queries, and custom travel plans across Bangladesh.
            </p>

            <div className="mt-8 space-y-4">
              <ContactItem icon={Phone} label="Call Us" value="+880 1700-000 000" href="tel:+8801700000000" />
              <ContactItem icon={Mail} label="Email" value="hello@easycar.bd" href="mailto:hello@easycar.bd" />
              <ContactItem icon={MapPin} label="Office" value="Gulshan-1, Dhaka, Bangladesh" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-background border border-border p-6 md:p-8 shadow-card">
            <h3 className="font-display font-bold text-2xl">Request a Quote</h3>
            <p className="text-sm text-muted-foreground mt-1">Tell us about your trip — we'll send a tailored quote.</p>

            <div className="mt-6 space-y-4">
              <Input label="Full Name" placeholder="John Doe" required />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Phone" type="tel" placeholder="+880..." required />
                <Input label="Email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vehicle Needed</label>
                <select className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth">
                  <option>CNG</option><option>Axio</option><option>Allion</option>
                  <option>Noah</option><option>Hiace</option><option>Bus</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  rows={4}
                  placeholder="Trip details, dates, destinations..."
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow text-brand-black font-semibold py-3.5 hover:bg-brand-black hover:text-brand-yellow transition-smooth"
              >
                Send Request <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
    <input
      {...props}
      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth"
    />
  </div>
);

const ContactItem = ({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) => {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="h-12 w-12 rounded-xl bg-brand-yellow text-brand-black grid place-items-center group-hover:scale-110 transition-smooth">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : content;
};

export default Contact;
