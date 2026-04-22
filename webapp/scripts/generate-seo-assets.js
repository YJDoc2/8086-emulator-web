const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const siteUrl = "https://yjdoc2.github.io/8086-emulator-web";
const routes = [
  "/",
  "/compile",
  "/help",
];

function readLastmodFromExistingSitemap() {
  try {
    const existing = fs.readFileSync(path.join(publicDir, "sitemap.xml"), "utf8");
    const match = existing.match(/<lastmod>([^<]+)<\/lastmod>/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

const lastmod =
  process.env.SITEMAP_LASTMOD ||
  readLastmodFromExistingSitemap() ||
  new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route === "/" ? "/" : route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const fallback404 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>8086 Emulator Redirect</title>
    <script>
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol +
          "//" +
          l.hostname +
          (l.port ? ":" + l.port : "") +
          l.pathname.split("/").slice(0, 1 + pathSegmentsToKeep).join("/") +
          "/?p=/" +
          l.pathname.slice(1).split("/").slice(pathSegmentsToKeep).join("/").replace(/&/g, "~and~") +
          (l.search ? "&q=" + l.search.slice(1).replace(/&/g, "~and~") : "") +
          l.hash
      );
    </script>
  </head>
  <body>
    <p>Redirecting to the 8086 Emulator application...</p>
  </body>
</html>
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "404.html"), fallback404);
