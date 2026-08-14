import Header from "@/comp/Header";
import ServicesHero from "@/comp/services/ServicesHero";
import ServicesCapabilities from "@/comp/services/ServicesCapabilities";
import ServicesGrid from "@/comp/services/ServicesGrid";
import ServicesLifecycle from "@/comp/services/ServicesLifecycle";
import ServicesUpgrading from "@/comp/services/ServicesUpgrading";
import ServicesSectors from "@/comp/services/ServicesSectors";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";

export default function ServicesScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <ServicesLifecycle />
      <ServicesUpgrading />
      <ServicesCapabilities />
      <ServicesSectors />
      <CTASection />
      <Footer />
    </main>
  );
}
