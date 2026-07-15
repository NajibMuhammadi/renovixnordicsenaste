import { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Våra Referenser & Före/Efter-bilder | Renovix',
  description: 'Se resultaten av våra professionella städningar i Gävleborg. Utforska galleriet med före- och efterbilder för flyttstädning, hemstädning och fönsterputsning.',
  keywords: [
    'städfirma referenser Gävle',
    'före efter städning Gävleborg',
    'flyttstädning resultat',
    'hemstädning bilder',
    'fönsterputs referenser Gävle'
  ],
  openGraph: {
    title: 'Referenser & Före/Efter-bilder - Renovix Nordic',
    description: 'Se prov på vår höga kvalitet och noggrannhet. Riktiga resultat från riktiga kunder i Gävle med omnejd.',
    url: 'https://renovixnordic.se/portfolio',
  },
};

export default function Page() {
  return <PortfolioClient />;
}
