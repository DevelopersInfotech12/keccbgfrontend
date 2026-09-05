import Header from "@/comp/Header";
import HomeHeronew from "@/comp/HomeHeronew";
import HomeMainNew from "@/comp/HomeMainNew";
import HomeMain from "@/comp/HomeMain";
import LogoMarquee from "@/comp/LogoMarquee";
import ProcessNew from "@/comp/ProcessNew";
import WhyUs from "@/comp/WhyUs";
import Products from "@/comp/Products";
import GalleryGlimpse from "@/comp/GalleryGlimpse";
import BlogPreview from "@/comp/BlogPreview";
import Faq from "@/comp/contact/FAQS";
import CTASection from "@/comp/CTASection";
import Footer from "@/comp/Footer";
import Hero from "@/comp/Hero";
import Process from "@/comp/Process";

// Forked from Homescreen.jsx for /HomeNewUI — same base sections, plus
// LogoMarquee, WhyUs, and Products added back in. Edit this file freely;
// it will NOT affect / or /home.

export default function HomescreenNewUI() {
    return (
        <main className="min-h-screen bg-mist-50">
            <Header />

            <Hero />
            {/* <HomeHeronew /> */}
            {/* <HomeMainNew /> */}
            <HomeMain/>
            {/* <LogoMarquee /> */}

            {/* <Process /> */}
            <ProcessNew />

            {/* <WhyUs /> */}
            {/* <Products /> */}

            <GalleryGlimpse />
            <BlogPreview />
            <Faq />
            <CTASection />
            <Footer />
        </main>
    );
}