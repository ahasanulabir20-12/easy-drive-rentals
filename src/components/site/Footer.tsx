const Footer = () => (
  <footer className="bg-brand-black text-white/70 py-10 border-t border-white/5">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-brand-yellow grid place-items-center font-display font-bold text-brand-black">E</div>
        <span className="font-display font-bold text-white">Easy<span className="text-brand-yellow">_</span>Car</span>
      </div>
      <p className="text-sm">© {new Date().getFullYear()} Easy_Car. All rights reserved.</p>
      <p className="text-sm">Dhaka · Bangladesh</p>
    </div>
  </footer>
);

export default Footer;
