"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Phone } from "lucide-react";
import Link from "next/link";

import CallbackModal from "@/comp/CallbackModal";

// Client Master Content & Page Structure Guide (Sec.1) fixes menu order 1-7 below.
// NOT in the 7 client docs, guide says keep only if client separately confirms —
// left in nav (not deleted) per instruction, appended after the required set.
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "CBG Park", href: "/cbg-park" },
  { label: "Strategic Location", href: "/strategic-location" },
  { label: "Technology & Process", href: "/technology-process" },
  { label: "Investor Interaction", href: "/investor-interaction" },
  { label: "Insights & Articles", href: "/blog" },
  { label: "Infographics", href: "/infographics" },
  // -- extra pages, not in client's 7 docs (guide Sec.1) --
  // { label: "About Us", href: "/about" },
  // { label: "KEC", href: "/kec" },
  // { label: "Projects", href: "/projects" },
  // { label: "Services", href: "/services" },
  // { label: "Case Study", href: "/case-studies" },
  // { label: "ROI Planner", href: "/roi" },
];

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

export default function Header({ light = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cbOpen, setCbOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !scrolled && !light;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 px-4 top-4 z-40 sm:top-6"
      >
        <div
          className={`mx-4 sm:mx-8 flex h-[66px] items-center justify-between gap-2 xl:gap-6 rounded-full border border-ink-900/8 pl-2 pr-2 shadow-[0_18px_40px_-18px_rgba(10,19,16,0.28)] transition-colors duration-500 ${scrolled ? "bg-white" : "bg-white/90"
            }`}
        >
          <Link
            href="/"
            className="flex shrink-0 cursor-pointer items-center gap-2.5 pl-4 xl:pl-6"
            aria-label="Bio CBG — home"
          >
            <img
              src="/images/logo.png"
              alt="Bio CBG"
              className="h-8 xl:h-9 w-auto min-w-[55px] xl:min-w-[65px]"
            />
          </Link>

          {/* Nav links: only render at xl+ where there's room for all 7 items */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 2xl:gap-1 xl:flex flex-nowrap overflow-hidden"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative shrink-0 cursor-pointer whitespace-nowrap px-1.5 2xl:px-2 text-[14px] 2xl:text-[14px] font-semibold text-ink-500 transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-blush-400 after:transition-all after:duration-300 hover:text-leaf-700 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-1.5 2xl:gap-2.5 xl:flex mr-2 2xl:mr-8">
            <button
              type="button"
              onClick={() => setCbOpen(true)}
              className="inline-flex min-h-[40px] shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 2xl:px-3 text-[13.2px] 2xl:text-[14px] font-semibold text-white shadow-lift-blush transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: ORANGE }}
            >
              <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Callback
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-[40px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full px-2.5 2xl:px-3 text-[13px] 2xl:text-[14px] font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ background: ORANGE }}
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger now covers everything below xl, so tablet/small-laptop no longer squeezes */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-ink-900/6 text-ink-900 transition-colors xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="container-shell mt-2 overflow-hidden rounded-3xl border border-ink-900/8 bg-mist-50 shadow-xl xl:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer rounded-xl px-3 py-3.5 text-sm font-medium text-ink-800 transition-colors hover:bg-mist-100"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => { setOpen(false); setCbOpen(true); }}
                  className="mt-2 inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold text-white shadow-lift-blush"
                  style={{ background: ORANGE }}
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Request a Callback
                </button>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold text-white"
                  style={{ background: ORANGE }}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <CallbackModal open={cbOpen} onClose={() => setCbOpen(false)} />
    </>
  );
}