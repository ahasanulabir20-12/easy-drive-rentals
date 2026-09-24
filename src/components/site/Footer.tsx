import logo from "@/assets/easy-car-logo.jpg";

const Footer = () => (
  <footer className="bg-brand-black text-white/70 py-10 border-t border-white/5">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Easy_Car" width={36} height={36} className="h-9 w-auto rounded-md bg-white/95 p-1 object-contain" />
        <span className="font-display font-bold text-white">Abir <span className="text-brand-yellow">Rent A Car</span></span>
      </div>
      <p className="text-sm">© {new Date().getFullYear()} Abir Rent A Car. All rights reserved.</p>
      <p className="text-sm">Munshiganj · Bangladesh</p>
    </div>
  </footer>
);

export default Footer;
