import Header from "@/comp/Header";
import Hero from "@/comp/Hero";
import HomeMain from "@/comp/HomeMain";
import Process from "@/comp/Process";
import GalleryGlimpse from "@/comp/GalleryGlimpse";
import BlogPreview from "@/comp/BlogPreview";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import Faq from "@/comp/contact/FAQS";

// -- Content Guide Sec.2 "Sections currently on Home that should move to
// their own pages" -- these now live on their dedicated pages instead.
// Kept imported-but-unused would break the build, so left commented below
// alongside the components that stay on disk untouched:
// import CBGParkHero from "@/comp/CBGParkHero";       -> moved (see /cbg-park; also a
//                                                         literal duplicate of the Hero
//                                                         copy above — confirm with client
//                                                         before reviving anywhere)
// import WhatisCBG from "@/comp/WhatisCBG";            -> moved to /cbg-park
// import WhyStrategicLocationMatters from "@/comp/WhyStrategicLocationMatters"; -> moved to /strategic-location
// import Industries from "@/comp/Industries";          -> moved to /technology-process
// import InvestorInteraction from "@/comp/InvestorInteraction"; -> moved to /investor-interaction

// -- Content Guide Sec.2 "Extra/current sections to remove or confirm with
// client" -- statistics/metrics, client/partner names, trust logos, and
// project/case-study claims not present in the 7 supplied client documents.
// Comment out (not delete) until client confirms:
// import LogoMarquee from "@/comp/LogoMarquee";                       -> partner/trust logos
// import WhyUs from "@/comp/WhyUs";                                   -> "15 years" claim, unsupported
// import Products from "@/comp/Products";                             -> energy/carbon output stats
// import MyProjects from "@/comp/MyProjects";                         -> project claims
// import StateProject from "@/comp/StateProject";                     -> named project claims
// import CaseStudy from "@/comp/CaseStudy";                           -> case-study stats/claims
// import AnimatedTestimonialsDemo from "@/comp/AnimatedTestimonialsDemo"; -> client testimonials/names

export default function Homescreen() {
  return (
    <main className="min-h-screen bg-mist-50">
      <Header />

      {/* Hero + "Building India's Next Clean Energy Ecosystem" main section
          (guide Sec.2) with Explore/Book CTAs already inside Hero.jsx */}
      <Hero />
      <HomeMain />

      {/* <LogoMarquee /> */}
      {/* <CBGParkHero /> */}
      {/* <WhatisCBG /> */}
      {/* <WhyStrategicLocationMatters /> */}
      {/* <WhyUs /> */}

      {/* "What Makes a KEC CBG Park Different?" — 4 required blocks (guide Sec.2) */}
      <Process />

      {/* <Products /> */}
      {/* <MyProjects /> */}
      {/* <Industries /> */}
      {/* <InvestorInteraction /> */}
      {/* <StateProject /> */}

      <GalleryGlimpse />

      {/* <CaseStudy /> */}

      {/* Light teaser linking to /blog (Insights & Articles) — intro/nav
          content, not a full duplicate of the page, so left in place */}
      <BlogPreview />

      {/* <AnimatedTestimonialsDemo /> */}

      <Faq />

      {/* Site-wide final CTA (guide Sec.9) */}
      <CTASection />
      <Footer />
    </main>
  );
}
