import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const srcDir = path.resolve(__dirname);

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return name === "assets" ? [] : sourceFiles(full);
    return /\.(tsx?|css)$/.test(name) && !/\.test\./.test(name) && !/generated/.test(name)
      ? [full]
      : [];
  });

const allText = sourceFiles(srcDir)
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

describe("client-facing copy rules", () => {
  it("uses generic business words only: no size or niche wording", () => {
    for (const banned of [
      /small business/i,
      /\bpatients?\b/i,
      /\bappointments?\b/i,
      /\bdental\b/i,
    ]) {
      expect(allText, `banned wording ${banned}`).not.toMatch(banned);
    }
  });

  it("has no joke copy left in the hero", () => {
    expect(allText).not.toMatch(/dev notes, lol/i);
    expect(allText).not.toMatch(/convincing rectangles/i);
  });

  it("keeps every contact link", () => {
    expect(allText).toContain("cal.com/oluwatomisin-isogun-disku5/20min");
    expect(allText).toContain("tomisin@isogunlabs.com");
    expect(allText).toContain("github.com/TosinISOGUN");
    expect(allText).toContain("linkedin.com/in/oluwatomisin-isogun");
    expect(allText).toContain("upwork.com/freelancers");
    expect(allText).toContain("OLUWATOMISIN_ISOGUN_RESUME.pdf");
    expect(allText).toContain("wa.me/2348164376172");
    expect(allText).toContain("facebook.com/profile.php?id=61595720432735");
  });

  it("uses the rebrand headline, buttons and footer line", () => {
    expect(allText).toContain("that turn visitors into customers.");
    expect(allText).toContain("Book a free call");
    expect(allText).toContain("Chat on WhatsApp");
    expect(allText).toContain("Need a website that brings in more customers? Let's talk.");
    expect(allText).toContain("Fixed price. Fast delivery. You own your site.");
  });

  it("never leaves an image without alt text", () => {
    expect(allText).not.toContain('alt=""');
  });
});
