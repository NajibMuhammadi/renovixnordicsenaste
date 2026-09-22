import {
    Trash2,
    Sparkles,
    Home,
    Building2,
    Scissors,
    Layers,
    Truck,
} from "lucide-react";

import type { StaticImageData } from "next/image";
import outsideAfter from "@/public/images/putsning/outsideAfter.jpg";
import outsideBefore from "@/public/images/putsning/outsideBefore.jpg";
import insideAfter from "@/public/images/putsning/insideAfter.jpg";
import insideBefore from "@/public/images/putsning/insideBefore.jpg";

export const services = [
    {
        id: "flyttstadning",
        title: "Flyttstädning | Med garanti",
        category: "Flyttstädning",
        description:
            "Noggrann flyttstädning enligt vår checklista, med garanti om något behöver åtgärdas efter besiktningen.",
        icon: Truck,
        image: "https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-blue-50",
        fullDescription:
            "När det är dags att lämna bostaden tar vi hand om flyttstädningen. Vi går igenom hela bostaden enligt en tydlig checklista och lägger extra fokus på kök, badrum, skåp, vitvaror och andra ytor som behöver rengöras inför överlämningen.",
        subDescription:
            "Vi rengör bland annat kök, badrum, golv, lister, skåp, vitvaror och andra ytor som ingår i flyttstädningen. Om något behöver åtgärdas efter besiktningen återkommer vi enligt vår städgaranti.",
        whyChooseTitle: "Varför välja Renovix Nordic för din flyttstädning?",
        whyChooseDescription:
            "Vi arbetar efter en tydlig checklista och går systematiskt igenom bostaden. Målet är att du ska kunna lämna över bostaden i ett välstädat skick utan att behöva tänka på detaljerna.",
        benefits: [
            "Städning enligt tydlig checklista",
            "Städgaranti vid behov av åtgärd",
            "Noggrann rengöring av kök och badrum",
            "Rengöring av skåp och vitvaror",
            "Ansvarsförsäkrad verksamhet",
            "RUT-avdrag när tjänsten är berättigad",
        ],
        processTitle: "Så går flyttstädningen till",
        steps: [
            {
                step: "01",
                title: "Offert",
                desc: "Du skickar information om bostaden och får ett pris baserat på uppdragets omfattning.",
            },
            {
                step: "02",
                title: "Vi städar bostaden",
                desc: "Vi går igenom bostaden enligt vår checklista och rengör de ytor som ingår.",
            },
            {
                step: "03",
                title: "Kontroll och överlämning",
                desc: "Vi går igenom arbetet innan bostaden lämnas över.",
            },
        ],
        sidebarTitle: "Behöver du flyttstädning?",
        sidebarText:
            "Skicka information om bostaden så återkommer vi med en offert.",
        /*  reviewText: "", */
        reviewAuthor: "",
        footerText:
            "Noggrann flyttstädning med städgaranti i Gävle och Gävleborg.",
    },

    {
        id: "hemstadning",
        title: "Hemstädning | Mer tid i vardagen",
        category: "Städning",
        description:
            "Regelbunden hemstädning varje vecka, varannan vecka eller efter behov – anpassat efter ditt hem och din vardag.",
        icon: Home,
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
        color: "bg-slate-50",
        fullDescription:
            "Med regelbunden hemstädning blir det enklare att hålla hemmet rent utan att behöva lägga tiden själv. Vi anpassar upplägget efter bostaden, hur ofta du vill ha städning och vilka delar av hemmet som är viktigast för dig.",
        subDescription:
            "Du kan boka städning varje vecka, varannan vecka eller efter behov. Vid återkommande städning går vi igenom samma delar av bostaden och kan anpassa arbetet efter dina önskemål.",
        whyChooseTitle: "Varför välja Renovix Nordic för din hemstädning?",
        whyChooseDescription:
            "Vi fokuserar på en enkel och tydlig service där du vet vad som ingår och hur städningen är upplagd. Behoven kan förändras, därför kan upplägget anpassas över tid.",
        benefits: [
            "Veckovis eller varannan vecka",
            "Upplägg anpassat efter ditt hem",
            "Tydlig omfattning av städningen",
            "Ansvarsförsäkrad verksamhet",
            "Eget städmaterial kan ordnas",
            "RUT-avdrag när tjänsten är berättigad",
        ],
        processTitle: "Så kommer du igång",
        steps: [
            {
                step: "01",
                title: "Berätta om ditt hem",
                desc: "Du berättar om bostaden och hur ofta du vill ha städning.",
            },
            {
                step: "02",
                title: "Vi planerar upplägget",
                desc: "Vi kommer överens om omfattning, intervall och tid.",
            },
            {
                step: "03",
                title: "Regelbunden städning",
                desc: "Vi tar hand om städningen enligt det upplägg vi kommit överens om.",
            },
        ],
        sidebarTitle: "Vill du slippa tänka på städningen?",
        sidebarText:
            "Kontakta oss så går vi igenom ditt hem och tar fram ett upplägg som passar.",
        /* reviewText:
            "Fantastisk service! Kommer alltid i tid och gör ett grundligt jobb varje gång.", */
        reviewAuthor: "",
        footerText:
            "Regelbunden hemstädning anpassad efter din vardag i Gävle med omnejd.",
    },

    {
        id: "storstadning",
        title: "Storstädning | När hemmet behöver lite extra",
        category: "Städning",
        description:
            "En grundligare städning av hemmet med fokus på ytor som ofta inte hinns med i vardagen.",
        icon: Sparkles,
        image: "https://images.pexels.com/photos/4108712/pexels-photo-4108712.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-blue-50",
        fullDescription:
            "När den vanliga städningen inte räcker till kan en storstädning vara ett bra sätt att gå igenom hemmet mer grundligt. Vi rengör även ytor som ofta hamnar utanför den vanliga städningen.",
        subDescription:
            "Arbetet kan bland annat omfatta bakom och under vitvaror, golvlister, skåp, ugn och andra ytor beroende på bostadens behov och den omfattning vi kommer överens om.",
        whyChooseTitle: "Varför välja Renovix Nordic för storstädning?",
        whyChooseDescription:
            "Vi går igenom bostaden mer grundligt än vid vanlig hemstädning och fokuserar på detaljer och ytor som lätt glöms bort.",
        benefits: [
            "Grundligare rengöring av hemmet",
            "Fokus på ytor som ofta missas",
            "Passar inför exempelvis fest eller säsongsbyte",
            "Tydlig omfattning och pris",
            "Ansvarsförsäkrad verksamhet",
            "RUT-avdrag när tjänsten är berättigad",
        ],
        processTitle: "Så går storstädningen till",
        steps: [
            {
                step: "01",
                title: "Offert",
                desc: "Vi går igenom bostadens storlek och vad du vill ha hjälp med.",
            },
            {
                step: "02",
                title: "Vi städar grundligt",
                desc: "Vi arbetar oss igenom bostaden och fokuserar på de ytor som ingår.",
            },
            {
                step: "03",
                title: "Slutkontroll",
                desc: "Vi går igenom resultatet och ser till att arbetet är utfört enligt överenskommelsen.",
            },
        ],
        sidebarTitle: "Behöver hemmet en extra genomgång?",
        sidebarText:
            "Kontakta oss så berättar du vad du vill ha hjälp med, så tar vi fram en offert.",
        reviewAuthor: "",
        footerText: "Grundlig storstädning för hem i Gävle och Gävleborg.",
    },

    {
        id: "kontorsstadning",
        title: "Kontorsstädning | Anpassad efter er verksamhet",
        category: "Företag",
        description:
            "Regelbunden kontorsstädning som planeras efter era lokaler, arbetstider och behov.",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        color: "bg-blue-50",
        fullDescription:
            "Ett kontor behöver fungera både för personal och besökare. Vi erbjuder kontorsstädning som kan anpassas efter lokalens storlek, verksamhet och önskad städfrekvens.",
        subDescription:
            "Städningen kan exempelvis omfatta kontorsytor, kök, toaletter, golv och andra gemensamma ytor. Vi planerar arbetet tillsammans med er så att det passar verksamhetens arbetstider.",
        whyChooseTitle: "Varför välja Renovix Nordic för kontorsstädning?",
        whyChooseDescription:
            "Vi börjar med att gå igenom lokalen och era behov. Därefter tar vi fram ett upplägg med tydlig omfattning och städfrekvens.",
        benefits: [
            "Städning före eller efter arbetstid",
            "Upplägg anpassat efter lokalen",
            "Tydlig omfattning av arbetet",
            "Regelbunden städning",
            "Ansvarsförsäkrad verksamhet",
            "Offert efter genomgång av lokalen",
        ],
        processTitle: "Så kommer ni igång",
        steps: [
            {
                step: "01",
                title: "Genomgång",
                desc: "Vi går igenom lokalen och vad ni vill ha hjälp med.",
            },
            {
                step: "02",
                title: "Upplägg och offert",
                desc: "Vi föreslår frekvens och omfattning och lämnar en offert.",
            },
            {
                step: "03",
                title: "Regelbunden städning",
                desc: "Vi städar enligt det schema och upplägg vi kommit överens om.",
            },
        ],
        sidebarTitle: "Behöver ni hjälp med kontorsstädningen?",
        sidebarText:
            "Kontakta oss så går vi igenom lokalen och tar fram ett upplägg för er verksamhet.",
        reviewAuthor: "",
        footerText:
            "Kontorsstädning anpassad efter företag i Gävle och Gävleborg.",
    },
    {
        id: "fonsterputsning",
        title: "Fönsterputsning | Klara och rena fönster",
        category: "Fönsterputs",
        description:
            "Fönsterputsning för villa och lägenhet. Vi tar med material och rengör tillgängliga fönsterytor.",
        icon: Sparkles,
        image: "https://images.pexels.com/photos/4239145/pexels-photo-4239145.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-amber-50",
        fullDescription:
            "Smutsiga fönster påverkar både utsikten och ljusinsläppet. Vi hjälper till med fönsterputsning för villor och lägenheter och rengör de sidor och delar som ingår i uppdraget.",
        subDescription:
            "Vi kan rengöra fönsterglas, karmar och fönsterbleck beroende på uppdragets omfattning. Vi tar med det material och den utrustning som behövs för arbetet.",
        whyChooseTitle: "Varför välja Renovix Nordic för fönsterputsning?",
        whyChooseDescription:
            "Vi arbetar metodiskt med rätt redskap och lägger fokus på detaljer runt glaset, så att fönstren blir rena och fria från synlig smuts.",
        benefits: [
            "För villa och lägenhet",
            "In- och utsida efter överenskommelse",
            "Vi tar med städmaterial",
            "Rengöring av karmar och fönsterbleck efter behov",
            "Ansvarsförsäkrad verksamhet",
            "RUT-avdrag när tjänsten är berättigad",
        ],
        processTitle: "Så går fönsterputsningen till",
        steps: [
            {
                step: "01",
                title: "Offert",
                desc: "Berätta hur många fönster du har och hur de ska putsas.",
            },
            {
                step: "02",
                title: "Vi putsar",
                desc: "Vi rengör fönstren enligt den omfattning vi kommit överens om.",
            },
            {
                step: "03",
                title: "Klart",
                desc: "Vi går igenom arbetet och lämnar rena fönster efter oss.",
            },
        ],
        sidebarTitle: "Behöver du fönsterputsning?",
        sidebarText:
            "Skicka gärna antal fönster och information om bostaden så återkommer vi med en offert.",
        reviewAuthor: "",
        footerText:
            "Fönsterputsning för hem och fastigheter i Gävle med omnejd.",
    },
    {
        id: "trappstadning",
        title: "Trappstädning | Rena gemensamma ytor",
        category: "Företag",
        description:
            "Regelbunden städning av trapphus, entréer och andra gemensamma utrymmen enligt ett fast schema.",
        icon: Layers,
        image: "https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-slate-50",
        fullDescription:
            "Vi hjälper bostadsrättsföreningar och fastighetsägare att hålla gemensamma utrymmen rena och välskötta. Städningen planeras efter fastighetens behov och kan utföras enligt ett återkommande schema.",
        subDescription:
            "Trapphus, entréer, hissar och andra gemensamma ytor kan ingå beroende på fastighetens behov och den omfattning vi kommer överens om.",
        whyChooseTitle: "Varför välja Renovix Nordic för trappstädning?",
        whyChooseDescription:
            "Vi erbjuder ett tydligt och återkommande upplägg där städningen anpassas efter fastighetens storlek och användning.",
        benefits: [
            "Fast städschema",
            "Anpassat efter fastighetens behov",
            "Trapphus, entré och hiss efter överenskommelse",
            "Tydlig prissättning",
            "Ansvarsförsäkrad verksamhet",
            "Regelbunden uppföljning",
        ],
        processTitle: "Så går det till",
        steps: [
            {
                step: "01",
                title: "Genomgång av fastigheten",
                desc: "Vi går igenom vilka ytor som ska städas och hur ofta.",
            },
            {
                step: "02",
                title: "Offert och schema",
                desc: "Vi tar fram ett upplägg och en städfrekvens som passar fastigheten.",
            },
            {
                step: "03",
                title: "Regelbunden städning",
                desc: "Vi sköter de gemensamma ytorna enligt överenskommet schema.",
            },
        ],
        sidebarTitle: "Behöver er fastighet trappstädning?",
        sidebarText:
            "Kontakta oss för att gå igenom fastigheten och få en offert.",
        reviewAuthor: "",
        footerText:
            "Regelbunden trappstädning för BRF:er och fastighetsägare i Gävleborg.",
    },

    {
        id: "bortforsling",
        title: "Bortforsling | Möbler och grovsopor",
        category: "Bortforsling",
        description:
            "Vi hjälper till med hämtning, lastning och transport av möbler, grovsopor och annat som behöver köras bort.",
        icon: Trash2,
        image: "https://images.pexels.com/photos/761297/pexels-photo-761297.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-blue-50",
        fullDescription:
            "Har du möbler, grovsopor eller annat som behöver köras bort? Vi hjälper till med hämtning och transport så att du slipper ordna allt själv.",
        subDescription:
            "Vi hämtar det som ska bort, sköter lastningen och transporterar det vidare. Vad som kan hämtas och hur det hanteras beror på material och uppdragets omfattning.",
        whyChooseTitle: "Varför välja Renovix Nordic för bortforsling?",
        whyChooseDescription:
            "Du slipper ordna transport och tunga lyft själv. Vi kommer till platsen och tar hand om det som ska köras bort.",
        benefits: [
            "Hämtning av möbler och grovsopor",
            "Tunga lyft och lastning",
            "Transport till avsedd plats",
            "Enkel bokning",
            "Ansvarsförsäkrad verksamhet",
            "Offert baserad på mängd och avstånd",
        ],
        processTitle: "Så går bortforslingen till",
        steps: [
            {
                step: "01",
                title: "Beskriv vad som ska bort",
                desc: "Skicka gärna bilder och information om mängden.",
            },
            {
                step: "02",
                title: "Offert",
                desc: "Vi bedömer uppdragets omfattning och återkommer med ett pris.",
            },
            {
                step: "03",
                title: "Hämtning och transport",
                desc: "Vi hämtar, lastar och transporterar det som ska köras bort.",
            },
        ],
        sidebarTitle: "Har du något som behöver köras bort?",
        sidebarText:
            "Skicka en beskrivning eller bilder på det som ska hämtas så återkommer vi med en offert.",
        reviewAuthor: "",
        footerText:
            "Smidig bortforsling av möbler och grovsopor i Gävle med omnejd.",
    },

    {
        id: "grasklippning",
        title: "Gräsklippning | För en välskött gräsmatta",
        category: "Underhåll",
        description:
            "Regelbunden gräsklippning under säsongen, anpassad efter gräsmattans behov och önskat intervall.",
        icon: Scissors,
        image: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&q=80&w=800",
        color: "bg-green-50",
        fullDescription:
            "Vi hjälper dig att hålla gräsmattan klippt och välskött under säsongen. Du kan boka regelbunden klippning eller hjälp vid enstaka tillfällen beroende på behov.",
        subDescription:
            "Vi klipper gräsmattan och kan även hjälpa till med kanter och borttagning av gräsklipp beroende på vad vi kommer överens om.",
        whyChooseTitle: "Varför välja Renovix Nordic för gräsklippning?",
        whyChooseDescription:
            "Vi anpassar intervallen efter gräsmattans behov och ser till att arbetet utförs enligt det upplägg vi kommit överens om.",
        benefits: [
            "Regelbunden gräsklippning",
            "Flexibla intervaller",
            "Klippning efter gräsmattans behov",
            "Kantskärning efter överenskommelse",
            "Ansvarsförsäkrad verksamhet",
            "RUT-avdrag när tjänsten är berättigad",
        ],
        processTitle: "Så går gräsklippningen till",
        steps: [
            {
                step: "01",
                title: "Offert",
                desc: "Vi bedömer gräsmattans storlek och vilket intervall du behöver.",
            },
            {
                step: "02",
                title: "Vi planerar",
                desc: "Vi kommer överens om intervall och upplägg under säsongen.",
            },
            {
                step: "03",
                title: "Gräsmattan sköts",
                desc: "Vi kommer enligt överenskommelse och tar hand om klippningen.",
            },
        ],
        sidebarTitle: "Behöver du hjälp med gräsmattan?",
        sidebarText:
            "Kontakta oss för en offert på gräsklippning i Gävle med omnejd.",
        reviewAuthor: "",
        footerText:
            "Gräsklippning och enklare trädgårdsunderhåll i Gävle med omnejd.",
    },
];

