import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Boka städning och få gratis offert i Gävle",
    description:
        "Fyll i formuläret för att få en kostnadsfri offert på flyttstädning, hemstädning eller kontorsstädning i Gävleborg.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Få Gratis Offert på Städning i Gävleborg - Renovix Nordic",
        description:
            "Boka flyttstädning, hemstädning eller företagsstädning i Gävle och Gävleborg. Beskriv ditt uppdrag så återkommer vi med en offert.",
        url: "/contact",
    },
};

export default function Page() {
    return <ContactClient />;
}
