"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./motion/Reveal";
import SectionHeading from "@/comp/ui/SectionHeading";

const col1Images = [
    { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", alt: "Wind turbines renewable energy" },
    { src: "https://images.unsplash.com/photo-1637345158353-40607a208d46?w=600&q=80", alt: "Industrial gas pipes" },
    { src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80", alt: "Solar panel field aerial" },
    { src: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=600&q=80", alt: "Renewable energy landscape" },
    { src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80", alt: "Wind turbine at sunset" },
    { src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80", alt: "Solar panels" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", alt: "Wind turbine field" },
    { src: "https://images.unsplash.com/photo-1680355065203-43ad84bb6e69?w=600&q=80", alt: "Solar panel array" },
];

const col2Images = [
    { src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80", alt: "Wind turbines field" },
    { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", alt: "Green energy field" },
    { src: "https://images.unsplash.com/photo-1772376920846-8925e03c3fcf?w=600&q=80", alt: "Industrial storage tanks" },
    { src: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80", alt: "Biogas plant tanks" },
    { src: "https://images.unsplash.com/photo-1678984240126-70bcddd7a228?w=600&q=80", alt: "Industrial pipeline" },
    { src: "https://images.unsplash.com/photo-1748002757537-00ab5114135b?w=600&q=80", alt: "Engineer inspecting plant" },
    { src: "https://images.unsplash.com/photo-1578776349090-de61da00ff1a?w=600&q=80", alt: "Industrial plant exterior" },
    { src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80", alt: "Renewable gas facility" },
];

const col3Images = [
    { src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80", alt: "Solar farm rows" },
    { src: "https://images.unsplash.com/photo-1656988826404-bbb5ccb779bc?w=600&q=80", alt: "Biogas tanker truck" },
    { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", alt: "Industrial control room" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", alt: "Green power plant" },
    { src: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80", alt: "Wind turbine close up" },
    { src: "https://images.unsplash.com/photo-1690973692388-239878450c7b?w=600&q=80", alt: "Steel pipeline valves" },
    { src: "https://images.unsplash.com/photo-1780882899461-0b158f457b44?w=600&q=80", alt: "Industrial gas storage" },
    { src: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80", alt: "Pipeline infrastructure" },
];

const col4Images = [
    { src: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80", alt: "Pipeline infrastructure" },
    { src: "https://images.unsplash.com/photo-1690973692388-239878450c7b?w=600&q=80", alt: "Steel pipeline valves" },
    { src: "https://images.unsplash.com/photo-1656988826404-bbb5ccb779bc?w=600&q=80", alt: "Biogas tanker truck" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", alt: "Green power plant" },
    { src: "https://images.unsplash.com/photo-1678984240126-70bcddd7a228?w=600&q=80", alt: "Industrial pipeline" },
    { src: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80", alt: "Biogas plant tanks" },
    { src: "https://images.unsplash.com/photo-1627052428109-576e839d100a?w=600&q=80", alt: "Industrial plant exterior" },
    { src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80", alt: "Wind turbines field" },
];

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

const track1 = [...col1Images, ...col1Images];
const track2 = [...col2Images, ...col2Images];
const track3 = [...col3Images, ...col3Images];
const track4 = [...col4Images, ...col4Images];

const IMG_HEIGHT = 280;
const GAP = 12;
const TOTAL1 = col1Images.length * (IMG_HEIGHT + GAP);
const TOTAL2 = col2Images.length * (IMG_HEIGHT + GAP);
const TOTAL3 = col3Images.length * (IMG_HEIGHT + GAP);
const TOTAL4 = col4Images.length * (IMG_HEIGHT + GAP);

/** Drives a track's translateY every frame — direction: 1 = up, -1 = down. */
function useAutoScroll(ref, totalHeight, direction, speed = 30) {
    useEffect(() => {
        let pos = direction === -1 ? -totalHeight : 0;
        let frame;
        let last = performance.now();
        const tick = (now) => {
            const dt = (now - last) / 1000;
            last = now;
            pos -= direction * speed * dt;
            if (direction === 1 && pos <= -totalHeight) pos += totalHeight;
            if (direction === -1 && pos >= 0) pos -= totalHeight;
            if (ref.current) ref.current.style.transform = `translateY(${pos}px)`;
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [ref, totalHeight, direction, speed]);
}

export default function GalleryGlimpse() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    useAutoScroll(ref1, TOTAL1, 1);   // scrolls up
    useAutoScroll(ref2, TOTAL2, -1);  // scrolls down
    useAutoScroll(ref3, TOTAL3, 1);   // scrolls up
    useAutoScroll(ref4, TOTAL4, -1);  // scrolls down

    return (
        <section
            className="relative w-full px-4 mt-16 sm:px-8 py-5 sm:py-8 lg:mb-16 overflow-hidden bg-[--mist] transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto">

                {/* Small eyebrow + headline, no repeated category cards */}
                <div className="flex items-end justify-between flex-wrap gap-3 mb-4 sm:mb-6">
                    <SectionHeading
                        eyebrow="Renewable Energy"
                        accent="leaf"
                        title="KEC Gallery at a"
                        titleAccent="CBG Glance."
                        className="max-w-lg"
                    />
                    <Reveal as="button" delay={0.15}
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[--blush] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[--blush-soft] hover:shadow-lift"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ background: ORANGE }}
                    >
                        Explore Now
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Reveal>
                </div>

                {/* Full-width gallery — four auto-scrolling columns, no category labels */}
                <div className="flex gap-3" style={{ height: "80vh", overflow: "hidden" }}>

                    <div className="flex-1 overflow-hidden">
                        <div ref={ref1} className="flex flex-col" style={{ gap: `${GAP}px`, willChange: "transform" }}>
                            {track1.map((img, i) => (
                                <div key={i} className="group relative" style={{ width: "100%", height: `${IMG_HEIGHT}px`, flexShrink: 0, borderRadius: 6, overflow: "hidden" }}>
                                    <img src={img.src} alt={img.alt}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                    <span className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[--blush] opacity-0 shadow-lift transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="h-2 w-2 rounded-full border-2 border-white" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <div ref={ref2} className="flex flex-col" style={{ gap: `${GAP}px`, willChange: "transform" }}>
                            {track2.map((img, i) => (
                                <div key={i} className="group relative" style={{ width: "100%", height: `${IMG_HEIGHT}px`, flexShrink: 0, borderRadius: 6, overflow: "hidden" }}>
                                    <img src={img.src} alt={img.alt}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                    <span className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[--blush] opacity-0 shadow-lift transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="h-2 w-2 rounded-full border-2 border-white" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden hidden sm:block">
                        <div ref={ref3} className="flex flex-col" style={{ gap: `${GAP}px`, willChange: "transform" }}>
                            {track3.map((img, i) => (
                                <div key={i} className="group relative" style={{ width: "100%", height: `${IMG_HEIGHT}px`, flexShrink: 0, borderRadius: 6, overflow: "hidden" }}>
                                    <img src={img.src} alt={img.alt}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                    <span className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[--blush] opacity-0 shadow-lift transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="h-2 w-2 rounded-full border-2 border-white" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden hidden lg:block">
                        <div ref={ref4} className="flex flex-col" style={{ gap: `${GAP}px`, willChange: "transform" }}>
                            {track4.map((img, i) => (
                                <div key={i} className="group relative" style={{ width: "100%", height: `${IMG_HEIGHT}px`, flexShrink: 0, borderRadius: 6, overflow: "hidden" }}>
                                    <img src={img.src} alt={img.alt}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                    <span className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[--blush] opacity-0 shadow-lift transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="h-2 w-2 rounded-full border-2 border-white" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}