import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "bn";

const dict = {
  en: {
    nav_fleet: "Cars", nav_pricing: "Pricing", nav_services: "Services", nav_contact: "Contact",
    call_now: "Call Now",
    hero_badge: "Premium Car Rental · All Over Bangladesh",
    hero_title_1: "Your Premium Ride,", hero_title_accent: "Just a Click", hero_title_2: " Away",
    hero_sub: "Reliable, comfortable and affordable car rentals across Bangladesh — from Axio to Hiace, Abir Rent A Car has the perfect ride for every journey.",
    book_ride: "Book Your Ride", inside: "Inside Dhaka", outside: "Outside Dhaka",
    from: "From", to: "To", date: "Date", pickup_time: "Pickup Time", search_cars: "Search Cars",
    pickup_ph: "Type area (e.g. Mir)", dest_ph: "Type area (e.g. Uttara)",
    fleet_kicker: "Our Cars", fleet_title: "The right ride for every journey.",
    seats: "Seats", book_now: "Book Now",
    pricing_kicker: "Transparent Pricing", pricing_title: "Estimated Fare Guide",
    pricing_sub: "Clear, upfront pricing for every vehicle. Fares are estimates — final price may vary by location, fuel cost, distance, and time.",
    th_vehicle: "Vehicle Type", th_area: "Service Area", th_fare: "Estimated Base Fare",
    th_inside: "Inside Dhaka (Daily)", th_outside: "Outside Dhaka (Trip)", th_perkm: "Per KM",
    fare_variable_note: "Fares may vary by location, time and fuel price.",
    note: "Note:", note_text: "Estimates only. Actual fare depends on distance, hours, fuel, and route.",
    services_kicker: "What We Offer", services_title: "Service Options Tailored For You",
    s_daily: "Daily Rental", s_daily_d: "Flexible per-day rentals across the city with chauffeur or self-drive options.",
    s_air: "Airport Transfer", s_air_d: "Punctual pickups and drop-offs to and from Hazrat Shahjalal International Airport.",
    s_event: "Event / Wedding", s_event_d: "Decorated cars and microbuses for weddings, ceremonies, and corporate events.",
    s_em: "Emergency / Hospital", s_em_d: "24/7 urgent patient transport to hospitals — fast, safe, and reliable.",
    contact_kicker: "Get In Touch", contact_title: "Contact us & request your quote.",
    contact_sub: "Our team is available 24/7 for bookings, queries, and custom travel plans across Bangladesh.",
    call_us: "Call Us", whatsapp: "WhatsApp", email: "Email", office: "Office",
    request_quote: "Request a Quote", quote_sub: "Tell us about your trip — we'll send a tailored quote.",
    full_name: "Full Name", phone: "Phone", vehicle_needed: "Vehicle Needed",
    message: "Message", msg_ph: "Trip details, dates, destinations…",
    send_request: "Send Request", quote_done: "Quote Requested!", quote_done_d: "Our team will contact you within 30 minutes.",
    available_cars: "Available Cars", no_results: "No cars found for this route. Please contact us.",
    available: "Available", from_label: "From", to_label: "To",
    select_car: "Select Car", choose_car: "Choose your vehicle", trip_estimate: "Trip Estimate",
    distance: "Distance", est_fare: "Estimated Fare", route_preview: "Route Preview",
    pick_route: "Enter From & To to see route, distance and fare estimate.",
    inside_dhaka_daily: "Inside Dhaka — Daily Package",
    book_via_wa: "Book via WhatsApp", call_to_book: "Call to Book",
    est_time: "Est. Time", auto_switched: "Auto-switched based on route",
    our_cars: "Our Cars", our_cars_title: "Pick the class that fits your trip",
    cat_sedan: "Sedan", cat_micro: "Microbus", cat_bus: "Coach / Bus",
    cat_sedan_d: "Comfortable 4-seater for city rides, airport & business travel.",
    cat_micro_d: "Spacious 7–12 seater for families, tours & group transfers.",
    cat_bus_d: "27–45 seater coach for weddings, corporate events & long tours.",
    ac_dual: "Dual AC", ac_single: "Single AC", engine: "Engine", fuel: "Fuel",
    view_drivers: "Driver Preview", our_drivers: "Meet Our Drivers", experience: "yrs exp",
    // Trust stats
    trust_customers: "10,000+ Happy Customers",
    trust_rides: "50,000+ Rides Completed",
    trust_rating: "4.9★ Rating",
    trust_support: "24/7 Support",
    // Smart Car Tips
    tips_kicker: "Smart Car Tips", tips_title: "Rent Smarter, Ride Better",
    tips_sub: "Practical advice to get the best value and a hassle-free trip.",
    tip1_t: "Book Early, Save More", tip1_d: "Reserve your vehicle at least 1–2 days ahead for better rates and guaranteed availability, especially during Eid and holidays.",
    tip2_t: "Match Car to Trip", tip2_d: "Sedan for city & business trips, Microbus for families, Coach for large groups. Picking the right class saves money and ensures comfort.",
    tip3_t: "Confirm Fuel Policy", tip3_d: "Always clarify if the fare includes fuel or if you pay per km. Our per-km rate covers fuel — no hidden charges.",
    tip4_t: "Check AC & Seats", tip4_d: "Bangladesh summers are hot — confirm Dual AC for long trips. Verify seat count matches your group size before booking.",
    tip5_t: "Keep Contacts Handy", tip5_d: "Save our WhatsApp and phone numbers before your trip. For emergencies or route changes, reaching us quickly makes all the difference.",
    tip6_t: "Inspect Before You Go", tip6_d: "Take photos of the vehicle before and after the trip. Note any existing damage to avoid disputes later.",
  },
  bn: {
    nav_fleet: "গাড়ি", nav_pricing: "মূল্য তালিকা", nav_services: "সেবা", nav_contact: "যোগাযোগ",
    call_now: "এখনই কল করুন",
    hero_badge: "প্রিমিয়াম কার রেন্টাল · সারা বাংলাদেশে",
    hero_title_1: "আপনার প্রিমিয়াম রাইড,", hero_title_accent: "এক ক্লিকেই", hero_title_2: " হাজির",
    hero_sub: "সারা বাংলাদেশে নির্ভরযোগ্য, আরামদায়ক ও সাশ্রয়ী কার রেন্টাল — Axio থেকে Hiace পর্যন্ত, আবির রেন্ট এ কার-এ আছে আপনার প্রয়োজনের সব গাড়ি।",
    book_ride: "আপনার রাইড বুক করুন", inside: "ঢাকার ভিতরে", outside: "ঢাকার বাইরে",
    from: "কোথা থেকে", to: "কোথায়", date: "তারিখ", pickup_time: "পিকআপ সময়", search_cars: "গাড়ি খুঁজুন",
    pickup_ph: "এলাকার নাম লিখুন (যেমন মিরপুর)", dest_ph: "এলাকার নাম লিখুন (যেমন উত্তরা)",
    fleet_kicker: "আমাদের গাড়ি", fleet_title: "প্রতিটি যাত্রার জন্য সঠিক গাড়ি।",
    seats: "সিট", book_now: "এখনই বুক করুন",
    pricing_kicker: "স্বচ্ছ মূল্য", pricing_title: "আনুমানিক ভাড়ার তালিকা",
    pricing_sub: "প্রতিটি গাড়ির আনুমানিক ভাড়া। চূড়ান্ত মূল্য স্থান, জ্বালানি, দূরত্ব ও সময় অনুযায়ী পরিবর্তন হতে পারে।",
    th_vehicle: "গাড়ির ধরন", th_area: "সেবার এলাকা", th_fare: "আনুমানিক ভাড়া",
    th_inside: "ঢাকার ভিতরে (দৈনিক)", th_outside: "ঢাকার বাইরে (ট্রিপ)", th_perkm: "প্রতি কিমি",
    fare_variable_note: "স্থান, সময় ও জ্বালানি মূল্য অনুযায়ী ভাড়া পরিবর্তনশীল।",
    note: "বিঃদ্রঃ", note_text: "এটি আনুমানিক ভাড়া। প্রকৃত ভাড়া দূরত্ব, সময়, জ্বালানি ও রুটের উপর নির্ভর করবে।",
    services_kicker: "আমরা যা দিচ্ছি", services_title: "আপনার জন্য বিশেষ সেবা",
    s_daily: "দৈনিক রেন্টাল", s_daily_d: "শহরজুড়ে দৈনিক ভিত্তিতে চালকসহ বা সেলফ-ড্রাইভ রেন্টাল।",
    s_air: "এয়ারপোর্ট ট্রান্সফার", s_air_d: "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে সময়মতো পিকআপ ও ড্রপ।",
    s_event: "ইভেন্ট / বিয়ে", s_event_d: "বিয়ে, অনুষ্ঠান ও কর্পোরেট ইভেন্টের জন্য সাজানো গাড়ি ও মাইক্রোবাস।",
    s_em: "জরুরি / হাসপাতাল", s_em_d: "২৪/৭ জরুরি রোগী হাসপাতালে নেয়ার সেবা — দ্রুত, নিরাপদ ও নির্ভরযোগ্য।",
    contact_kicker: "যোগাযোগ করুন", contact_title: "যোগাযোগ করুন ও কোটেশন নিন।",
    contact_sub: "বুকিং, প্রশ্ন ও কাস্টম ট্রিপ প্ল্যানের জন্য আমাদের টিম ২৪/৭ প্রস্তুত।",
    call_us: "কল করুন", whatsapp: "হোয়াটসঅ্যাপ", email: "ইমেইল", office: "অফিস",
    request_quote: "কোটেশন নিন", quote_sub: "আপনার ট্রিপের বিস্তারিত দিন — আমরা ভাড়া পাঠাবো।",
    full_name: "পুরো নাম", phone: "ফোন", vehicle_needed: "যে গাড়ি লাগবে",
    message: "বার্তা", msg_ph: "ট্রিপের বিস্তারিত, তারিখ, গন্তব্য…",
    send_request: "অনুরোধ পাঠান", quote_done: "কোটেশন রিকোয়েস্ট সফল!", quote_done_d: "আমাদের টিম ৩০ মিনিটের মধ্যে যোগাযোগ করবে।",
    available_cars: "উপলব্ধ গাড়ি", no_results: "এই রুটে কোনো গাড়ি নেই। অনুগ্রহ করে যোগাযোগ করুন।",
    available: "উপলব্ধ", from_label: "থেকে", to_label: "যাচ্ছে",
    select_car: "গাড়ি নির্বাচন", choose_car: "আপনার গাড়ি বাছাই করুন", trip_estimate: "ট্রিপ এস্টিমেট",
    distance: "দূরত্ব", est_fare: "আনুমানিক ভাড়া", route_preview: "রুট প্রিভিউ",
    pick_route: "রুট, দূরত্ব ও আনুমানিক ভাড়া দেখতে কোথা থেকে ও কোথায় লিখুন।",
    inside_dhaka_daily: "ঢাকার ভিতরে — দৈনিক প্যাকেজ",
    book_via_wa: "হোয়াটসঅ্যাপে বুক করুন", call_to_book: "কল করে বুক করুন",
    est_time: "আনুমানিক সময়", auto_switched: "রুট অনুযায়ী স্বয়ংক্রিয় সিলেক্ট",
    our_cars: "আমাদের গাড়ি", our_cars_title: "আপনার ট্রিপের জন্য গাড়ির ক্লাস বেছে নিন",
    cat_sedan: "সেডান", cat_micro: "মাইক্রোবাস", cat_bus: "কোচ / বাস",
    cat_sedan_d: "শহরের যাতায়াত, এয়ারপোর্ট ও বিজনেস ট্রিপের জন্য আরামদায়ক ৪ সিটার।",
    cat_micro_d: "পরিবার, ট্যুর ও গ্রুপের জন্য প্রশস্ত ৭–১২ সিটার।",
    cat_bus_d: "বিয়ে, কর্পোরেট ইভেন্ট ও লম্বা ট্যুরের জন্য ২৭–৪৫ সিটার কোচ।",
    ac_dual: "ডুয়াল এসি", ac_single: "সিঙ্গেল এসি", engine: "ইঞ্জিন", fuel: "জ্বালানি",
    view_drivers: "ড্রাইভার প্রিভিউ", our_drivers: "আমাদের ড্রাইভারদের সাথে পরিচিত হোন", experience: "বছর অভিজ্ঞতা",
    // Trust stats
    trust_customers: "১০,০০০+ সন্তুষ্ট গ্রাহক",
    trust_rides: "৫০,০০০+ সফল যাত্রা",
    trust_rating: "৪.৯★ রেটিং",
    trust_support: "২৪/৭ সাপোর্ট",
    // Smart Car Tips
    tips_kicker: "স্মার্ট কার টিপস", tips_title: "স্মার্টভাবে রেন্ট করুন, ভালোভাবে চড়ুন",
    tips_sub: "সেরা মূল্য ও ঝামেলামুক্ত যাত্রার জন্য ব্যবহারিত পরামর্শ।",
    tip1_t: "আগে বুক করুন, বাঁচুন বেশি", tip1_d: "ভালো ভাড়া ও নিশ্চিত পাওয়ার জন্য ১–২ দিন আগে গাড়ি বুক করুন, বিশেষত ঈদ ও ছুটির দিনে।",
    tip2_t: "ট্রিপ অনুযায়ী গাড়ি বাছুন", tip2_d: "শহর ও বিজনেস ট্রিপে সেডান, পরিবারের জন্য মাইক্রোবাস, বড় গ্রুপের জন্য কোচ। সঠিক ক্লাস বাছলে টাকা ও আরাম দুটোই বাঁচে।",
    tip3_t: "জ্বালানি নীতি নিশ্চিত করুন", tip3_d: "ভাড়ায় জ্বালানি আছে কিনা না প্রতি কিমি চলবে কিনা — আগেই স্পষ্ট করুন। আমাদের প্রতি-কিমি ভাড়ায় জ্বালানি অন্তর্ভুক্ত — কোনো লুকানো চার্জ নেই।",
    tip4_t: "এসি ও সিট যাচাই করুন", tip4_d: "বাংলাদেশের গরমে লম্বা ট্রিপে ডুয়াল এসি নিশ্চিত করুন। বুকিংয়ের আগে সিট সংখ্যা আপনার দলের সাথে মেলে কিনা দেখুন।",
    tip5_t: "যোগাযোগ সংরক্ষণ করুন", tip5_d: "ট্রিপের আগে আমাদের হোয়াটসঅ্যাপ ও ফোন নম্বর সেভ করুন। জরুরি বা রুট পরিবর্তনে দ্রুত যোগাযোগ করা যায়।",
    tip6_t: "যাত্রা শুরুর আগে দেখে নিন", tip6_d: "ট্রিপের আগে ও পরে গাড়ির ছবি তুলুন। আগের কোনো ক্ষতি থাকলে তা লক্ষ্য করুন, পরে বিবাদ এড়ানো যায়।",
  },
};

type Dict = typeof dict.en;
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof Dict) => string };

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: keyof Dict) => dict[lang][k];
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("useLang must be inside LanguageProvider");
  return c;
};
