import Header from "@/comp/Header";
import Infographics from "@/comp/Infographics";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import OtherHero from "@/comp/OtherHero";

// Content Guide Sec.8 + Sec.10 checklist item 8 — "Add the missing
// Infographics page." Built as its own page (not nested inside Articles)
// per the guide's recommendation for a clean menu structure.
export default function InfographicsScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <OtherHero
        bgImage="/images/kechero.png"
        eyebrow="Infographics"
        title="Understanding India's Bio-CNG Opportunity"
        subtitle="Visual insights into clean energy, waste management and India's evolving CBG ecosystem."
        cta={{ label: "Explore Infographics", href: "/contact" }}
      />
      <div className="pt-[calc(96px+1.5rem)] sm:pt-[calc(104px+2rem)]" />
      <Infographics />
      <CTASection />
      <Footer />
    </main>
  );
}
