import { Metadata } from "next";
import TjansterClient from "./TjansterClient";

export const metadata: Metadata = {
    title: "Städtjänster i Gävle, Sandviken och Gävleborg",
    description:
            "Städtjänster för privatpersoner och företag i Gävle och Gävleborg. Hemstädning, flyttstädning, kontorsstädning och fönsterputsning.",
    alternates: { canonical: "/tjanster" },
    openGraph: {
        title: "Våra Städtjänster i Gävleborg - Renovix Nordic",
        description:
            "Flyttstädning, hemstädning, kontorsstädning och fönsterputsning för hem och företag i Gävleborg.",
        url: "/tjanster",
    },
};

export default function ServicesPage() {
    return <TjansterClient />;
}
