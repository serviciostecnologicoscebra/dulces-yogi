import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  test: { environment: "node", globals: true, setupFiles: ["./vitest.setup.js"], include: ["tests/unit/**/*.test.js"] },
});
