import Header from "@/comp/Header";
import WhatisCBG from "@/comp/WhatisCBG";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import OtherHero from "@/comp/OtherHero";
import { Factory } from "lucide-react";

// Content Guide Sec.3 — "What is a CBG Park?" page.
// WhatisCBG.jsx already carries the full required content: the ecosystem
// intro, "The Ecosystem Approach", and all eight ecosystem components
// (Feedstock Collection through Operational Intelligence). Moved here from
// Home per Sec.10 checklist item 3.
export default function CbgParkScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <OtherHero
        bgImage="/images/kechero.png"
        eyebrow="About Us"
        title="Powering India's Bio-CNG Future"
        subtitle="18 plants across 6 states, one mission."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
      <div className="pt-[calc(96px+1.5rem)] sm:pt-[calc(104px+2rem)]" />
      <WhatisCBG />
      <CTASection />
      <Footer />
    </main>
  );
}
