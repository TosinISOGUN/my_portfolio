// Converts raw project screenshots (PNG) into web-sized WebP files.
//
// Usage: drop new PNG screenshots into src/assets/product_showcase/<project>/ and run
//   npm run optimize:images
// Each PNG is resized to at most MAX_WIDTH, written next to itself as .webp, and the
// original is moved to assets-originals/ (git-ignored) so it never ships in the bundle.
import { mkdir, readdir, rename, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const MAX_WIDTH = 1600;
const QUALITY = 80;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const showcaseDir = path.join(root, "src", "assets", "product_showcase");
const originalsDir = path.join(root, "assets-originals", "product_showcase");

const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

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

console.log(`Optimized ${count} images: ${formatMb(before)} -> ${formatMb(after)}`);
