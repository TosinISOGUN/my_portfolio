import { createFileRoute } from "@tanstack/react-router";
import { ReferencePortfolioHome } from "@/components/sections/ReferencePortfolioHome";
import { ogImageUrl, siteUrl } from "@/lib/seo";

const homeDescription =
  "Portfolio of Oluwatomisin Isogun, a frontend developer building booking platforms, landing pages, dashboards, enterprise interfaces, and marketplace products.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oluwatomisin Isogun - Frontend Developer Portfolio" },
      {
        name: "description",
        content: homeDescription,
      },
      {
        property: "og:title",
        content: "Oluwatomisin Isogun - Frontend Developer",
      },
      {
        property: "og:description",
        content:
          "Selected frontend work across Open School Field, enterprise software, marketplace apps, dashboards, and Isogun Labs products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:secure_url", content: ogImageUrl },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Oluwatomisin Isogun frontend developer portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Oluwatomisin Isogun - Frontend Developer" },
      { name: "twitter:description", content: homeDescription },
      { name: "twitter:image", content: ogImageUrl },
      { name: "twitter:image:alt", content: "Oluwatomisin Isogun frontend developer portfolio" },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: Index,
});

function Index() {
  return <ReferencePortfolioHome />;
}