import Header from "@/comp/Header";
import ContactHero from "@/comp/contact/ContactHero";
import ContactBody from "@/comp/contact/ContactBody";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import Faq from "@/comp/contact/FAQS";

export default function ContactScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />
      <ContactHero />
      <ContactBody />
      <Faq />
      {/* Site-wide final CTA (guide Sec.9) */}
      <CTASection />
      <Footer />
    </main>
  );
}
