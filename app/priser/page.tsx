import { Metadata } from "next";
import PrislistaClient from "./PrislistaClient";

export const metadata: Metadata = {
    title: "Prislista & Fasta Priser för Städning i Gävle | Renovix Nordic",
    description:
        "Se vår kompletta prislista för flyttstädning, hemstädning, storstädning, fönsterputs och kontorsstädning i Gävle. Fasta priser med 50% RUT-avdrag direkt på fakturan.",
    keywords: [
        "flyttstädning pris Gävle",
        "städföretag Gävle priser",
        "hemstädning pris Gävle",
        "fönsterputs pris Gävle",
        "pris flyttstädning Gävle",
        "kostnad flyttstädning",
        "hemstädning pris per timme",
        "fönsterputs priser Gävle",
        "storstädning pris ",
        "kontorsstädning pris Gävle",
        "RUT-avdrag städning",
        "Renovix Nordic priser",
    ],
    openGraph: {
        title: "Prislista Städtjänster i Gävleborg | Renovix Nordic",
        description:
            "Tydliga och transparenta priser för flyttstädning, hemstädning, storstädning och fönsterputs. 50% RUT-avdrag och 100% städgaranti.",
        url: "https://renovixnordic.se/pris",
        type: "website",
    },
    alternates: {
        canonical: "https://renovixnordic.se/pris",
    },
};

export default function PrislistaPage() {
    return <PrislistaClient />;
}
