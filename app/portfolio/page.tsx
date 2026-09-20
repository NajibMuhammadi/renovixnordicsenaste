import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
    title: "Referenser och före- och efterbilder från Gävle",
    description:
        "Se resultaten av våra professionella städningar i Gävleborg. Utforska galleriet med före- och efterbilder för flyttstädning, hemstädning och fönsterputsning.",
    alternates: { canonical: "/portfolio" },
    openGraph: {
        title: "Referenser & Före/Efter-bilder - Renovix Nordic",
        description:
            "Se prov på vår höga kvalitet och noggrannhet. Riktiga resultat från riktiga kunder i Gävle med omnejd.",
        url: "/portfolio",
    },
};

export default function Page() {
    return <PortfolioClient />;
}
