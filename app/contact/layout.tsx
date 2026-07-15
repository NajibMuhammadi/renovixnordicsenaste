import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Få en kostnadsfri offert | Städning i Gävleborg',
  description: 'Begär en kostnadsfri offert för flyttstädning, hemstädning eller företagsstädning i Gävle och hela Gävleborg. Snabbt svar och tydliga priser.',
  openGraph: {
    title: 'Få en kostnadsfri offert | Renovix Nordic Gävle',
    description: 'Fyll i formuläret så återkommer vi snabbt med ett tydligt pris för din städning.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
