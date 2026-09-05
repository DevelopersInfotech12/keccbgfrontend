import Header from "@/comp/Header";
import KecHero from "@/comp/kec/KecHero";
import KecStory from "@/comp/kec/KecStory";
import KecStats from "@/comp/kec/KecStats";
import KecEcosystem from "@/comp/kec/KecEcosystem";
import KecProcess from "@/comp/kec/KecProcess";
import KecLeadership from "@/comp/kec/KecLeadership";
import KecSynergy from "@/comp/kec/KecSynergy";
import KecCTA from "@/comp/kec/KecCTA";
import Footer from "@/comp/Footer";
import CTASection from "@/comp/CTASection";

export default function KecScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />
      <KecHero />
      <KecStory />
      <KecStats />
      <KecEcosystem />
      <KecLeadership />
      <KecProcess />
      <KecSynergy />
      <CTASection />
      <Footer />
    </main>
  );
}
