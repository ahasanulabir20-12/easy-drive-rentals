// 64 districts of Bangladesh (English + Bangla + approx coordinates)
export type District = { en: string; bn: string; lat: number; lng: number };

export const districts: District[] = [
  { en: "Bagerhat", bn: "বাগেরহাট", lat: 22.6512, lng: 89.7857 },
  { en: "Bandarban", bn: "বান্দরবান", lat: 22.1953, lng: 92.2184 },
  { en: "Barguna", bn: "বরগুনা", lat: 22.0953, lng: 90.1121 },
  { en: "Barisal", bn: "বরিশাল", lat: 22.7010, lng: 90.3535 },
  { en: "Bhola", bn: "ভোলা", lat: 22.6859, lng: 90.6482 },
  { en: "Bogra", bn: "বগুড়া", lat: 24.8465, lng: 89.3776 },
  { en: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া", lat: 23.9571, lng: 91.1115 },
  { en: "Chandpur", bn: "চাঁদপুর", lat: 23.2333, lng: 90.6712 },
  { en: "Chapainawabganj", bn: "চাঁপাইনবাবগঞ্জ", lat: 24.5965, lng: 88.2775 },
  { en: "Chattogram", bn: "চট্টগ্রাম", lat: 22.3569, lng: 91.7832 },
  { en: "Chuadanga", bn: "চুয়াডাঙ্গা", lat: 23.6401, lng: 88.8418 },
  { en: "Cox's Bazar", bn: "কক্সবাজার", lat: 21.4272, lng: 92.0058 },
  { en: "Cumilla", bn: "কুমিল্লা", lat: 23.4607, lng: 91.1809 },
  { en: "Dhaka", bn: "ঢাকা", lat: 23.8103, lng: 90.4125 },
  { en: "Dinajpur", bn: "দিনাজপুর", lat: 25.6217, lng: 88.6354 },
  { en: "Faridpur", bn: "ফরিদপুর", lat: 23.6070, lng: 89.8429 },
  { en: "Feni", bn: "ফেনী", lat: 23.0159, lng: 91.3976 },
  { en: "Gaibandha", bn: "গাইবান্ধা", lat: 25.3287, lng: 89.5281 },
  { en: "Gazipur", bn: "গাজীপুর", lat: 24.0023, lng: 90.4264 },
  { en: "Gopalganj", bn: "গোপালগঞ্জ", lat: 23.0050, lng: 89.8266 },
  { en: "Habiganj", bn: "হবিগঞ্জ", lat: 24.3745, lng: 91.4155 },
  { en: "Jamalpur", bn: "জামালপুর", lat: 24.9375, lng: 89.9372 },
  { en: "Jessore", bn: "যশোর", lat: 23.1685, lng: 89.2072 },
  { en: "Jhalokati", bn: "ঝালকাঠি", lat: 22.6406, lng: 90.1987 },
  { en: "Jhenaidah", bn: "ঝিনাইদহ", lat: 23.5448, lng: 89.1539 },
  { en: "Joypurhat", bn: "জয়পুরহাট", lat: 25.0968, lng: 89.0227 },
  { en: "Khagrachari", bn: "খাগড়াছড়ি", lat: 23.1193, lng: 91.9847 },
  { en: "Khulna", bn: "খুলনা", lat: 22.8456, lng: 89.5403 },
  { en: "Kishoreganj", bn: "কিশোরগঞ্জ", lat: 24.4449, lng: 90.7766 },
  { en: "Kurigram", bn: "কুড়িগ্রাম", lat: 25.8072, lng: 89.6294 },
  { en: "Kushtia", bn: "কুষ্টিয়া", lat: 23.9013, lng: 89.1206 },
  { en: "Lakshmipur", bn: "লক্ষ্মীপুর", lat: 22.9447, lng: 90.8282 },
  { en: "Lalmonirhat", bn: "লালমনিরহাট", lat: 25.9923, lng: 89.2847 },
  { en: "Madaripur", bn: "মাদারীপুর", lat: 23.1641, lng: 90.1897 },
  { en: "Magura", bn: "মাগুরা", lat: 23.4870, lng: 89.4198 },
  { en: "Manikganj", bn: "মানিকগঞ্জ", lat: 23.8617, lng: 90.0003 },
  { en: "Meherpur", bn: "মেহেরপুর", lat: 23.7622, lng: 88.6318 },
  { en: "Moulvibazar", bn: "মৌলভীবাজার", lat: 24.4829, lng: 91.7774 },
  { en: "Munshiganj", bn: "মুন্সিগঞ্জ", lat: 23.5422, lng: 90.5305 },
  { en: "Mymensingh", bn: "ময়মনসিংহ", lat: 24.7471, lng: 90.4203 },
  { en: "Naogaon", bn: "নওগাঁ", lat: 24.7936, lng: 88.9318 },
  { en: "Narail", bn: "নড়াইল", lat: 23.1725, lng: 89.4929 },
  { en: "Narayanganj", bn: "নারায়ণগঞ্জ", lat: 23.6238, lng: 90.5000 },
  { en: "Narsingdi", bn: "নরসিংদী", lat: 23.9322, lng: 90.7150 },
  { en: "Natore", bn: "নাটোর", lat: 24.4206, lng: 89.0003 },
  { en: "Netrokona", bn: "নেত্রকোণা", lat: 24.8807, lng: 90.7298 },
  { en: "Nilphamari", bn: "নীলফামারী", lat: 25.9314, lng: 88.8560 },
  { en: "Noakhali", bn: "নোয়াখালী", lat: 22.8696, lng: 91.0995 },
  { en: "Pabna", bn: "পাবনা", lat: 24.0064, lng: 89.2372 },
  { en: "Panchagarh", bn: "পঞ্চগড়", lat: 26.3411, lng: 88.5541 },
  { en: "Patuakhali", bn: "পটুয়াখালী", lat: 22.3596, lng: 90.3296 },
  { en: "Pirojpur", bn: "পিরোজপুর", lat: 22.5790, lng: 89.9759 },
  { en: "Rajbari", bn: "রাজবাড়ী", lat: 23.7574, lng: 89.6444 },
  { en: "Rajshahi", bn: "রাজশাহী", lat: 24.3745, lng: 88.6042 },
  { en: "Rangamati", bn: "রাঙ্গামাটি", lat: 22.6533, lng: 92.1751 },
  { en: "Rangpur", bn: "রংপুর", lat: 25.7439, lng: 89.2752 },
  { en: "Satkhira", bn: "সাতক্ষীরা", lat: 22.7085, lng: 89.0707 },
  { en: "Shariatpur", bn: "শরীয়তপুর", lat: 23.2423, lng: 90.4348 },
  { en: "Sherpur", bn: "শেরপুর", lat: 25.0204, lng: 90.0152 },
  { en: "Sirajganj", bn: "সিরাজগঞ্জ", lat: 24.4533, lng: 89.7006 },
  { en: "Sunamganj", bn: "সুনামগঞ্জ", lat: 25.0658, lng: 91.3950 },
  { en: "Sylhet", bn: "সিলেট", lat: 24.8949, lng: 91.8687 },
  { en: "Tangail", bn: "টাঙ্গাইল", lat: 24.2513, lng: 89.9167 },
  { en: "Thakurgaon", bn: "ঠাকুরগাঁও", lat: 26.0336, lng: 88.4616 },

  // Munshiganj — villages & unions
  { en: "Panchasar", bn: "পঞ্চসার", lat: 23.5450, lng: 90.5250 },
  { en: "Rampal", bn: "রামপাল", lat: 23.5550, lng: 90.5100 },
  { en: "Bajrayogini", bn: "বজ্রযোগিনী", lat: 23.5100, lng: 90.4700 },
  { en: "Mahakali", bn: "মহাকালী", lat: 23.5600, lng: 90.5400 },
  { en: "Dhipur", bn: "ধীপুর", lat: 23.5150, lng: 90.4650 },
  { en: "Charkewar", bn: "চরকেওয়ার", lat: 23.5700, lng: 90.5150 },
  { en: "Mollakandi", bn: "মোল্লাকান্দি", lat: 23.5350, lng: 90.5300 },
  { en: "Silai", bn: "শিলই", lat: 23.5250, lng: 90.4600 },
  { en: "Adhara", bn: "আধারা", lat: 23.5300, lng: 90.4800 },
  { en: "Autshahi", bn: "আউটশাহী", lat: 23.5000, lng: 90.4700 },
  { en: "Ariol Baligaon", bn: "আড়িয়ল বালিগাঁও", lat: 23.5050, lng: 90.4550 },
  { en: "Kamarkhara", bn: "কামারখাড়া", lat: 23.5150, lng: 90.4750 },
  { en: "Kathadia Shimulia", bn: "কাঠাদিয়া শিমুলিয়া", lat: 23.5100, lng: 90.4600 },
  { en: "Dighirpar", bn: "দিঘীরপাড়", lat: 23.4900, lng: 90.4700 },
  { en: "Panchgaon", bn: "পঞ্চগাঁও", lat: 23.5000, lng: 90.4650 },
  { en: "Betka", bn: "বেতকা", lat: 23.5250, lng: 90.4700 },
  { en: "Joslong", bn: "যশলং", lat: 23.5150, lng: 90.4550 },
  { en: "Sonarang Tongibari", bn: "সোনারং টংগিবাড়ী", lat: 23.5050, lng: 90.4600 },
  { en: "Hasail Banari", bn: "হাসাইল বানারী", lat: 23.4950, lng: 90.4750 },
  { en: "Abdullahpur", bn: "আব্দুল্লাহপুর", lat: 23.5100, lng: 90.4500 },

  // Sreenagar upazila
  { en: "Chitrakot", bn: "চিত্রকোট", lat: 23.4750, lng: 90.3550 },
  { en: "Shekharnagar", bn: "শেখরনগর", lat: 23.4850, lng: 90.3650 },
  { en: "Rajanagar", bn: "রাজানগর", lat: 23.4800, lng: 90.3500 },
  { en: "Keyain", bn: "কেয়াইন", lat: 23.5300, lng: 90.4000 },
  { en: "Basail", bn: "বাসাইল", lat: 23.4850, lng: 90.3400 },
  { en: "Latabdi", bn: "লতাব্দী", lat: 23.5250, lng: 90.4100 },
  { en: "Baluchar", bn: "বালুচর", lat: 23.5300, lng: 90.4050 },

  // Sirajdikhan upazila
  { en: "Boyragadi", bn: "বয়রাগাদী", lat: 23.5450, lng: 90.4100 },
  { en: "Malkhanagar", bn: "মালখানগর", lat: 23.5550, lng: 90.4150 },
  { en: "Jainsar", bn: "জৈনসার", lat: 23.5500, lng: 90.4200 },
  { en: "Madhyapara", bn: "মধ্যপাড়া", lat: 23.5400, lng: 90.4250 },
  { en: "Ichhapura", bn: "ইছাপুরা", lat: 23.5350, lng: 90.4300 },
  { en: "Rashunia", bn: "রশুনিয়া", lat: 23.5600, lng: 90.4200 },
  { en: "Kola", bn: "কোলা", lat: 23.5500, lng: 90.4050 },
  { en: "Medenimandal", bn: "মেদেনীমন্ডল", lat: 23.5450, lng: 90.4250 },
  { en: "Khidirpara", bn: "খিদিরপাড়া", lat: 23.5400, lng: 90.4150 },
  { en: "Boultali", bn: "বউলতলী", lat: 23.5300, lng: 90.4200 },
  { en: "Kalma", bn: "কলমা", lat: 23.5350, lng: 90.4100 },

  // Louhajang upazila
  { en: "Gaodia", bn: "গাওদিয়া", lat: 23.4250, lng: 90.3550 },
  { en: "Bejgaon", bn: "বেজগাঁও", lat: 23.4300, lng: 90.3600 },
  { en: "Kanaksar", bn: "কনকসার", lat: 23.4350, lng: 90.3650 },
  { en: "Louhajang-Teutia", bn: "লৌহজং তেউটিয়া", lat: 23.4200, lng: 90.3500 },
  { en: "Kumarbhog", bn: "কুমারভোগ", lat: 23.4150, lng: 90.3600 },
  { en: "Shimulia", bn: "শিমুলিয়া", lat: 23.4100, lng: 90.3550 },
  { en: "Atpara", bn: "আটপাড়া", lat: 23.4400, lng: 90.3450 },
  { en: "Kukutia", bn: "কুকুটিয়া", lat: 23.4500, lng: 90.3500 },
  { en: "Kolapara", bn: "কলাপাড়া", lat: 23.4550, lng: 90.3550 },
  { en: "Tantar", bn: "তেঁতুলতলা", lat: 23.4600, lng: 90.3600 },

  // Sreenagar area (more)
  { en: "Bhagyakul", bn: "ভাগ্যকুল", lat: 23.4700, lng: 90.3350 },
  { en: "Baghra", bn: "বাঘড়া", lat: 23.4650, lng: 90.3450 },
  { en: "Baraikhali", bn: "বাড়ৈখালী", lat: 23.4750, lng: 90.3400 },
  { en: "Birtara", bn: "বীরতারা", lat: 23.4800, lng: 90.3450 },
  { en: "Sholaghar", bn: "শোলাঘর", lat: 23.4850, lng: 90.3500 },
  { en: "Shyamsiddhi", bn: "শ্যামসিদ্ধি", lat: 23.4900, lng: 90.3550 },
  { en: "Srinagar", bn: "শ্রীনগর", lat: 23.4790, lng: 90.3300 },
  { en: "Hasara", bn: "হাসারা", lat: 23.4700, lng: 90.3250 },
  { en: "Rarikhall", bn: "রাঢ়ীখাল", lat: 23.4650, lng: 90.3300 },
  { en: "Patabhog", bn: "পাটাভোগ", lat: 23.4750, lng: 90.3200 },

  // Gazaria upazila
  { en: "Hosendi", bn: "হোসেন্দী", lat: 23.5100, lng: 90.6000 },
  { en: "Baluakandi", bn: "বালুয়াকান্দি", lat: 23.5050, lng: 90.6100 },
  { en: "Tengarchar", bn: "তেঁগারচর", lat: 23.5150, lng: 90.6150 },
  { en: "Muktarpur", bn: "মুক্তারপুর", lat: 23.5750, lng: 90.5250 },
  { en: "Gazaria", bn: "গজারিয়া", lat: 23.5150, lng: 90.6050 },
  { en: "Guagachhia", bn: "গুয়াগাছিয়া", lat: 23.5100, lng: 90.6200 },
  { en: "Imampur", bn: "ইমামপুর", lat: 23.5200, lng: 90.6100 },
  { en: "Bhabarchar", bn: "ভবের চর", lat: 23.5250, lng: 90.6250 },
];

// Haversine distance in km
export const distanceKm = (a: District, b: District) => {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  // Apply 1.25x road factor (roads are not straight lines)
  return Math.round(R * 2 * Math.asin(Math.sqrt(x)) * 1.25);
};
