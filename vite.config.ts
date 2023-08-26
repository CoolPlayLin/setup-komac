/// vitest
import { defineConfig } from "vite";

const VITEST_SEQUENCE_SEED = Date.now();
console.log("VITEST_SEQUENCE_SEED", VITEST_SEQUENCE_SEED);

export default defineConfig({
  test: {
    setupFiles: ["./__tests__/setup.ts"],
    reporters: "verbose",
    sequence: {
      seed: VITEST_SEQUENCE_SEED,
      shuffle: true,
    },
  },
});