import imageOne from "@/public/images/flytt/soderhamn/imageOne.jpg";
import imageTwo from "@/public/images/flytt/soderhamn/imageTwo.jpg";
import imageThree from "@/public/images/flytt/soderhamn/imageThree.jpg";
import imageFour from "@/public/images/flytt/soderhamn/imageFour.jpg";
import imageFive from "@/public/images/flytt/soderhamn/imageFive.jpg";
import imageSix from "@/public/images/flytt/soderhamn/imageSix.jpg";
import imageSeven from "@/public/images/flytt/soderhamn/imageSeven.jpg";
import imageEight from "@/public/images/flytt/soderhamn/imageEight.jpg";
import imageNine from "@/public/images/flytt/soderhamn/imageNine.jpg";

import ljusneOne from "@/public/images/flytt/ljusne/ljusneOne.jpg";
import ljusneTwo from "@/public/images/flytt/ljusne/ljusneTwo.jpg";
import ljusneThree from "@/public/images/flytt/ljusne/ljusneThree.jpg";
import ljusneFour from "@/public/images/flytt/ljusne/ljusneFour.jpg";

import akutOne from "@/public/images/akut/akutOne.jpg";
import akutTwo from "@/public/images/akut/akutTwo.jpg";
import akutThree from "@/public/images/akut/akutThree.jpg";
import akutFour from "@/public/images/akut/akutFour.jpg";
import akutFive from "@/public/images/akut/akutFive.jpg";
import akutSix from "@/public/images/akut/akutSix.jpg";
import akutSeven from "@/public/images/akut/akutSeven.jpg";
import akutEight from "@/public/images/akut/akutEight.jpg";

