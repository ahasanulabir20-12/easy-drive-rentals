import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/8801709539837"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3 shadow-card hover:scale-105 hover:shadow-yellow transition-smooth font-semibold"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    <MessageCircle className="h-5 w-5 relative" />
    <span className="hidden sm:inline relative">WhatsApp</span>
  </a>
);

export default WhatsAppButton;
