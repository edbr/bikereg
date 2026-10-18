import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Wallet dashboards and unenumerated token IDs are not sitemap landing pages.
  return [{ url: `${site.url}/` }];
}
