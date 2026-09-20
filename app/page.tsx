import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: "Städfirma i Gävle | Hemstädning, flyttstädning och kontorsstädning",
    description:
        "Behöver du städhjälp i Gävle? Renovix Nordic erbjuder hemstädning, flyttstädning, storstädning och kontorsstädning i Gävle och Gävleborg.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Renovix Nordic | Flyttstädning, Hemstädning & Kontorsstädning i Gävle",
        description:
            "Städning för hem och företag i Gävle och Gävleborg. Begär en offert på flyttstädning, hemstädning eller någon av våra andra tjänster.",
        url: "/",
        siteName: "Renovix Nordic",
        locale: "sv_SE",
        type: "website",
    },
};

export default function Page() {
    return <HomeClient />;
}
