import Header from "@/comp/Header";
import Industries from "@/comp/Industries";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import OtherHero from "@/comp/OtherHero";

// "KEC Integrated CBG Technology Stack" page.
// Industries.jsx renders the 14 technology cards (FeedSecure through Plant Vision).
// ALL card + modal copy lives in lib/technologyStackData.js (source: TRADEMARK_Web_Pages.docx).
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