export const portfolioItems = [
    {
        id: "fonsterputsning-gavle-lagenhet",
        order: 1,
        title: "Fönsterputsning i lägenhet",
        category: "Fönsterputsning",
        image: outsideAfter,
        /*  beforeImage: outsideBefore,
        afterImage: insideAfter, */
        description:
            "Fönsterputsning av en lägenhet i Gävle, med rengöring av fönster både invändigt och utvändigt.",
        fullDescription:
            "Vi utförde fönsterputsning av en lägenhet i Gävle. Fönstren rengjordes invändigt och utvändigt med fokus på glas, karmar och bågar. Arbetet genomfördes med professionella redskap och avslutades med en kontroll av resultatet.",
    },
    {
        id: "flyttstadning-at-samarbetspartner",
        order: 2,
        title: "Flyttstädning åt samarbetspartner",
        category: "Flyttstädning",
        image: ljusneOne,
        description:
            "Flyttstädning i Ljusne med fokus på kök, badrum, golv och övriga ytor inför överlämning.",
        fullDescription:
            "Vi utförde en komplett flyttstädning åt en samarbetspartner i Ljusne. Bostaden rengjordes enligt överenskommen omfattning med fokus på kök, badrum, förvaring, golv och andra ytor som behöver vara rena inför en överlämning.",
    },
    {
        id: "flyttstadning-soderhamn-120kvm",
        order: 3,
        title: "Flyttstädning av 120 kvm i Söderhamn",
        category: "Flyttstädning",
        image: imageOne,
        description:
            "Komplett flyttstädning av en bostad på 120 kvm i Söderhamn, inklusive fönsterputsning.",
        fullDescription:
            "Vi utförde en komplett flyttstädning av en bostad på 120 kvm i Söderhamn. Arbetet omfattade bland annat kök, badrum, golv, lister, skåp, vitvaror och fönster. Städningen genomfördes enligt vår checklista och avslutades med en genomgång av bostaden.",
    },
    {
        id: "akutstadning-jouruppdrag",
        order: 4,
        title: "Akutstädning – Jouruppdrag",
        category: "Städning",
        image: akutOne,
        location: "Gävleborg",
        description:
            "Akut städuppdrag där en bostad behövde rengöras efter omfattande nedsmutsning.",
        fullDescription:
            "Vi fick ett akut städuppdrag med kort varsel där en bostad behövde rengöras efter omfattande nedsmutsning. Bland annat hade kaffe stänkt på väggar och andra ytor. Vi gick igenom de berörda ytorna och rengjorde bostaden så att den åter kunde användas.",
    },
];

