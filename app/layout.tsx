import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
        default: "Renovix Nordic | Städning i Gävle och Gävleborg",
        template: "%s | Renovix Nordic",
    },
    description:
        "Renovix Nordic i Gävle erbjuder professionell flyttstädning, hemstädning, kontorsstädning och fönsterputsning i hela Gävleborg. 100% nöjdhetsgaranti.",
    authors: [{ name: "Renovix Nordic" }],
    creator: "Renovix Nordic",
    publisher: "Renovix Nordic",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Renovix Nordic | Städning i Gävle och Gävleborg",
        description:
            "Professionell städning och fastighetsskötsel i Gävle med omnejd. 100% nöjdhetsgaranti och RUT-avdrag. Boka din städning idag!",
        url: "https://renovixnordic.se",
        siteName: "Renovix Nordic Gävle",
        locale: "sv_SE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Renovix Nordic | Städning i Gävle och Gävleborg",
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
    alternates: { canonical: "/" },
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
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-18137050699"
                    strategy="lazyOnload"
                />
                <Script id="google-ads-tag" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-18137050699');
                    `}
                </Script>
                <Script
                    id="local-business-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            name: "Renovix Nordic",
                            url: "https://renovixnordic.se",
                            description:
                                "Professionell städning och fastighetsskötsel i Gävle och hela Gävleborg.",
                            areaServed: ["Gävle", "Sandviken", "Gävleborg"],
                            serviceType: [
                                "Hemstädning",
                                "Flyttstädning",
                                "Storstädning",
                                "Kontorsstädning",
                                "Fönsterputsning",
                            ],
                        }),
                    }}
                />
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
