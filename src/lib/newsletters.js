/**
 * Content Guide Sec.7 (Insights & Articles) + Sec.9 (Common Section — Every
 * Page): both LinkedIn newsletter options must be available, not just one.
 *
 * "The BioEnergy Brief" URL below is the one already supplied/in use.
 * TODO: client to confirm/supply the "KEC Insight Series" LinkedIn
 * newsletter URL — falls back to the KEC Biofuel company LinkedIn page
 * until that link is provided.
 */
export const NEWSLETTERS = [
  {
    key: "bioenergy-brief",
    title: "BioEnergy Brief",
    description: "Follow our LinkedIn newsletter for updates.",
    buttonLabel: "Follow on LinkedIn",
    href: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7464982100782411778",
  },
  {
    key: "kec-insight-series",
    title: "KEC Insight Series",
    description: "Follow KEC's second LinkedIn newsletter for deeper insights.",
    buttonLabel: "Follow on LinkedIn",
    // TODO: replace with the real KEC Insight Series newsletter URL once supplied.
    href: "https://www.linkedin.com/company/kecbiofuel",
  },
];
