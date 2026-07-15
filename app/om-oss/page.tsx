import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Om Oss | Renovix Nordic - Personlig Städfirma i Gävle',
  description: 'Lär känna Renovix Nordic. Vi är en lokal och pålitlig städfirma i Gävle som sätter trygghet, personligt bemötande och noggrannhet i fokus för din städning.',
  keywords: [
    'om oss städfirma',
    'Renovix Nordic om oss',
    'städfirma Gävle',
    'lokal städfirma Gävleborg',
    'professionell städning Gävle',
    'städhjälp Gävle'
  ],
  openGraph: {
    title: 'Om Oss - Renovix Nordic Gävle',
    description: 'Vi erbjuder personligt bemötande, trygghet och kompromisslös precision för städservice i hela Gävleborg.',
    url: 'https://renovixnordic.se/om-oss',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
