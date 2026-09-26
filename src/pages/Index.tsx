import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Pricing from "@/components/site/Pricing";
import Services from "@/components/site/Services";
import Contact from "@/components/site/Contact";
import SmartTips from "@/components/site/SmartTips";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Pricing />
          <Services />
          <SmartTips />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
