import { Metadata } from 'next';
import { portfolioItems } from '@/lib/data';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);

  if (!item) {
    return {
      title: 'Projektet hittades inte',
    };
  }

  return {
    title: item.title,
    description: item.fullDescription || item.description,
    openGraph: {
      title: `${item.title} | Renovix Nordic Gävle`,
      description: item.fullDescription || item.description,
      images: [item.image],
    },
    keywords: [
      item.title,
      `${item.title} Gävle`,
      `${item.title} Gävleborg`,
      'Renovix Nordic Gävle',
      'städfirma Gävle',
    ],
  };
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
