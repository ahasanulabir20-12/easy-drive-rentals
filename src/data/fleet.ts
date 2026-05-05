// Fleet data + which districts each car serves (mock availability)
export type CarKey = "noah" | "hiace" | "axio" | "allion" | "x-corolla" | "g-corolla";

export const fleet: {
  key: CarKey;
  name: string;
  type: { en: string; bn: string };
  seats: number;
  desc: { en: string; bn: string };
  availableIn: string[]; // district names (en)
  fare: string;
  area: { en: string; bn: string };
}[] = [
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
    fare: "7,500 BDT",
    area: { en: "Outside Dhaka Trip", bn: "ঢাকার বাইরে ট্রিপ" },
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
    fare: "9,500 BDT",
    area: { en: "Outside Dhaka Trip", bn: "ঢাকার বাইরে ট্রিপ" },
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
    fare: "3,500 BDT",
    area: { en: "Inside Dhaka Daily", bn: "ঢাকার ভিতরে দৈনিক" },
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
    fare: "4,000 BDT",
    area: { en: "Inside Dhaka Daily", bn: "ঢাকার ভিতরে দৈনিক" },
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
    fare: "3,800 BDT",
    area: { en: "Inside Dhaka Daily", bn: "ঢাকার ভিতরে দৈনিক" },
  },
  {
    key: "g-corolla",
    name: "G Corolla",
    type: { en: "Premium Sedan", bn: "প্রিমিয়াম সেডান" },
    seats: 4,
    desc: {
      en: "Premium Corolla G — refined ride for executive comfort.",
      bn: "প্রিমিয়াম করোলা G — এক্সিকিউটিভ আরামের জন্য।",
    },
    availableIn: ["Dhaka", "Munshiganj", "Narayanganj", "Gazipur", "Chattogram", "Sylhet"],
    fare: "4,500 BDT",
    area: { en: "Inside Dhaka Daily", bn: "ঢাকার ভিতরে দৈনিক" },
  },
];
