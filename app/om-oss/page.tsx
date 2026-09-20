import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "Om Renovix Nordic - personlig städfirma i Gävle",
    description:
        "Lär känna Renovix Nordic, en städfirma i Gävle som sätter trygghet, personligt bemötande och noggrannhet i fokus.",
    alternates: { canonical: "/om-oss" },
    openGraph: {
        title: "Om Oss - Renovix Nordic Gävle",
        description:
            "Lär känna Renovix Nordic, en städfirma för hem och företag i Gävle och Gävleborg.",
        url: "/om-oss",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
