// Lists every unresolved "TODO(owner)" in the site's source, so nothing ships with a gap in it.
//
//   npm run check:todos            prints the list (always exits 0)
//   npm run check:todos -- --strict   exits 1 if any are left (use before publishing)
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(tsx?|css|html|md)$/.test(entry.name) && !/\.test\./.test(entry.name))
      files.push(full);
  }
  return files;
}

const found = [];
for (const file of await walk(path.join(root, "src"))) {
  const lines = (await readFile(file, "utf8")).split(/\r?\n/);
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const isDocumentation =
      trimmed.startsWith("*") ||
      trimmed.startsWith("/**") ||
      trimmed.includes("TODO(owner): {children}");
    // Markers show up three ways: a comment, a <Todo> element in the page, or a "todo:" data field.
    const isMarker =
      line.includes("TODO(owner)") || /<Todo>/.test(line) || /^\s*todo:\s/.test(line);
    if (isMarker && !isDocumentation) {
      found.push(
        `${path.relative(root, file).split(path.sep).join("/")}:${index + 1}  ${line.trim()}`,
      );
    }
  });
}

if (found.length === 0) {
  console.log("No TODO(owner) markers left.");
} else {
  console.log(`${found.length} TODO(owner) marker(s) still need a decision:\n`);
  console.log(found.join("\n"));
}

if (strict && found.length > 0) process.exit(1);
