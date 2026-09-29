import { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/data";
import PortfolioDetailClient from "./PortfolioDetailClient";

type Props = {
    params: Promise<{ id: string }>;
};

// Okända ID:n ger riktig 404 (inte 200 med "hittades inte"-text)
export const dynamicParams = false;

export function generateStaticParams() {
    return portfolioItems.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = portfolioItems.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Projektet hittades inte | Renovix",
            description:
                "Hittade inte det sökta referensprojektet hos Renovix.",
        };
    }

    return {
        title: `${project.title} i Gävleborg`,
        description: `${project.description} Läs om hur uppdraget genomfördes och kontakta oss om du vill boka en liknande tjänst.`,
        alternates: { canonical: `/portfolio/${id}` },
        openGraph: {
            title: `${project.title} - Renovix Nordic`,
            description: project.description,
            url: `https://renovixnordic.se/portfolio/${id}`,
        },
    };
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    if (!portfolioItems.some((p) => p.id === id)) notFound();
    return <PortfolioDetailClient />;
}
