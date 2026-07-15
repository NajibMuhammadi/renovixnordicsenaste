import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Hemstädning, Flyttstädning & Kontorsstädning i Gävle | Renovix Nordic',
  description: 'Renovix Nordic i Gävle levererar städning med hög kvalitet: Flyttstädning, hemstädning, kontorsstädning och fönsterputs. Boka en gratis offert idag!',
  keywords: [
    'flyttstädning Gävle', 
    'hemstädning Gävle', 
    'fönsterputsning Gävle', 
    'bortforsling Gävle', 
    'städning Gävle', 
    'Renovix Nordic', 
    'Renovix Nordic Gävle', 
    'städservice Gävleborg',
    'städfirma Gävle',
    'storstädning Gävle',
    'kontorsstädning Gävle',
    'trappstädning Gävleborg',
    'gräsklippning Gävle'
  ],
  openGraph: {
    title: 'Renovix Nordic | Flyttstädning, Hemstädning & Kontorsstädning i Gävle',
    description: 'Professionell städning för både hem och företag i Gävle med omnejd. 100% nöjdhetsgaranti och RUT-avdrag på alla våra städtjänster.',
    url: 'https://renovixnordic.se',
    siteName: 'Renovix Nordic',
    locale: 'sv_SE',
    type: 'website',
  },
};

export default function Page() {
  return <HomeClient />;
}
