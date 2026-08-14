import Header from "@/comp/Header";
import ProjectsHero from "@/comp/projects/ProjectsHero";
import ProjectsMetrics from "@/comp/projects/ProjectsMetrics";
import ProjectsGrid from "@/comp/projects/ProjectsGrid";
import ProjectsFeatured from "@/comp/projects/ProjectsFeatured";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";

export default function ProjectsScreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />
      <ProjectsHero />
      <ProjectsFeatured />
      <ProjectsGrid />
      <ProjectsMetrics />
      <CTASection />
      <Footer />
    </main>
  );
}
