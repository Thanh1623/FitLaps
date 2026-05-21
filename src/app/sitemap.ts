import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fitlaps.com'; // Update with your actual domain
  const routes = ['', '/dashboard', '/bmi', '/tdee', '/macro', '/workout', '/meal-planner'];
  
  const sitemapEntries = [];
  
  for (const locale of routing.locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
