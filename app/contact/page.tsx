import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Boka Städning & Få Gratis Offert i Gävle | Renovix',
  description: 'Fyll i vårt enkla formulär för att få en kostnadsfri offert på flyttstädning, hemstädning eller kontorsstädning i hela Gävleborg. Offert inom 24 timmar!',
  keywords: [
    'offert städning Gävle',
    'boka hemstädning Gävle',
    'flyttstädning pris Gävleborg',
    'fönsterputs prisförslag',
    'städfirma kontakt Gävle'
  ],
  openGraph: {
    title: 'Få Gratis Offert på Städning i Gävleborg - Renovix Nordic',
    description: 'Boka flyttstädning, hemstädning eller företagsstädning snabbt och enkelt med svar inom 24 timmar.',
    url: 'https://renovixnordic.se/contact',
  },
};

export default function Page() {
  return <ContactClient />;
}
