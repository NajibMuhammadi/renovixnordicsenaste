import { Metadata } from 'next';
import TjansterClient from './TjansterClient';

export const metadata: Metadata = {
  title: 'Våra Städtjänster i Gävle, Sandviken & Gävleborg | Renovix',
  description: 'Professionella städtjänster för privatpersoner och företag i Gävleborg. Hemstädning, flyttstädning, kontorsstädning och fönsterputsning med 100% nöjdhetsgaranti.',
  keywords: [
    'städtjänster Gävle',
    'städfirma Gävle',
    'flyttstädning Gävleborg',
    'hemstädning Sandviken',
    'kontorsstädning Gävle',
    'fönsterputsning Gävle',
    'storstädning Gävle',
    'trappstädning Gävleborg'
  ],
  openGraph: {
    title: 'Våra Städtjänster i Gävleborg - Renovix Nordic',
    description: 'Flyttstädning, hemstädning, kontorsstädning och mycket mer. Alltid professionellt utfört med ansvarsförsäkring och nöjdhetsgaranti.',
    url: 'https://renovixnordic.se/tjanster',
  },
};

export default function ServicesPage() {
  return <TjansterClient />;
}
