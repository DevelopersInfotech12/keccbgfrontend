import Header from "@/comp/Header";
import CaseStudiesHero from "@/comp/case-studies/CaseStudiesHero";
import CaseStudiesGrid from "@/comp/case-studies/CaseStudiesGrid";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";

export default function CaseStudiesScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />
      <CaseStudiesHero />
      <CaseStudiesGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
