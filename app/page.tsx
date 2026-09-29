import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: {
        absolute:
            "Städfirma i Gävle – Hemstädning & Flyttstädning | Renovix Nordic",
    },
    description:
        "Renovix Nordic är en städfirma i Gävle som erbjuder hemstädning, flyttstädning, storstädning, fönsterputs och kontorsstädning i Gävle och Gävleborg.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Städfirma i Gävle – Hemstädning & Flyttstädning | Renovix Nordic",
        description:
            "Städtjänster för hem och företag i Gävle och Gävleborg. Vi erbjuder bland annat hemstädning, flyttstädning, storstädning och fönsterputs.",
        url: "/",
        siteName: "Renovix Nordic",
        locale: "sv_SE",
        type: "website",
    },
};

export default function Page() {
    return <HomeClient />;
}
