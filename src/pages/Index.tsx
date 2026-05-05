import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Pricing from "@/components/site/Pricing";
import Fleet from "@/components/site/Fleet";
import Services from "@/components/site/Services";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Fleet />
        <Pricing />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
