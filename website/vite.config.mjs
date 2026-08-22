import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        research: resolve(root, "research/index.html"),
        publication: resolve(root, "publication/index.html"),
        members: resolve(root, "members/index.html"),
        recruitment: resolve(root, "recruitment/index.html"),
        contact: resolve(root, "contact/index.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
