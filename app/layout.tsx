import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
// @ts-ignore
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-display",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://renovixnordic.se"),
    title: {
        default:
            "Renovix Nordic | Flyttstädning, Hemstädning & Kontorsstädning i Gävle",
        template: "%s | Renovix Nordic",
    },
    description:
        "Renovix Nordic i Gävle erbjuder professionell flyttstädning, hemstädning, kontorsstädning och fönsterputsning i hela Gävleborg. 100% nöjdhetsgaranti.",
    keywords: [
        "flyttstädning Gävle",
        "hemstädning Gävle",
        "fönsterputsning Gävle",
        "bortforsling Gävle",
        "städning Gävle",
        "Renovix Nordic Gävle",
        "städservice Gävleborg",
        "städfirma Gävle",
        "storstädning Gävle",
        "kontorsstädning Gävle",
        "trappstädning Gävleborg",
        "gräsklippning Gävle",
    ],
    authors: [{ name: "Renovix Nordic" }],
    creator: "Renovix Nordic",
    publisher: "Renovix Nordic",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Renovix Nordic Gävle | Din partner för ett renare hem i Gävleborg",
        description:
            "Professionell städning och fastighetsskötsel i Gävle med omnejd. 100% nöjdhetsgaranti och RUT-avdrag. Boka din städning idag!",
        url: "https://renovixnordic.se",
        siteName: "Renovix Nordic Gävle",
        locale: "sv_SE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Renovix Nordic Gävle | Flyttstädning & Hemstädning",
        description:
            "Bästa städservicen i Gävleborg. Vi fixar allt från flyttstädning till gräsklippning.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://renovixnordic.se",
    },
};

export const viewport = {
    themeColor: "#1e3a5f",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

import { QuoteModalProvider } from "@/lib/QuoteModalContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="sv"
            className={`${inter.variable} ${outfit.variable} ${playfair.variable}`}
            style={{ scrollBehavior: "smooth" }}
        >
            <body
                className="font-sans antialiased bg-white dark:bg-[#0a111a] transition-colors duration-300"
                suppressHydrationWarning
            >
                <ThemeProvider>
                    <QuoteModalProvider>
                        <Header />
                        <main id="main-content">{children}</main>
                        <Footer />
                    </QuoteModalProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
