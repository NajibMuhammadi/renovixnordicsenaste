import { Metadata } from 'next';
import { portfolioItems } from '@/lib/data';
import PortfolioDetailClient from './PortfolioDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioItems.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Projektet hittades inte | Renovix',
      description: 'Hittade inte det sökta referensprojektet hos Renovix.',
    };
  }

  return {
    title: `${project.title} i Gävleborg | Renovix Referenser`,
    description: `${project.description} Se hur Renovix Nordic utförde detta städuppdrag med fantastiskt resultat. Boka liknande tjänster idag!`,
    keywords: [
      `${project.category.toLowerCase()} städning`,
      'städning referens',
      'Renovix Gävle',
      'flyttstädning referens',
      'före efter bilder städning'
    ],
    openGraph: {
      title: `${project.title} - Renovix Nordic`,
      description: project.description,
      url: `https://renovixnordic.se/portfolio/${id}`,
    },
  };
}

export default function Page() {
  return <PortfolioDetailClient />;
}
