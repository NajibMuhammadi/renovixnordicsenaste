import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vår Portfolio | Renovix Nordic Gävle',
  description: 'Se våra tidigare projekt och resultat i Gävle. Vi visar upp allt från flyttstädning till trädgårdsskötsel och bortforsling.',
  keywords: ['portfolio Gävle', 'städprojekt Gävle', 'referenser städning Gävle'],
  robots: 'noindex, nofollow',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
