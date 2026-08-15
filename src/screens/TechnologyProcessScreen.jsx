import Header from "@/comp/Header";
import Industries from "@/comp/Industries";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import OtherHero from "@/comp/OtherHero";

// Content Guide Sec.5 — "KEC Integrated CBG Technology Stack" page.
// Industries.jsx (name kept as-is to avoid an unnecessary rename/diff — it
// already renders all 14 required technology cards: FeedSecure through
// BioFlow IQ, under the exact "KEC Integrated CBG Technology Stack" heading)
// moved here from Home per Sec.10 checklist item 5.
//
// Guide Sec.5 client clarification: GasBalance™ appears in the SEO keyword
// list but isn't described in the source Technology Stack document. Do NOT
// invent a card/description for it here — ask the client first (Sec.10
// checklist item 13). Industries.jsx intentionally has no GasBalance entry.
export default function TechnologyProcessScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <OtherHero
        bgImage="/images/kechero.png"
        eyebrow="Technology & Process"
        title="Advanced Technology Powering Clean Energy"
        subtitle="Efficient, scalable and sustainable processes for next-generation Bio-CNG production."
        cta={{ label: "Explore Technology", href: "/contact" }}
      />
      {/* <div className="pt-[calc(96px+1.5rem)] sm:pt-[calc(104px+2rem)]" /> */}
      <Industries />
      <CTASection />
      <Footer />
    </main>
  );
}
