import InfographicsScreen from "@/screens/InfographicsScreen";

export const metadata = {
  title: "Infographics | KEC CBG Park",
  description:
    "Daily and visual infographics on CBG Parks, feedstock, policy and incentives, and plant operations from KEC.",
  openGraph: {
    title: "Infographics | KEC CBG Park",
    description: "Daily and visual infographics on CBG Parks, feedstock, policy and plant operations.",
    type: "website",
    siteName: "KEC CBG Park",
  },
  twitter: { card: "summary_large_image" },
};

export default function InfographicsPage() {
  return <InfographicsScreen />;
}
