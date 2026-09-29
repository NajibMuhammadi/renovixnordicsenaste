import { MetadataRoute } from "next";
import { portfolioItems, services } from "@/lib/data";

const LAST_MODIFIED = new Date("2026-09-29");

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renovixnordic.se";

    const serviceUrls = services.map((service) => ({
        url: `${baseUrl}/services/${service.id}`,
        lastModified: LAST_MODIFIED,
    }));

    const portfolioUrls = portfolioItems.map((item) => ({
        url: `${baseUrl}/portfolio/${item.id}`,
        lastModified: LAST_MODIFIED,
    }));

    return [
        { url: baseUrl, lastModified: LAST_MODIFIED },
        { url: `${baseUrl}/tjanster`, lastModified: LAST_MODIFIED },
        { url: `${baseUrl}/om-oss`, lastModified: LAST_MODIFIED },
        { url: `${baseUrl}/contact`, lastModified: LAST_MODIFIED },
        ...serviceUrls,
        { url: `${baseUrl}/portfolio`, lastModified: LAST_MODIFIED },
        ...portfolioUrls,
    ];
}
