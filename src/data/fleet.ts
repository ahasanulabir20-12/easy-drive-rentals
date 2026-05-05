// Fleet data + which districts each car serves (mock availability)
export type CarKey = "noah" | "hiace" | "axio" | "allion" | "x-corolla" | "g-corolla";

export type Car = {
  key: CarKey;
  name: string;
  type: { en: string; bn: string };
  seats: number;
  desc: { en: string; bn: string };
  availableIn: string[]; // district names (en)
  // Per-km rate (BDT) used for outside-Dhaka long-distance estimate
  perKm: number;
  // Inside Dhaka daily fare range (BDT)
  inside: { min: number; max: number };
  // Outside Dhaka trip fare range (BDT)
  outside: { min: number; max: number };
};

export const fleet: Car[] = [
  {
    key: "noah",
    name: "Noah",
    type: { en: "Family MPV", bn: "ফ্যামিলি এমপিভি" },
    seats: 7,
    desc: {
      en: "Spacious people-mover, ideal for family outings and long trips.",
      bn: "বড় পরিবার ও দীর্ঘ ভ্রমণের জন্য আরামদায়ক ৭-সিটার।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram", "Sylhet", "Cumilla", "Cox's Bazar", "Khulna", "Rajshahi"],
    perKm: 31,
    inside: { min: 3500, max: 4500 },
    outside: { min: 7000, max: 15000 },
  },
  {
    key: "hiace",
    name: "Hiace",
    type: { en: "Microbus", bn: "মাইক্রোবাস" },
    seats: 12,
    desc: {
      en: "Tour groups, weddings, corporate transfers — handled with ease.",
      bn: "ট্যুর গ্রুপ, বিয়ে ও কর্পোরেট ট্রান্সফারের জন্য পারফেক্ট।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram", "Sylhet", "Cumilla", "Cox's Bazar", "Khulna", "Rajshahi", "Barisal", "Mymensingh", "Bogra"],
    perKm: 37.5,
    inside: { min: 4500, max: 6000 },
    outside: { min: 8000, max: 18000 },
  },
  {
    key: "axio",
    name: "Axio",
    type: { en: "Sedan", bn: "সেডান" },
    seats: 4,
    desc: {
      en: "Smooth, fuel-efficient sedan for business and city rides.",
      bn: "ব্যবসা ও শহরের যাতায়াতের জন্য আরামদায়ক সেডান।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram", "Sylhet"],
    perKm: 28,
    inside: { min: 3000, max: 4000 },
    outside: { min: 6000, max: 12000 },
  },
  {
    key: "allion",
    name: "Allion",
    type: { en: "Premium Sedan", bn: "প্রিমিয়াম সেডান" },
    seats: 4,
    desc: {
      en: "Refined comfort and premium interiors for executive travel.",
      bn: "এক্সিকিউটিভ যাত্রার জন্য প্রিমিয়াম ইন্টেরিয়র।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram", "Sylhet", "Cumilla"],
    perKm: 28,
    inside: { min: 3500, max: 4500 },
    outside: { min: 6500, max: 13000 },
  },
  {
    key: "x-corolla",
    name: "X Corolla",
    type: { en: "Sedan", bn: "সেডান" },
    seats: 4,
    desc: {
      en: "Classic Corolla X — reliable, smooth and economical.",
      bn: "ক্লাসিক করোলা X — নির্ভরযোগ্য ও সাশ্রয়ী।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram"],
    perKm: 28,
    inside: { min: 3500, max: 4500 },
    outside: { min: 6500, max: 13000 },
  },
  {
    key: "g-corolla",
    name: "G Corolla",
    type: { en: "Premium Sedan", bn: "প্রিমিয়াম সেডান" },
    seats: 4,
    desc: {
      en: "Premium Corolla G — refined ride for executive comfort.",
      bn: "এক্সিকিউটিভ আরামের জন্য প্রিমিয়াম করোলা G।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram", "Sylhet"],
    perKm: 28,
    inside: { min: 4000, max: 5000 },
    outside: { min: 7000, max: 14000 },
  },
];

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;
export const formatRange = (min: number, max: number) =>
  `${formatBDT(min)} – ${formatBDT(max)}`;
