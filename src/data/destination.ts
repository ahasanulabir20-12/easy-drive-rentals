/** Destination landmark type for the animated Route Preview illustration. */
export type DestinationType = "airport" | "hospital" | "railway" | "school" | "generic";

/** Detect destination type from the "To" label (English + Bangla keywords).
 *  Order matters: hospital is checked before school because names like
 *  "Dhaka Medical College Hospital" contain both words. */
export const getDestinationType = (label: string): DestinationType => {
  const l = label.toLowerCase();
  if (l.includes("airport") || l.includes("বিমানবন্দর")) return "airport";
  if (
    l.includes("hospital") ||
    l.includes("clinic") ||
    l.includes("medical") ||
    l.includes("হাসপাতাল") ||
    l.includes("ক্লিনিক") ||
    l.includes("মেডিকেল")
  )
    return "hospital";
  if (
    l.includes("railway") ||
    l.includes("rail station") ||
    l.includes("station") ||
    l.includes("রেল") ||
    l.includes("স্টেশন")
  )
    return "railway";
  if (
    l.includes("school") ||
    l.includes("college") ||
    l.includes("university") ||
    l.includes("varsity") ||
    l.includes("institute") ||
    l.includes("academy") ||
    l.includes("madrasa") ||
    l.includes("madrasah") ||
    l.includes("স্কুল") ||
    l.includes("কলেজ") ||
    l.includes("বিশ্ববিদ্যালয়") ||
    l.includes("মাদ্রাসা") ||
    l.includes("একাডেমি") ||
    l.includes("ইনস্টিটিউট")
  )
    return "school";
  return "generic";
};
