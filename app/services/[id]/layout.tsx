import { Metadata } from 'next';
import { services } from '@/lib/data';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: 'Tjänsten hittades inte',
    };
  }

  return {
    title: service.title,
    description: service.fullDescription || service.description,
    openGraph: {
      title: `${service.title} | Renovix Nordic Gävle`,
      description: service.fullDescription || service.description,
      images: [service.image],
    },
    keywords: [
      service.title,
      `${service.title} Gävle`,
      `${service.title} Gävleborg`,
      'Renovix Nordic Gävle',
      'städfirma Gävle',
    ],
  };
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
