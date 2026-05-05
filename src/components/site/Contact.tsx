import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/context/LanguageContext";
import { fleet } from "@/data/fleet";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  car: z.string().min(1).max(60),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const PHONES: { num: string; name: string }[] = [
  { num: "01965155166", name: "Tanmoy Mahmud" },
  { num: "01913156741", name: "Ahasanul Haque" },
  { num: "01940142297", name: "Aminul Haque" },
];
const WHATSAPP_NAME = "Aminul Haque";
const WHATSAPP = "01709539837";
const EMAIL = "ahasanulhaqueabir2012@gmail.com";
const ADDRESS_EN = "Rongmehar, Tongibari, Munshiganj";
const ADDRESS_BN = "রংমেহার, টংগিবাড়ী, মুন্সিগঞ্জ";

const Contact = () => {
  const { toast } = useToast();
  const { t, lang } = useLang();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const parsed = quoteSchema.safeParse({
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      car: String(fd.get("car") || fleet[0].name),
      message: String(fd.get("message") || ""),
    });
    if (!parsed.success) {
      toast({ title: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    const data = parsed.data;
    const carObj = fleet.find((c) => c.name === data.car) ?? fleet[0];
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      pickup_location: "-",
      destination: "-",
      trip_type: "inside",
      car_key: carObj.key,
      car_name: carObj.name,
      customer_name: data.name,
      customer_phone: data.phone,
      customer_email: data.email || null,
      message: data.message || null,
      source: "contact_form",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: lang === "bn" ? "পাঠানো যায়নি" : "Could not send", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t("quote_done"), description: t("quote_done_d") });
    form.reset();
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">{t("contact_kicker")}</span>
            <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-balance">
              {t("contact_title")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">{t("contact_sub")}</p>

            <div className="mt-8 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">{t("call_us")}</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {PHONES.map((p) => (
                    <a
                      key={p.num}
                      href={`tel:+88${p.num}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background hover:border-brand-yellow hover:shadow-card transition-smooth p-3"
                    >
                      <div className="h-10 w-10 rounded-lg bg-brand-yellow text-brand-black grid place-items-center shrink-0">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">+88 {p.num}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/88${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-background hover:border-[#25D366] hover:shadow-card transition-smooth p-3"
              >
                <div className="h-12 w-12 rounded-xl bg-[#25D366] text-white grid place-items-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t("whatsapp")} · {WHATSAPP_NAME}</div>
                  <div className="font-semibold">+88 {WHATSAPP}</div>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-background hover:border-brand-yellow hover:shadow-card transition-smooth p-3"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-yellow text-brand-black grid place-items-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t("email")}</div>
                  <div className="font-semibold truncate">{EMAIL}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-3">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow text-brand-black grid place-items-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t("office")}</div>
                  <div className="font-semibold">{lang === "bn" ? ADDRESS_BN : ADDRESS_EN}</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-background border border-border p-6 md:p-8 shadow-card">
            <h3 className="font-display font-bold text-2xl">{t("request_quote")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("quote_sub")}</p>

            <div className="mt-6 space-y-4">
              <Input label={t("full_name")} placeholder="Md. Karim" required maxLength={100} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label={t("phone")} type="tel" placeholder="+880..." required maxLength={20} />
                <Input label={t("email")} type="email" placeholder="you@example.com" maxLength={120} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("vehicle_needed")}</label>
                <select className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth">
                  {fleet.map((c) => (
                    <option key={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("message")}</label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder={t("msg_ph")}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow text-brand-black font-semibold py-3.5 hover:bg-brand-black hover:text-brand-yellow transition-smooth"
              >
                {t("send_request")} <Send className="h-4 w-4" />
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

export default Contact;
