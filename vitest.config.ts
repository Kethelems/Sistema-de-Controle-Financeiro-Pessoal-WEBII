import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    pool: "forks",
    exclude: ["dist/**", "node_modules/**"],
    coverage: {
      reporter: ["text", "html"]
    }
  },
  resolve: {
    conditions: ["node"]
  }
});
