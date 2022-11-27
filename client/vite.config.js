import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@api": path.resolve("./src/api"),
      "@components": path.resolve("./src/components"),
      "@hooks": path.resolve("./src/hooks"),
      "@pages": path.resolve("./src/pages"),
    },
  },
  plugins: [react()],
});
