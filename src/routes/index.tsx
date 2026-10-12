import { createFileRoute } from "@tanstack/react-router";
import { ReferencePortfolioHome } from "@/components/sections/ReferencePortfolioHome";
import { ogImageUrl, siteUrl } from "@/lib/seo";

const homeTitle = "Oluwatomisin Isogun | Websites That Turn Visitors Into Customers";
const homeDescription =
  "I build fast, good-looking websites that turn visitors into customers. Fixed price, quick delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeTitle },
      {
        name: "description",
        content: homeDescription,
      },
      {
        property: "og:title",
        content: homeTitle,
      },
      {
        property: "og:description",
        content: homeDescription,
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
        content: "Oluwatomisin Isogun, websites that turn visitors into customers",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: homeTitle },
      { name: "twitter:description", content: homeDescription },
      { name: "twitter:image", content: ogImageUrl },
      {
        name: "twitter:image:alt",
        content: "Oluwatomisin Isogun, websites that turn visitors into customers",
      },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: Index,
});

function Index() {
  return <ReferencePortfolioHome />;
}
