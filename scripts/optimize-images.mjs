// Prepares project images for the site.
//
// Usage: drop new PNG screenshots into src/assets/product_showcase/<project>/ and run
//   npm run optimize:images
//
// 1. Each PNG is resized to at most MAX_WIDTH, written next to itself as .webp, and the
//    original is moved to assets-originals/ (git-ignored) so it never ships in the bundle.
// 2. Smaller copies of every showcase screenshot are written to public/img/ so the page
//    can offer phones a small file and big screens a large one (srcset, see SkeletonImage).
// 3. The pixel size of every showcase screenshot and certificate is written to
//    src/data/image-sizes.generated.ts. The site uses it to reserve the right amount of space
//    before an image loads, so the page does not jump and a skeleton can be shown.
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const MAX_WIDTH = 1600;
const QUALITY = 80;
// Widths of the smaller copies. A copy is only made when it is clearly smaller than the original.
const VARIANT_WIDTHS = [320, 760, 1100];
const VARIANT_QUALITY = 74;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "src", "assets");
const showcaseDir = path.join(assetsDir, "product_showcase");
const certificationsDir = path.join(assetsDir, "certifications");
const responsiveDir = path.join(root, "public", "img");
const originalsDir = path.join(root, "assets-originals", "product_showcase");
const manifestFile = path.join(root, "src", "data", "image-sizes.generated.ts");
const tonesFile = path.join(root, "src", "data", "mobile-tones.generated.ts");

// The phone frame on the site shows each phone screenshot cropped to this width:height ratio
// (see src/components/PhoneStage.tsx). The tones below are sampled from the visible edges.
const PHONE_SCREEN_ASPECT = 270 / 544;

const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

async function optimizeScreenshots() {
  let before = 0;
  let after = 0;
  let count = 0;

  for (const project of await readdir(showcaseDir, { withFileTypes: true })) {
    if (!project.isDirectory()) continue;

    const projectDir = path.join(showcaseDir, project.name);
    for (const file of await readdir(projectDir)) {
      if (!/\.png$/i.test(file)) continue;

      const source = path.join(projectDir, file);
      const target = path.join(projectDir, file.replace(/(\.png)+$/i, ".webp"));

      await sharp(source)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(target);

      before += (await stat(source)).size;
      after += (await stat(target)).size;
      count += 1;

      const archiveDir = path.join(originalsDir, project.name);
      await mkdir(archiveDir, { recursive: true });
      await rename(source, path.join(archiveDir, file));
    }
  }

  console.log(
    count
      ? `Optimized ${count} images: ${formatMb(before)} -> ${formatMb(after)}`
      : "No new PNG screenshots to optimize.",
  );
}

async function listImages(dir, extensions) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await listImages(full, extensions)));
    else if (extensions.test(entry.name)) found.push(full);
  }
  return found;
}

// Writes the smaller copies to public/img/<path>-<width>.<version>.webp. The version is a short
// hash of the original's bytes, so a replaced screenshot gets new file names and browsers (and any
// cache in front of the site) never serve a stale copy. Returns each original's version, which
// goes into the manifest so the page can build the srcset without listing the files.
async function writeResponsiveVariants() {
  let made = 0;
  const versions = new Map();
  const keep = new Set();

  for (const file of (await listImages(showcaseDir, /\.webp$/i)).sort()) {
    const { width } = await sharp(file).metadata();
    if (!width) throw new Error(`Could not read the size of ${file}`);
    const key = path.relative(assetsDir, file).split(path.sep).join("/");
    const rel = key.replace(/\.webp$/i, "");
    if (rel.includes(",")) throw new Error(`A comma in "${rel}" would break the srcset`);
    const version = createHash("sha1")
      .update(await readFile(file))
      .digest("hex")
      .slice(0, 8);
    versions.set(key, version);

    for (const target of VARIANT_WIDTHS) {
      if (target > width * 0.9) continue;
      const out = path.join(responsiveDir, `${rel}-${target}.${version}.webp`);
      keep.add(out);
      if (await stat(out).catch(() => null)) continue;
      await mkdir(path.dirname(out), { recursive: true });
      await sharp(file).resize({ width: target }).webp({ quality: VARIANT_QUALITY }).toFile(out);
      made += 1;
    }
  }

  // Remove copies of screenshots that were replaced or deleted.
  let removed = 0;
  for (const existing of await listImages(responsiveDir, /\.webp$/i).catch(() => [])) {
    if (keep.has(existing)) continue;
    await rm(existing);
    removed += 1;
  }

  console.log(`Smaller copies: ${made} written, ${removed} removed, ${keep.size} in public/img/.`);
  return versions;
}