/**
 * Bildgalleri per portfolio-projekt, nyckeln MÅSTE matcha id:t i portfolioItems ovan.
 * OBS: Detta är en fast lista (ingen dynamisk fallback-logik) – varje projekt som
 * finns i portfolioItems bör ha en egen post här.
 */
export const projectGalleries: Record<
    string,
    { src: StaticImageData; caption: string }[]
> = {
    "fonsterputsning-gavle-lagenhet": [
        {
            src: outsideBefore,
            caption: "Fönsterputsning – Före",
        },
        {
            src: insideBefore,
            caption: "Fönsterputsning – Invändigt före",
        },
        {
            src: insideAfter,
            caption: "Fönsterputsning – Invändigt efter",
        },
    ],
    "flyttstadning-soderhamn-120kvm": [
        {
            src: imageTwo,
            caption: "Flyttstädning – Rengöring av vardagsrum och kök",
        },
        {
            src: imageThree,
            caption: "Flyttstädning – Rengöring av vitvaror och trappor",
        },
        {
            src: imageFour,
            caption:
                "Flyttstädning – Noggrann rengöring av badrum, speglar och förvaring",
        },
        {
            src: imageFive,
            caption:
                "Flyttstädning – Rengöring av ugn, mikrovågsugn och köksskåp",
        },
        {
            src: imageSix,
            caption:
                "Flyttstädning – Rengöring av duschkabin, toalett och badrumsytor",
        },
        {
            src: imageSeven,
            caption: "Flyttstädning – Komplett rengöring av badrum",
        },
        {
            src: imageEight,
            caption: "Flyttstädning – Detaljrengöring av ugn, skåp och hyllor",
        },
        {
            src: imageNine,
            caption:
                "Flyttstädning – Fönsterputsning och rengöring av fönsterbänkar",
        },
    ],
    "flyttstadning-at-samarbetspartner": [
        {
            src: ljusneTwo,
            caption: "Flyttstädning – Rengöring av kök, skåp samt kyl och frys",
        },
        {
            src: ljusneThree,
            caption:
                "Flyttstädning – Noggrann rengöring av badrum, dusch och toalett",
        },
        {
            src: ljusneFour,
            caption:
                "Flyttstädning – Rengöring av golv, lister och fönsterbänkar",
        },
    ],
    "akutstadning-jouruppdrag": [
        {
            src: akutOne,
            caption: "Akutstädning – Före: Kaffefläckar på vägg",
        },
        {
            src: akutTwo,
            caption: "Akutstädning – Efter: Väggen rengjord",
        },
        {
            src: akutThree,
            caption:
                "Akutstädning – Före: Kaffefläckar på dörrar och övriga ytor",
        },
        {
            src: akutFour,
            caption:
                "Akutstädning – Efter: Noggrann rengöring av dörrar och övriga ytor",
        },
        {
            src: akutFive,
            caption: "Akutstädning – Före: Kaffefläckar på vägg",
        },
        {
            src: akutSix,
            caption: "Akutstädning – Efter: Väggen rengjord och återställd",
        },
        {
            src: akutSeven,
            caption: "Akutstädning – Före: Kaffefläckar på dörrkarm och golv",
        },
        {
            src: akutEight,
            caption:
                "Akutstädning – Efter: Noggrann rengöring av dörrkarm och golv",
        },
    ],
};

