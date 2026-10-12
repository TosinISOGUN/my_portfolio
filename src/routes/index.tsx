import { createFileRoute } from "@tanstack/react-router";
import { ReferencePortfolioHome } from "@/components/sections/ReferencePortfolioHome";
import { ogImageUrl, seoDescription, seoTitle, shareTitle, siteUrl } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seoTitle },
      {
        name: "description",
        content: seoDescription,
      },
      {
        property: "og:title",
        content: shareTitle,
      },
      {
        property: "og:description",
        content: seoDescription,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:secure_url", content: ogImageUrl },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Oluwatomisin Isogun, web design and development. Websites that turn visitors into customers.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: shareTitle },
      { name: "twitter:description", content: seoDescription },
      { name: "twitter:image", content: ogImageUrl },
      {
        name: "twitter:image:alt",
        content:
          "Oluwatomisin Isogun, web design and development. Websites that turn visitors into customers.",
      },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: Index,
});

function Index() {
  return <ReferencePortfolioHome />;
}
