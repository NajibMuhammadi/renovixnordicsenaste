import { Metadata } from "next";
import { services } from "@/lib/data";
import ServiceDetailPage from "./ServiceClient";

type Props = {
    params: Promise<{ id: string }>;
};

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

export default function Page() {
    return <ServiceDetailPage />;
}
