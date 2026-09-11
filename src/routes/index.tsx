import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oluwatomisin Isogun - Frontend Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Oluwatomisin Isogun, a frontend developer building booking platforms, landing pages, dashboards, enterprise interfaces, and marketplace products.",
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
