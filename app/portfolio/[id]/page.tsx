import { Metadata } from "next";
import { portfolioItems } from "@/lib/data";
import PortfolioDetailClient from "./PortfolioDetailClient";

type Props = {
    params: Promise<{ id: string }>;
};

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

export default function Page() {
    return <PortfolioDetailClient />;
}
