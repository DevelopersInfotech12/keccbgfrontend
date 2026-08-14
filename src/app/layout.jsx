import { Bricolage_Grotesque, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/comp/WhatsAppWidget";

/* Display: an optically-sized grotesque with real character in the counters —
   carries the headlines without reading like a default UI sans. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/* Accent: used only for the emphasised half of the hero headline. */
const accent = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

/* Body + data. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "CBG Park | Strategically Planned Bio-CNG Industrial Ecosystems by KEC Agritech",
  description:
    "Explore KEC's strategically planned CBG Parks designed around infrastructure, connectivity, feedstock integration, and long-term clean energy ecosystem development.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1310",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${accent.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased">{children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
