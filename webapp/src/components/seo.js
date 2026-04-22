import { useEffect } from "react";
import { siteConfig } from "../siteConfig";

function upsertMeta(selector, attributes) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

function upsertLink(selector, rel, href) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function upsertStructuredData(id, value) {
  let tag = document.head.querySelector(`#${id}`);
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = id;
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(value);
}

function SEO({
  title,
  description,
  canonical,
  image = siteConfig.socialImage,
  type = "website",
  structuredData = [],
}) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index,follow",
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: siteConfig.siteName,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonical,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: image,
    });
    upsertMeta('meta[name="twitter:url"]', {
      name: "twitter:url",
      content: canonical,
    });

    upsertLink('link[rel="canonical"]', "canonical", canonical);

    if (structuredData.length > 0) {
      upsertStructuredData("seo-structured-data", structuredData);
    }

    return () => {
      if (structuredData.length === 0) {
        const tag = document.head.querySelector("#seo-structured-data");
        if (tag) {
          tag.remove();
        }
      }
    };
  }, [canonical, description, image, structuredData, title, type]);

  return null;
}

export default SEO;
