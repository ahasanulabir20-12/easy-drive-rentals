import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/context/LanguageContext";
import { fleet } from "@/data/fleet";

const PHONES = ["01965155166", "01913156741", "01940142297"];
const WHATSAPP = "01709539837";
const EMAIL = "ahasanulhaqueabir2012@gmail.com";
const ADDRESS_EN = "Rongmehar, Tongibari, Munshiganj";
const ADDRESS_BN = "রংমেহার, টংগিবাড়ী, মুন্সিগঞ্জ";

const Contact = () => {
  const { toast } = useToast();
  const { t, lang } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t("quote_done"), description: t("quote_done_d") });
    (e.target as HTMLFormElement).reset();
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
                      key={p}
                      href={`tel:+88${p}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background hover:border-brand-yellow hover:shadow-card transition-smooth p-3"
                    >
                      <div className="h-10 w-10 rounded-lg bg-brand-yellow text-brand-black grid place-items-center">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-sm">+88 {p}</span>
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
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t("whatsapp")}</div>
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