export interface ProjectDetail {
    // Projektfakta
    jobType?: string;
    scope?: string;
    location?: string;
    completed?: string;
    guarantee?: string;
    rut?: string;

    // Utmaning
    challengeBadge?: string;
    challengeTitle?: string;
    challenge?: string;

    // Lösning
    solutionBadge?: string;
    solutionTitle?: string;
    solution?: string;

    // Resultat
    highlightsTitle?: string;
    highlights?: string[];

    // Standard
    standardsTitle?: string;
    standards?: {
        icon: "award" | "clock" | "briefcase" | "shield" | "check";
        text: string;
    }[];
}

/**
 * Detaljerad projektinformation per portfolio-projekt, nyckeln MÅSTE matcha
 * id:t i portfolioItems ovan.
 */
export const projectDetails: Record<string, ProjectDetail> = {
    "fonsterputsning-gavle-lagenhet": {
        jobType: "Fönsterputsning",
        scope: "Fönsterputsning av lägenhet med rengöring av fönster invändigt och utvändigt.",
        location: "Gävle",
        completed: "Maj 2026",
        guarantee: "Kvalitetskontroll",
        rut: "RUT när tjänsten är berättigad",
        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Rena fönster",
            "Rengjorda karmar och bågar",
            "Noggrant arbete på varje fönster",
            "Bättre sikt genom rena glasytor",
        ],
    },

    "flyttstadning-soderhamn-120kvm": {
        jobType: "Flyttstädning",
        scope: "Komplett flyttstädning av en bostad på 120 kvm inklusive fönsterputsning.",
        location: "Söderhamn",
        completed: "Juni 2026",
        guarantee: "Städgaranti",
        rut: "RUT när tjänsten är berättigad",

        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Flyttstädning enligt tydlig checklista",
            "Noggrant rengjort kök och badrum",
            "Rengöring av vitvaror och skåp",
            "Fönsterputsning ingick i uppdraget",
        ],

        challengeBadge: "Utmaning & Behov",
        challengeTitle: "Vad krävdes för uppdraget?",
        challenge:
            "Inför överlämningen behövde hela bostaden rengöras noggrant. Uppdraget omfattade samtliga rum samt kök, badrum, vitvaror, skåp, fönster och andra detaljer som behöver gås igenom vid en flyttstädning.",

        solutionBadge: "Vår Lösning",
        solutionTitle: "Hur gick vi tillväga?",
        solution:
            "Vi följde en strukturerad checklista och arbetade systematiskt genom hela bostaden. Kök, badrum, vitvaror, skåp, golv, lister och fönster rengjordes innan en slutlig genomgång av arbetet.",

        standardsTitle: "Vår Standard",
        standards: [
            {
                icon: "award",
                text: "Noggrant arbete med fokus på detaljer",
            },
            {
                icon: "clock",
                text: "Effektivt genomförande enligt överenskommelse",
            },
            {
                icon: "shield",
                text: "Städgaranti för en tryggare överlämning",
            },
        ],
    },

    "flyttstadning-at-samarbetspartner": {
        jobType: "Flyttstädning",
        scope: "Komplett flyttstädning av bostad med fokus på samtliga ytor.",
        location: "Ljusne",
        completed: "Juni 2026",
        guarantee: "Kvalitetssäkrat arbete",
        rut: "RUT när tjänsten är berättigad",

        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Noggrant rengjord bostad",
            "Rengöring av kök och badrum",
            "Fokus på lister, skåp och andra detaljer",
            "Arbetet utfördes enligt överenskommen omfattning",
        ],

        challengeBadge: "Utmaning & Behov",
        challengeTitle: "Vad krävdes för uppdraget?",
        challenge:
            "Bostaden behövde lämnas i ett välstädat skick inför nästa steg i flytten. Uppdraget omfattade hela bostaden med extra fokus på kök, badrum, förvaring och andra ytor där smuts lätt samlas.",

        solutionBadge: "Vår Lösning",
        solutionTitle: "Hur gick vi tillväga?",
        solution:
            "Vi arbetade systematiskt genom bostaden enligt en strukturerad checklista. Samtliga överenskomna ytor rengjordes noggrant innan arbetet avslutades med en genomgång.",

        standardsTitle: "Vår Standard",
        standards: [
            {
                icon: "award",
                text: "Noggrant arbete med fokus på kvalitet",
            },
            {
                icon: "clock",
                text: "Effektiv planering och genomförande",
            },
            {
                icon: "shield",
                text: "Tryggt och professionellt genomförande",
            },
        ],
    },
    "akutstadning-jouruppdrag": {
        jobType: "Akutstädning",
        scope: "Akut städuppdrag efter omfattande nedsmutsning.",
        location: "Gävle",
        completed: "Juli 2026",
        guarantee: "Akut insats",

        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Uppdrag med kort varsel",
            "Rengöring av kaffefläckar på väggar",
            "Rengöring av dörrar och andra ytor",
            "Bostaden återställd till ett rent skick",
        ],
    },
};

export function getSortedPortfolioItems() {
    return [...portfolioItems].sort((a, b) => {
        const orderA = a.order ?? -Infinity;
        const orderB = b.order ?? -Infinity;

        return orderB - orderA;
    });
}
