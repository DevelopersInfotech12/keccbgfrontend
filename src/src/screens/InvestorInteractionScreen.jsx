import Header from "@/comp/Header";
import InvestorInteraction from "@/comp/InvestorInteraction";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import OtherHero from "@/comp/OtherHero";

// Content Guide Sec.6 — "Private One-to-One Investor Interactions" page.
// InvestorInteraction.jsx already carries the full required content: the
// intro, the editable city list (guide Sec.6 "Important implementation" —
// list is a plain array in that file, ready to edit as meetings change),
// the interaction agenda, and the "Reserve an Interaction" CTA. Moved here
// from Home per Sec.10 checklist item 6.
export default function InvestorInteractionScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <OtherHero
        bgImage="/images/kechero.png"
        eyebrow="Investor Interaction"
        title="Building Opportunities for Strategic Investors"
        subtitle="Discover investment opportunities across India's growing Bio-CNG ecosystem."
        cta={{ label: "Connect With Us", href: "/contact"  }}
      />
      <div className="pt-[calc(96px+1.5rem)] sm:pt-[calc(104px+2rem)]" />
      <InvestorInteraction />
      <CTASection />
      <Footer />
    </main>
  );
}
