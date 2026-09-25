import { useEffect, useState } from "react";
import { X, Loader2, MessageCircle, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/context/LanguageContext";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().min(5, "Phone is required").max(30),
});

export type BookingPayload = {
  pickup_location: string;
  destination: string;
  trip_date: string | null;
  pickup_time?: string | null;
  trip_type: "inside" | "outside";
  car_key: string;
  car_name: string;
  distance_km: number | null;
  estimate_min: number | null;
  estimate_max: number | null;
  source?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  payload: BookingPayload;
  /** What to do after a successful save */
  action: "whatsapp" | "call";
  whatsappUrl: string;
  callUrl: string;
};

const BookingModal = ({ open, onClose, payload, action, whatsappUrl, callUrl }: Props) => {
  const { t, lang } = useLang();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, phone });
    if (!parsed.success) {
      toast({ title: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("bookings").insert({
      ...payload,
      customer_name: parsed.data.name,
      customer_phone: parsed.data.phone,
      source: payload.source ?? "hero_widget",
    });
    setSaving(false);
    if (error) {
      toast({ title: lang === "bn" ? "সংরক্ষণ ব্যর্থ" : "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: lang === "bn" ? "বুকিং অনুরোধ পাঠানো হয়েছে!" : "Booking request sent!",
      description: lang === "bn" ? "আমরা শীঘ্রই যোগাযোগ করব।" : "We'll contact you shortly.",
    });
    onClose();
    if (action === "whatsapp") window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    else window.location.href = callUrl;
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" onClick={onClose} role="presentation">
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="w-full max-w-md rounded-2xl bg-white text-brand-black shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="booking-modal-title" className="font-display font-bold text-xl">
            {lang === "bn" ? "আপনার বুকিং নিশ্চিত করুন" : "Confirm your booking"}
          </h3>
          <button onClick={onClose} className="hover-press rounded-full p-1.5 hover:bg-muted text-muted-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl bg-muted/40 p-3 text-sm space-y-1 mb-4">
          <div><span className="text-muted-foreground">{t("from")}: </span><span className="font-semibold">{payload.pickup_location}</span></div>
          <div><span className="text-muted-foreground">{t("to")}: </span><span className="font-semibold">{payload.destination}</span></div>
          <div><span className="text-muted-foreground">{lang === "bn" ? "গাড়ি" : "Car"}: </span><span className="font-semibold">{payload.car_name}</span></div>
          {payload.distance_km != null && (
            <div><span className="text-muted-foreground">{t("distance")}: </span><span className="font-semibold">{payload.distance_km} km</span></div>
          )}
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("full_name")}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
              required
              autoComplete="name"
              placeholder="Md. Karim"
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none hover:border-brand-yellow/50 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("phone")}</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={30}
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              spellCheck={false}
              placeholder="01XXXXXXXXX"
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none hover:border-brand-yellow/50 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-smooth"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`hover-press w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold py-3 transition-smooth ${
              action === "whatsapp"
                ? "bg-[#25D366] text-white hover:opacity-90"
                : "bg-brand-yellow text-brand-black hover:bg-brand-black hover:text-brand-yellow"
            }`}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : action === "whatsapp" ? <MessageCircle className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
            {saving
              ? (lang === "bn" ? "সংরক্ষণ হচ্ছে…" : "Saving…")
              : action === "whatsapp" ? t("book_via_wa") : t("call_to_book")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
