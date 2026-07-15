import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om Oss | Renovix Nordic - Din städfirma i Gävle',
  description: 'Lär känna Renovix Nordic. Vi är en passionerad städfirma i Gävle som sätter kvalitet, trygghet och personlig service främst i hela Gävleborg.',
  openGraph: {
    title: 'Om Oss | Renovix Nordic',
    description: 'Lär känna teamet bakom Gävleborgs mest pålitliga städservice.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
