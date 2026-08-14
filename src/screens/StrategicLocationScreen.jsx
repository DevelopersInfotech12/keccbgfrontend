import Header from "@/comp/Header";
import WhyStrategicLocationMatters from "@/comp/WhyStrategicLocationMatters";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import OtherHero from "@/comp/OtherHero";

// Content Guide Sec.4 — "Why Strategic Location Matters in Bio-CNG
// Infrastructure" page. WhyStrategicLocationMatters.jsx already carries all
// seven infrastructure factors plus the Uttar Pradesh Defence Corridor
// positioning. Moved here from Home per Sec.10 checklist item 4.
export default function StrategicLocationScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <OtherHero
        bgImage="/images/kechero.png"
        eyebrow="Strategic Location"
        title="Strategically Located for a Stronger Bio-CNG Network"
        subtitle="Building a connected and efficient CBG ecosystem across India."
        cta={{ label: "Explore Locations", href: "/contact" }}
      />
      <div className="pt-[calc(96px+1.5rem)] sm:pt-[calc(104px+2rem)]" />
      <WhyStrategicLocationMatters />
      <CTASection />
      <Footer />
    </main>
  );
}
