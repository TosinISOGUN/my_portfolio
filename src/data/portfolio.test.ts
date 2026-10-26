import { describe, expect, it } from "vitest";
import {
  certifications,
  featuredProjects,
  getHeroRank,
  getImageSize,
  projectCaseStudies,
  websitePictureOverrides,
  workHistory,
} from "@/data/portfolio";

describe("portfolio data", () => {
  it("lists every project exactly once in the Case Studies order", () => {
    const slugs = featuredProjects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a case study page for every featured project, and vice versa", () => {
    const featured = featuredProjects.map((project) => project.slug).sort();
    const caseStudies = projectCaseStudies.map((study) => study.slug).sort();
    expect(caseStudies).toEqual(featured);
  });

  it("leads with the four concept sites and Gloria May Byron, then orders the rest from closest-to-a-local-business to most technical", () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      "velora-beauty",
      "hearthline-realty",
      "juniper-ember",
      "everwell",
      "gloria-may-byron",
      "thomason",
      "nachie-maridadi",
      "c-homes",
      "infinitative",
      "open-school-field",
      "learncity",
      "payflow",
      "samsoni",
      "oyobooking",
    ]);
  });

  it("gives every project plain-language labels and a one-line summary", () => {
    for (const project of featuredProjects) {
      expect(project.labels.length, `${project.slug} labels`).toBeGreaterThan(0);
      const study = projectCaseStudies.find((item) => item.slug === project.slug);
      expect(study?.summary.length ?? 0, `${project.slug} summary`).toBeLessThan(110);
    }
  });

  it("marks every concept site as a concept, and nobody else", () => {
    const concepts = ["velora-beauty", "hearthline-realty", "juniper-ember", "everwell", "payflow"];
    for (const project of featuredProjects) {
      const marked = project.labels.includes("Concept project");
      expect(marked, `${project.slug} concept label`).toBe(concepts.includes(project.slug));
    }
    for (const slug of concepts) {
      const study = projectCaseStudies.find((item) => item.slug === slug);
      expect(study?.summary, `${slug} summary`).toMatch(/^Concept:/);
    }
  });

  it("keeps phone screenshots as optimized WebP with known sizes, two per project", () => {
    const withPhones = projectCaseStudies.filter((study) => study.mobile.length > 0);
    expect(withPhones.length).toBeGreaterThan(0);
    for (const study of withPhones) {
      expect(study.mobile.length, `${study.slug} phone screens`).toBe(2);
      for (const { src: image } of study.mobile) {
        expect(image, `${study.slug} phone screenshot`).toMatch(/\.webp(\?.*)?$/);
        expect(getImageSize(image), `${study.slug} phone size`).toBeDefined();
      }
    }
  });

  it("does not showcase Recap", () => {
    expect(featuredProjects.some((project) => project.slug === "recap")).toBe(false);
    expect(projectCaseStudies.some((study) => study.slug === "recap")).toBe(false);
  });

  it("gives every case study a cover, a gallery and a live link", () => {
    for (const study of projectCaseStudies) {
      expect(study.cover, `${study.slug} cover`).toBeTruthy();
      expect(study.gallery.length, `${study.slug} gallery`).toBeGreaterThan(0);
      expect(study.gallery.every(Boolean), `${study.slug} gallery entries`).toBe(true);
      expect(study.liveUrl, `${study.slug} live url`).toMatch(/^https:\/\//);
    }
  });

  it("serves optimized WebP screenshots only", () => {
    for (const study of projectCaseStudies) {
      for (const image of study.gallery) {
        expect(image, `${study.slug} screenshot`).toMatch(/\.webp(\?.*)?$/);
      }
    }
  });

  it("uses a tall capture of the home page as the cover of every project", () => {
    for (const study of projectCaseStudies) {
      const size = getImageSize(study.cover);
      expect(size, `${study.slug} cover size`).toBeDefined();
      expect(
        (size?.height ?? 0) / (size?.width ?? 1),
        `${study.slug} cover is tall`,
      ).toBeGreaterThan(1.2);
      expect(study.gallery[0], `${study.slug} gallery starts with the cover`).toBe(study.cover);
    }
  });

  it("gives every project an accent colour for its case-study page", () => {
    for (const project of featuredProjects) {
      expect(project.accent, `${project.slug} accent`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it("shows Open School Field's landing screenshot on the Websites tab", () => {
    expect(websitePictureOverrides["open-school-field"]).toContain("Screenshot%20(261)");
    for (const slug of Object.keys(websitePictureOverrides)) {
      expect(
        featuredProjects.some((project) => project.slug === slug),
        `${slug} exists`,
      ).toBe(true);
    }
  });

  it("has work history with at least one role and no empty entries", () => {
    expect(workHistory.length).toBeGreaterThan(0);
    for (const entry of workHistory) {
      expect(entry.company).toBeTruthy();
      expect(entry.role).toBeTruthy();
      expect(entry.period).toBeTruthy();
      expect(entry.summary).toBeTruthy();
    }
  });

  it("loads the certificates", () => {
    expect(certifications.length).toBeGreaterThan(0);
  });

  it("knows the size of every screenshot and certificate (run npm run optimize:images if not)", () => {
    const images = [
      ...projectCaseStudies.flatMap((study) => study.gallery),
      ...certifications.map((certificate) => certificate.image),
    ];

    for (const image of images) {
      const size = getImageSize(image);
      expect(size, `size for ${image}`).toBeDefined();
      expect(size?.width).toBeGreaterThan(0);
      expect(size?.height).toBeGreaterThan(0);
    }
  });

  it("has a hero-section screenshot for every project, ranked in Case Studies order", () => {
    featuredProjects.forEach((project, order) => {
      const study = projectCaseStudies.find((item) => item.slug === project.slug);
      const ranks = (study?.gallery ?? [])
        .map((image) => getHeroRank(image))
        .filter((rank): rank is number => rank !== undefined);

      expect(ranks, `${project.slug} hero`).toContain(order);
    });
  });
});
