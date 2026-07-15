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
        title: "Flyttstädning med garanti",
        category: "Flyttstädning",
        description:
            "Godkänd vid besiktning – annars kommer vi tillbaka och åtgärdar det, helt kostnadsfritt. Du slipper oroa dig, vi tar hela ansvaret.",
        icon: Truck,
        image: "https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-blue-50",
        fullDescription:
            "Slipp flyttstressen och låt proffsen ta hand om städningen. Vi erbjuder marknadens mest noggranna flyttstädning i Gävle och hela Gävleborg, utförd enligt strikt mäklarstandard – alltid med full nöjdhetsgaranti.",
        subDescription:
            "Vårt team rengör allt från grunden: kök, badrum, bakom vitvaror, element och inuti alla skåp. Vi lämnar inget åt slumpen. Skoulde något mot förmodan inte godkännas vid besiktning, åtgärdar vi det omedelbart utan extra kostnad.",
        whyChooseTitle: "Varför välja Renovix Nordic för din flyttstädning?",
        whyChooseDescription:
            "Vi förstår vikten av en godkänd besiktning. Därför arbetar vi med checklistor som täcker varje hörn av din bostad, kombinerat med lokal expertis och ett genuint engagemang för kvalitet.",
        benefits: [
            "Gävleborgs ledande experter på flyttstädning",
            "Fullständig besiktningsgaranti (100%)",
            "Noggrannhet som tål att granskas",
            "Miljövänliga rengöringsmetoder",
            "Ansvarsförsäkring för din trygghet",
            "Snabba bokningar och fasta priser",
        ],
        processTitle: "Din väg till en smidig flytt",
        steps: [
            {
                step: "01",
                title: "Snabb Offert",
                desc: "Få ett fast pris direkt baserat på din bostadsyta.",
            },
            {
                step: "02",
                title: "Proffsen anländer",
                desc: "Vi utför städningen med fokus på varje detalj i checklistan.",
            },
            {
                step: "03",
                title: "Godkänd Besiktning",
                desc: "Vi garanterar att städningen godkänns – tryggt och enkelt.",
            },
        ],
        sidebarTitle: "Redo för en stressfri flytt?",
        sidebarText:
            "Låt oss säkra din besiktning. Kontakta oss för en kostnadsfri offert redan idag.",
        /*  reviewText: "", */
        reviewAuthor: "Nöjd kund i Gävle",
        footerText:
            "Trygg flyttstädning med fast pris och garanti i hela Gävleborg.",
    },

    {
        id: "hemstadning",
        title: "Hemstädning – Mer tid för livet",
        category: "Städning",
        description:
            "Varannan vecka, varje vecka eller vid behov – du bestämmer. Samma noggranna städare varje gång, så du alltid vet vad du får.",
        icon: Home,
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
        color: "bg-slate-50",
        fullDescription:
            "Unna dig lyxen av ett ständigt rent hem. Med vår hemstädning i Gävle får du en personlig service där vi fokuserar på de detaljer som betyder mest för dig. Vi skapar ordning och reda så att du kan njuta av din fritid fullt ut.",
        subDescription:
            "Du väljer själv hur ofta vi kommer – varje vecka, varannan vecka eller var fjärde vecka. Samma städare besöker ditt hem varje gång, vilket skapar trygghet och gör att inget missas över tid.",
        whyChooseTitle: "Varför välja Renovix Nordic för din hemstädning?",
        whyChooseDescription:
            "Vi tror på personlig service och kontinuitet. Därför får du samma städare vid varje besök – någon som lär känna ditt hem och dina önskemål över tid.",
        benefits: [
            "Samma städare vid varje besök",
            "Flexibla intervaller efter din vardag",
            "Ingen bindningstid – pausa eller avsluta när du vill",
            "Miljövänliga rengöringsmedel",
            "Fullt försäkrad städpersonal",
            "RUT-avdrag direkt på fakturan",
        ],
        processTitle: "Så enkelt kommer du igång",
        steps: [
            {
                step: "01",
                title: "Kostnadsfri offert",
                desc: "Berätta om ditt hem och önskad frekvens, så får du ett fast pris.",
            },
            {
                step: "02",
                title: "Vi planerar ditt schema",
                desc: "Du väljer dag och tid som passar din vardag bäst.",
            },
            {
                step: "03",
                title: "Njut av ett rent hem",
                desc: "Samma pålitliga städare kommer och går – utan att du behöver tänka på det.",
            },
        ],
        sidebarTitle: "Redo för mer tid till det som betyder något?",
        sidebarText:
            "Kontakta oss för en skräddarsydd offert på hemstädning i Gävle.",
        /* reviewText:
            "Fantastisk service! Kommer alltid i tid och gör ett grundligt jobb varje gång.", */
        reviewAuthor: "Nöjd kund i Gävle",
        footerText:
            "Regelbunden hemstädning med fast pris och samma städare varje gång.",
    },

    {
        id: "storstadning",
        title: "Storstädning – En total nystart för ditt hem",
        category: "Städning",
        description:
            "Vi tar allt du inte hinner med – bakom vitvaror, ugn, golvlister. Perfekt inför fest eller en nystart.",
        icon: Sparkles,
        image: "https://images.pexels.com/photos/4108712/pexels-photo-4108712.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-blue-50",
        fullDescription:
            "När vardagsstädningen inte räcker till är vår storstädning lösningen. Vi går på djupet och rengör ytor som ofta glöms bort. Ge ditt hem den kärlek det förtjänar och upplev känslan av ett helt nytt hem.",
        subDescription:
            "Vi rengör bakom vitvaror, inuti ugn och skåp, längs golvlister och i alla hörn som lätt missas i vardagen. Perfekt inför fest, säsongsbyte eller bara när det är dags för en ordentlig nystart.",
        whyChooseTitle: "Varför välja Renovix Nordic för storstädning?",
        whyChooseDescription:
            "Vi går igenom hela hemmet med en grundlig checklista, inklusive de ytor som ofta glöms bort i vardagen – bakom vitvaror, i skåp och längs golvlister.",
        benefits: [
            "Djupgående rengöring av hela hemmet",
            "Fokus på ytor som ofta missas",
            "Perfekt inför fest, flytt eller säsongsbyte",
            "Fasta priser utan överraskningar",
            "Ansvarsförsäkrad personal",
            "RUT-avdrag direkt på fakturan",
        ],
        processTitle: "Så går storstädningen till",
        steps: [
            {
                step: "01",
                title: "Snabb offert",
                desc: "Vi ger dig ett fast pris baserat på bostadens storlek och behov.",
            },
            {
                step: "02",
                title: "Grundlig genomgång",
                desc: "Vi rengör hela hemmet enligt vår detaljerade checklista.",
            },
            {
                step: "03",
                title: "Ett hem som känns nytt",
                desc: "Du kommer hem till en total nystart, redo att njutas av.",
            },
        ],
        sidebarTitle: "Dags för en riktig nystart?",
        sidebarText: "Boka en storstädning och känn skillnaden i varje rum.",
        /*  reviewText:
            "Otroligt resultat! Hemmet kändes helt nytt efteråt, även bakom vitvarorna.", */
        reviewAuthor: "Nöjd kund i Sandviken",
        footerText: "Grundlig storstädning med fast pris i hela Gävleborg.",
    },

    {
        id: "fonsterputsning",
        title: "Professionell Fönsterputs – Kristallklar utsikt",
        category: "Fönsterputs",
        description:
            "Skitiga fönster efter vintern? Vi putsar in- och utsida, ränder och kalkfläckar bort. Eget material, inget du behöver ordna.",
        icon: Sparkles,
        image: "https://images.pexels.com/photos/4239145/pexels-photo-4239145.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-amber-50",
        fullDescription:
            "Låt solen skina in genom perfekt putsade fönster. Vi erbjuder professionell fönsterputs i Gävleborg för både villor och lägenheter. Med rätt teknik och utrustning garanterar vi ett resultat utan ränder eller fläckar.",
        subDescription:
            "Vi putsar alla tillgängliga sidor, tar bort hårt sittande smuts, pollen och kalkfläckar samt torkar av karmar och fönsterbleck. Vi tar med allt material – du behöver inte förbereda något.",
        whyChooseTitle: "Varför välja Renovix Nordic för fönsterputsning?",
        whyChooseDescription:
            "Vi använder professionella redskap och teknik för ett ränderfritt resultat, oavsett väder eller fönstertyp. Du behöver inte ordna något själv.",
        benefits: [
            "100% ränderfritt resultat garanterat",
            "In- och utsida ingår alltid",
            "Eget material och professionell utrustning",
            "Snabb och effektiv utförande",
            "Ansvarsförsäkrad personal",
            "RUT-avdrag direkt på fakturan",
        ],
        processTitle: "Så går fönsterputsningen till",
        steps: [
            {
                step: "01",
                title: "Snabb offert",
                desc: "Berätta hur många fönster du har, så får du ett fast pris.",
            },
            {
                step: "02",
                title: "Vi putsar på plats",
                desc: "Alla sidor rengörs noggrant med professionell utrustning.",
            },
            {
                step: "03",
                title: "Kristallklart resultat",
                desc: "Du sitter kvar med ränderfria fönster och mer ljus i hemmet.",
            },
        ],
        sidebarTitle: "Redo för klarare fönster?",
        sidebarText: "Boka fönsterputsning i Gävleborg redan idag.",
        /*   reviewText:
            "Helt ränderfritt och superblankt. Skillnaden var enorm direkt.", */
        reviewAuthor: "Nöjd kund i Gävle",
        footerText: "Professionell fönsterputsning med fast pris och garanti.",
    },

    {
        id: "kontorsstadning",
        title: "Kontorsstädning – För en produktiv arbetsplats",
        category: "Företag",
        description:
            "Vi städar innan eller efter arbetstid, så det aldrig stör verksamheten. Kök, toaletter, skrivbord och golv – allt enligt ett schema som passar er.",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        color: "bg-blue-50",
        fullDescription:
            "En ren arbetsmiljö är nyckeln till framgång. Vi levererar skräddarsydd kontorsstädning i Gävle som möter era höga krav på hygien och estetik. Vi arbetar diskret och effektivt för att skapa en inspirerande miljö för era anställda.",
        subDescription:
            "Vi städar kök, toaletter, skrivbord och golv enligt ett fast schema, utanför er ordinarie arbetstid. Ni får en pålitlig samarbetspartner som ser till att kontoret alltid är representativt.",
        whyChooseTitle: "Varför välja Renovix Nordic för kontorsstädning?",
        whyChooseDescription:
            "Vi anpassar oss efter er verksamhet och städar utanför ordinarie arbetstid, så att era anställda alltid möts av en ren och inspirerande arbetsplats.",
        benefits: [
            "Städning innan eller efter arbetstid",
            "Skräddarsytt schema efter er verksamhet",
            "Diskret och professionellt bemötande",
            "Fast avtal med tydlig prissättning",
            "Fullt försäkrad personal",
            "Samma team vid varje besök",
        ],
        processTitle: "Så kommer ni igång",
        steps: [
            {
                step: "01",
                title: "Kostnadsfri genomgång",
                desc: "Vi besöker er lokal och tar fram ett skräddarsytt förslag.",
            },
            {
                step: "02",
                title: "Fast schema sätts upp",
                desc: "Vi städar enligt en tid som inte stör er verksamhet.",
            },
            {
                step: "03",
                title: "En arbetsplats att vara stolt över",
                desc: "Rent och representativt, varje dag.",
            },
        ],
        sidebarTitle: "Vill ni ha en renare arbetsplats?",
        sidebarText: "Kontakta oss för ett skräddarsytt avtal för ert kontor.",
        /* reviewText:
            "Pålitliga och grundliga. Vårt kontor har aldrig känts så fräscht.", */
        reviewAuthor: "Nöjd företagskund i Gävle",
        footerText:
            "Professionell kontorsstädning med fast avtal i hela Gävleborg.",
    },

    {
        id: "trappstadning",
        title: "Trappstädning – Trivsel för hela fastigheten",
        category: "Företag",
        description:
            "Vi städar trapphus, hissar och entréer enligt fast schema. Rent och välkomnande för alla som bor eller arbetar i fastigheten.",
        icon: Layers,
        image: "https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-slate-50",
        fullDescription:
            "Första intrycket börjar i entrén. Vi hjälper BRF:er och fastighetsägare i Gävleborg å hålla trapphusen skinande rena. En ren miljö minskar slitaget och skapar trygghet för alla som rör sig i byggnaden.",
        subDescription:
            "Vi städar trapphus, hissar, entréer och tvättstuga enligt ett fast schema som passar er fastighet. Regelbunden skötsel som håller gemensamma utrymmen fräscha året runt.",
        whyChooseTitle: "Varför välja Renovix Nordic för trappstädning?",
        whyChooseDescription:
            "Vi hjälper BRF:er och fastighetsägare att hålla gemensamma utrymmen rena och välkomnande, enligt ett fast och pålitligt schema.",
        benefits: [
            "Fast schema anpassat efter fastigheten",
            "Städning av trapphus, hiss och entré",
            "Minskat slitage och ökad trivsel",
            "Tydlig prissättning för BRF och fastighetsägare",
            "Fullt försäkrad personal",
            "Samma team vid varje besök",
        ],
        processTitle: "Så går det till",
        steps: [
            {
                step: "01",
                title: "Kostnadsfri offert",
                desc: "Vi ser över fastighetens behov och ger ett fast pris.",
            },
            {
                step: "02",
                title: "Fast städschema",
                desc: "Vi städar regelbundet enligt överenskommen frekvens.",
            },
            {
                step: "03",
                title: "Ett välkomnande trapphus",
                desc: "Rent och tryggt för alla som bor eller arbetar i fastigheten.",
            },
        ],
        sidebarTitle: "Vill ni ha ett renare trapphus?",
        sidebarText:
            "Kontakta oss för en offert på trappstädning för er fastighet.",
        /*  reviewText:
            "Alltid rent och fräscht i trapphuset sedan vi bytte till Renovix Nordic.", */
        reviewAuthor: "BRF-ordförande i Gävle",
        footerText: "Pålitlig trappstädning med fast schema i hela Gävleborg.",
    },

    {
        id: "bortforsling",
        title: "Bortforsling – vi tar hand om det du inte vill",
        category: "Bortforsling",
        description:
            "Vi hämtar möbler, skräp och grovsopor och sorterar allt enligt gällande regler. Du slipper köra till återvinningen själv.",
        icon: Trash2,
        image: "https://images.pexels.com/photos/761297/pexels-photo-761297.jpeg?auto=compress&cs=tinysrgb&w=800",
        color: "bg-blue-50",
        fullDescription:
            "Har du samlat på dig saker du inte längre behöver? Vi hjälper dig att rensa ut i Gävle. Vi sköter allt från tunga lyft till transport och korrekt sortering på återvinningscentralen. Enkelt för dig, bra för miljön.",
        subDescription:
            "Vi hämtar möbler, skräp och grovsopor direkt hos dig, sköter alla tunga lyft och ser till att allt sorteras och lämnas korrekt på återvinningscentralen.",
        whyChooseTitle: "Varför välja Renovix Nordic för bortforsling?",
        whyChooseDescription:
            "Vi tar hand om de tunga lyften och sköter sorteringen korrekt, så att du slipper både jobbet och oron för miljön.",
        benefits: [
            "Vi hämtar möbler, skräp och grovsopor",
            "Korrekt sortering och återvinning",
            "Inga tunga lyft för dig",
            "Snabb bokning och fasta priser",
            "Ansvarsförsäkrad personal",
            "Miljösmart hantering",
        ],
        processTitle: "Så går bortforslingen till",
        steps: [
            {
                step: "01",
                title: "Snabb offert",
                desc: "Berätta vad som ska bort, så får du ett fast pris.",
            },
            {
                step: "02",
                title: "Vi hämtar och lastar",
                desc: "Vårt team sköter alla tunga lyft åt dig.",
            },
            {
                step: "03",
                title: "Korrekt sortering",
                desc: "Allt transporteras och sorteras enligt gällande miljöregler.",
            },
        ],
        sidebarTitle: "Vill du få en yta fri?",
        sidebarText: "Kontakta oss för en offert på bortforsling i Gävleborg.",
        /*  reviewText:
            "Superenkelt och snabbt. De tog hand om allt, jag behövde inte lyfta ett finger.", */
        reviewAuthor: "Nöjd kund i Gävle",
        footerText: "Smidig bortforsling med fast pris i hela Gävleborg.",
    },

    {
        id: "grasklippning",
        title: "Gräsklippning – En perfekt grön matta",
        category: "Underhåll",
        description:
            "Vi håller din trädgård i toppskick hela säsongen. Professionell skötsel med öga för detaljer.",
        icon: Scissors,
        image: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&q=80&w=800",
        color: "bg-green-50",
        fullDescription:
            "Njut av en välskött gräsmatta utan att lyfta ett finger. Vi erbjuder regelbunden gräsklippning i Gävleborg med professionella maskiner som ger ett jämnt och snyggt resultat varje gång.",
        subDescription:
            "Du väljer intervall under säsongen – varje vecka, varannan vecka eller efter behov. Vi sköter klippning, kantskärning och bortforsling av gräsklipp.",
        whyChooseTitle: "Varför välja Renovix Nordic för gräsklippning?",
        whyChooseDescription:
            "Vi håller din trädgård i toppskick hela säsongen med professionella maskiner och ett öga för detaljer, så att du kan njuta av en snygg gräsmatta utan besväret.",
        benefits: [
            "Regelbunden klippning hela säsongen",
            "Professionella maskiner för jämnt resultat",
            "Kantskärning och bortforsling ingår",
            "Flexibla intervaller efter dina behov",
            "Ansvarsförsäkrad personal",
            "RUT-avdrag direkt på fakturan",
        ],
        processTitle: "Så går gräsklippningen till",
        steps: [
            {
                step: "01",
                title: "Kostnadsfri offert",
                desc: "Berätta om din gräsmatta och önskat intervall, så får du ett fast pris.",
            },
            {
                step: "02",
                title: "Fast klippschema",
                desc: "Vi kommer enligt överenskommen frekvens under säsongen.",
            },
            {
                step: "03",
                title: "En prydlig gräsmatta",
                desc: "Du njuter av resultatet – vi sköter resten.",
            },
        ],
        sidebarTitle: "Vill du ha en snyggare gräsmatta?",
        sidebarText: "Kontakta oss för en offert på gräsklippning i Gävleborg.",
        /* reviewText:
            "Jämnt och proffsigt klippt varje gång. Slipper helt tänka på gräsmattan nu.", */
        reviewAuthor: "Nöjd kund i Gävle",
        footerText: "Regelbunden gräsklippning med fast pris i hela Gävleborg.",
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

export const portfolioItems = [
    {
        id: "fonsterputsning-gavle-lagenhet",
        order: 1,
        title: "Professionell Fönsterputsning",
        category: "Fönsterputsning",
        image: outsideAfter,
        /*  beforeImage: outsideBefore,
        afterImage: insideAfter, */
        description:
            "Vi utförde en noggrann fönsterputsning där samtliga fönster rengjordes invändigt och utvändigt",
        fullDescription:
            "Vi utförde en noggrann fönsterputsning där samtliga fönster rengjordes invändigt och utvändigt, inklusive karmar och bågar. Med professionella metoder lämnades fönstren helt fria från smuts, ränder och kalkfläckar, vilket gav ett klart och skinande resultat.",
    },
    {
        id: "flyttstadning-at-samarbetspartner",
        order: 2,
        title: "Flyttstädning åt samarbetspartner",
        category: "Flyttstädning",
        image: ljusneOne,
        description:
            "Genomförd flyttstädning åt en samarbetspartner med fokus på kvalitet, noggrannhet och ett professionellt resultat.",
        fullDescription:
            "Vi utförde en komplett flyttstädning åt en samarbetspartner där bostadens samtliga ytor rengjordes enligt överenskomna kvalitetskrav och checklista. Arbetet genomfördes noggrant och effektivt med stort fokus på detaljer för att säkerställa ett professionellt slutresultat.",
    },
    {
        id: "flyttstadning-soderhamn-120kvm",
        order: 3,
        title: "Flyttstädning av lägenhet – 120 kvm i Söderhamn",
        category: "Flyttstädning",
        image: imageOne,
        description:
            "Noggrant utförd flyttstädning av en lägenhet på 120 kvm med fönsterputsning och städgaranti.",
        fullDescription:
            "Vi utförde en komplett flyttstädning av en lägenhet på 120 kvm där samtliga rum rengjordes enligt en noggrann checklista. Kök, badrum, golv, lister, skåp, vitvaror och fönster putsades omsorgsfullt för att lämna bostaden i bästa möjliga skick. Arbetet avslutades med vår städgaranti för kundens trygghet.",
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
            caption: "Fönsterputsning – Invändigt Före",
        },
        {
            src: insideAfter,
            caption: "Fönsterputsning – Invändigt Efter",
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
        jobType: "Professionell Fönsterputsning",
        scope: "Historisk fastighet med över 40 spröjsade fönsterpartier samt inglasat uterum.",

        location: "Gävleborg",
        completed: "Mars 2026",
        guarantee: "100% Nöjd",
        rut: "50% Direkt",
        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Kristallklart resultat",
            "Rengjorda bågar och karmar",
            "Säker putsning på hög höjd",
            "Maximalt ljusinsläpp",
        ],

        /*   challengeBadge: "Utmaning & Behov",
        challengeTitle: "Vad krävdes för uppdraget?",
        challenge:
            "Många fönster satt på hög höjd och krävde säkerhetsutrustning samtidigt som de spröjsade glasen krävde extrem precision.",

        solutionBadge: "Vår Lösning",
        solutionTitle: "Hur gick vi tillväga?",
        solution:
            "Våra certifierade fönsterputsare använde professionella ultra-rent-vatten-system och teleskopskaft. Vi putsade både in- och utsida samt torkade av karmar och fönsterbänkar.",
        standardsTitle: "Vår Standard",
        standards: [
            {
                icon: "award",
                text: "Utbildad och bakgrundskontrollerad personal",
            },
            {
                icon: "clock",
                text: "Punktlig ankomst och effektiv tidsplanering",
            },
            {
                icon: "briefcase",
                text: "Fullt ansvarsförsäkrade upp till 10 mkr",
            },
        ], */
    },
    "flyttstadning-soderhamn-120kvm": {
        jobType: "Professionell Flyttstädning",
        scope: "Komplett flyttstädning av en villa på 120 kvm inklusive fönsterputsning.",

        location: "Söderhamn",
        completed: "Juni 2026",
        guarantee: "Städgaranti",
        rut: "50 % Direkt",

        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Komplett flyttstädning enligt branschstandard",
            "Noggrant rengjorda kök, badrum och vitvaror",
            "Invändig och utvändig fönsterputsning",
            "Städgaranti för en trygg överlämning",
        ],

        challengeBadge: "Utmaning & Behov",
        challengeTitle: "Vad krävdes för uppdraget?",
        challenge:
            "Inför överlämningen behövde hela bostaden rengöras noggrant. Uppdraget omfattade samtliga rum, kök, badrum, vitvaror, skåp, fönster och andra detaljer som kräver extra omsorg vid en flyttstädning.",

        solutionBadge: "Vår Lösning",
        solutionTitle: "Hur gick vi tillväga?",
        solution:
            "Vi följde en strukturerad checklista för flyttstädning och rengjorde bostaden från golv till tak. Samtliga ytor, kök, badrum, vitvaror, skåp och fönster rengjordes noggrant innan en slutlig kvalitetskontroll genomfördes.",

        standardsTitle: "Vår Standard",
        standards: [
            {
                icon: "award",
                text: "Noggrann städning med fokus på varje detalj",
            },
            {
                icon: "clock",
                text: "Punktlig service och effektivt genomförande",
            },
            {
                icon: "shield",
                text: "Städgaranti för en trygg överlämning",
            },
        ],
    },
    "flyttstadning-at-samarbetspartner": {
        jobType: "Professionell Flyttstädning",
        scope: "Komplett flyttstädning av bostad med fokus på noggrann rengöring av samtliga ytor.",

        location: "Ljusne",
        completed: "2026",
        guarantee: "Kvalitetssäkrat arbete",
        rut: "RUT-avdrag",

        highlightsTitle: "Resultat & Fördelar",
        highlights: [
            "Noggrant rengjord bostad inför överlämning",
            "Rengöring av kök, badrum och övriga ytor",
            "Detaljfokus på lister, skåp och fönsterbänkar",
            "Professionellt resultat enligt överenskomna krav",
        ],

        challengeBadge: "Utmaning & Behov",
        challengeTitle: "Vad krävdes för uppdraget?",
        challenge:
            "Bostaden behövde lämnas i ett välstädat skick inför nästa steg i flytten. Uppdraget krävde noggrann rengöring av hela bostaden, inklusive kök, badrum, förvaringsutrymmen och andra ytor där smuts lätt samlas.",

        solutionBadge: "Vår Lösning",
        solutionTitle: "Hur gick vi tillväga?",
        solution:
            "Vi genomförde flyttstädningen enligt en strukturerad checklista och arbetade systematiskt genom hela bostaden. Samtliga ytor rengjordes noggrant med fokus på detaljer för att säkerställa ett professionellt och godkänt slutresultat.",

        standardsTitle: "Vår Standard",
        standards: [
            {
                icon: "award",
                text: "Noggrant arbete med fokus på kvalitet och detaljer",
            },
            {
                icon: "clock",
                text: "Effektiv planering och leverans enligt överenskommelse",
            },
            {
                icon: "shield",
                text: "Tryggt och professionellt genomförande",
            },
        ],
    },
};

export function getSortedPortfolioItems() {
    return [...portfolioItems].sort((a, b) => {
        const orderA = a.order ?? -Infinity;
        const orderB = b.order ?? -Infinity;
        return orderB - orderA; // högst order visas först
    });
}
