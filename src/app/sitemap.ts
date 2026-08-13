import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { industries } from "@/lib/industries";
import { locations } from "@/lib/locations";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: SITE_URL, changeFrequency: "weekly" , priority: 1 },
    { url: `${SITE_URL}/partners`, changeFrequency: "weekly" , priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" , priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" , priority: 0.9 },
    { url: `${SITE_URL}/locations`, changeFrequency: "monthly" , priority: 0.7 },
    { url: `${SITE_URL}/resources`, changeFrequency: "monthly" , priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly" , priority: 0.7 },
    {
      url: `${SITE_URL}/resources/surcharge-savings-calculator`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resources/financing-impact-calculator`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly" , priority: 0.2 },
    { url: `${SITE_URL}/terms-of-use`, changeFrequency: "yearly" , priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: "yearly" , priority: 0.2 },
    { url: `${SITE_URL}/accessibility`, changeFrequency: "yearly" , priority: 0.2 },
  ] satisfies MetadataRoute.Sitemap).map((entry) => ({
    ...entry,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...industries.map((industry) => ({
      url: `${SITE_URL}/partners/${industry.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...locations.map((location) => ({
      url: `${SITE_URL}/locations/${location.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
