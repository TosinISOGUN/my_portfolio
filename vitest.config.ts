import path from "node:path";
import { defineConfig } from "vitest/config";

// Standalone config: the site's vite.config.ts pulls in TanStack Start and Nitro,
// which tests don't need. Only the "@" alias and asset handling are required here.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
