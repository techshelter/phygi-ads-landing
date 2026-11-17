import type { NextConfig } from "next";

// The site is now a single page: old routes point to their matching section.
const legacySections: Record<string, string> = {
  platform: "mesure",
  pain: "supports",
  annonceurs: "cta",
  partenaires: "cta",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacySections).map(([path, section]) => ({
      source: `/:lang(fr|en)/${path}`,
      destination: `/:lang#${section}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
