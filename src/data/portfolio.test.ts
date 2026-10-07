import { describe, expect, it } from "vitest";
import {
  certifications,
  featuredProjects,
  projectCaseStudies,
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

  it("puts Nachie Maridadi first, then Open School Field, then Infinitative", () => {
    expect(featuredProjects.slice(0, 3).map((project) => project.slug)).toEqual([
      "nachie-maridadi",
      "open-school-field",
      "infinitative",
    ]);
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

  it("keeps Open School Field's cover on the landing screenshot", () => {
    const study = projectCaseStudies.find((item) => item.slug === "open-school-field");
    expect(study?.cover).toContain("Screenshot%20(261)");
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
});
