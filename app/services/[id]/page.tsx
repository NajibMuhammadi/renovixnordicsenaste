import { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import ServiceDetailPage from "./ServiceClient";

type Props = {
    params: Promise<{ id: string }>;
};

// Okända ID:n ger riktig 404 (inte 200 med "hittades inte"-text)
export const dynamicParams = false;

export function generateStaticParams() {
    return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const service = services.find((s) => s.id === id);

    if (!service) {
        return {
            title: "Tjänsten hittades inte | Renovix",
            description: "Hittade inte den sökta städtjänsten hos Renovix.",
        };
    }

    const description = service.fullDescription || service.description;
    const title = service.title.replace(" – ", " | ");

    return {
        title: { absolute: title },
        description,
        alternates: { canonical: `/services/${id}` },
        openGraph: {
            title,
            description,
            url: `/services/${id}`,
        },
    };
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    if (!services.some((s) => s.id === id)) notFound();
    return <ServiceDetailPage />;
}
