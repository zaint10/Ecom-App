import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src/",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@assets": "/src/assets",
      "@store": "/src/store",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@layouts": "/src/layouts",
    },
  },
});
