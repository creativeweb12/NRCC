import { footerLinks, navigation } from "./navigation";

/** All primary URLs derived from navigation (same logic as legacy /sitemap.xml route). */
export function collectSitePaths(): string[] {
  const paths = new Set<string>(["/"]);
  for (const section of navigation) {
    paths.add(section.href);
    section.groups?.forEach((group) => {
      group.items.forEach((leaf) => paths.add(leaf.href));
    });
  }
  footerLinks.forEach((link) => paths.add(link.href));
  return Array.from(paths).sort();
}

export function buildSitemapXml(baseUrl = ""): string {
  const urls = collectSitePaths().map(
    (p) =>
      `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}
