import { Metadata } from 'next';
import { services } from '@/lib/data';
import ServiceDetailPage from './ServiceClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: 'Tjänsten hittades inte | Renovix',
      description: 'Hittade inte den sökta städtjänsten hos Renovix.',
    };
  }

  const cleanTitle = service.title.replace(' – ', ' | ');

  return {
    title: `${cleanTitle} i Gävle, Sandviken & Gävleborg | Renovix`,
    description: `${service.description} Vi erbjuder professionell ${service.title.toLowerCase()} i hela Gävleborg med 100% nöjdhetsgaranti och RUT-avdrag bezpośred på fakturan.`,
    keywords: [
      `${service.title.toLowerCase()} Gävle`,
      `${service.title.toLowerCase()} Sandviken`,
      `${service.title.toLowerCase()} Gävleborg`,
      'städfirma Gävle',
      'Renovix Nordic',
      'professionell städning'
    ],
    openGraph: {
      title: `${cleanTitle} - Renovix Nordic`,
      description: `${service.description} 100% nöjdhetsgaranti och utbildad personal.`,
      url: `https://renovixnordic.se/services/${id}`,
    },
  };
}

export default function Page() {
  return <ServiceDetailPage />;
}