async function writeSizeManifest(versions) {
  const files = [
    ...(await listImages(showcaseDir, /\.webp$/i)),
    ...(await listImages(certificationsDir, /\.(png|jpe?g|webp)$/i)),
  ];

  const sizes = {};
  for (const file of files.sort()) {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) throw new Error(`Could not read the size of ${file}`);
    const key = path.relative(assetsDir, file).split(path.sep).join("/");
    sizes[key] = { width, height, v: versions.get(key) };
  }

  const body = Object.entries(sizes)
    .map(
      ([key, size]) =>
        `  ${JSON.stringify(key)}: { width: ${size.width}, height: ${size.height}${
          size.v ? `, v: ${JSON.stringify(size.v)}` : ""
        } },`,
    )
    .join("\n");

  await writeFile(
    manifestFile,
    `// Generated by scripts/optimize-images.mjs. Do not edit by hand.\n` +
      `// v is the version in the file names of an image's smaller copies in public/img/.\n` +
      `export const responsiveWidths: number[] = ${JSON.stringify(VARIANT_WIDTHS)};\n` +
      `export const imageSizes: Record<string, { width: number; height: number; v?: string }> = {\n${body}\n};\n`,
  );
  console.log(`Wrote ${files.length} image sizes to ${path.relative(root, manifestFile)}`);
}

// Colours at the top and bottom edge of each phone screenshot, so the phone frame's status bar and
// home bar can match the screen they sit next to, with text that stays readable on top.
async function averageColour(file, top, height, width) {
  const { data } = await sharp(file)
    .extract({ left: 0, top, width, height })
    .resize(1, 1, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const [r, g, b] = data;
  const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return { hex, light: luminance > 0.6 };
}

async function writeMobileTones() {
  const mobileDir = path.join(showcaseDir, "_mobile");
  const files = (await listImages(mobileDir, /\.webp$/i)).sort();
  const entries = [];

  for (const file of files) {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) throw new Error("Could not read the size of " + file);
    const visible = Math.min(height, Math.round(width / PHONE_SCREEN_ASPECT));
    const rows = Math.max(2, Math.round(height * 0.01));
    const top = await averageColour(file, 0, rows, width);
    const bottom = await averageColour(
      file,
      Math.round(visible * 0.94),
      Math.max(2, Math.round(visible * 0.045)),
      width,
    );
    const key = path.relative(assetsDir, file).split(path.sep).join("/");
    entries.push(
      "  " +
        JSON.stringify(key) +
        ": {\n" +
        "    top: " +
        JSON.stringify(top.hex) +
        ",\n" +
        "    topLight: " +
        top.light +
        ",\n" +
        "    bottom: " +
        JSON.stringify(bottom.hex) +
        ",\n" +
        "    bottomLight: " +
        bottom.light +
        ",\n" +
        "  },",
    );
  }

  await writeFile(
    tonesFile,
    "// Generated by scripts/optimize-images.mjs. Do not edit by hand.\n" +
      "export type MobileTone = {\n  top: string;\n  topLight: boolean;\n  bottom: string;\n  bottomLight: boolean;\n};\n" +
      "export const mobileTones: Record<string, MobileTone> = {\n" +
      entries.join("\n") +
      "\n};\n",
  );
  console.log(
    "Wrote " + files.length + " phone screenshot tones to " + path.relative(root, tonesFile),
  );
}

await optimizeScreenshots();
const versions = await writeResponsiveVariants();
await writeSizeManifest(versions);
await writeMobileTones();
