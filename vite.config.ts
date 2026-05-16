import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { buildSitemapXml } from "./src/lib/sitemap";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "sitemap-xml",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0];
          if (url === "/sitemap.xml") {
            res.setHeader("Content-Type", "application/xml");
            res.setHeader("Cache-Control", "public, max-age=3600");
            res.end(buildSitemapXml());
            return;
          }
          next();
        });
      },
      closeBundle() {
        const out = path.resolve(projectRoot, "dist/sitemap.xml");
        fs.writeFileSync(out, buildSitemapXml(), "utf8");
      },
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
