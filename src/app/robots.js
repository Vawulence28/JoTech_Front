export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jo-tech-hub.vercel.app/sitemap.xml",
  };
}