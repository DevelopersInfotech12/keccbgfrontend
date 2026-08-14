import Header from "@/comp/Header";
import AboutHero from "@/comp/about/AboutHero";
import AboutStory from "@/comp/about/AboutStory";
import AboutValues from "@/comp/about/AboutValues";
import AboutMilestones from "@/comp/about/AboutMilestones";
import AboutOperatingModel from "@/comp/about/AboutOperatingModel";
import AboutTeam from "@/comp/about/AboutTeam";
import AboutLocations from "@/comp/about/AboutLocations";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";

export default function AboutScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutMilestones />
      <AboutOperatingModel />
      <AboutTeam />
      <AboutLocations />
      <CTASection />
      <Footer />
    </main>
  );
}
