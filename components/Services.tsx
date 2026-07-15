import { 
  Home, 
  Move, 
  Building2, 
  Sparkle, 
  Scissors, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';

const services = [
  {
    title: 'Hemstädning',
    description: 'En avkopplande vardag börjar med ett rent hem. Vi anpassar hemstädningen efter dina önskemål.',
    icon: Home,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Flyttstädning',
    description: 'Vi tar hand om allt enligt branschstandard så att du kan fokusera på ditt nya hem. 100% garanti.',
    icon: Move,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Kontorsstäd',
    description: 'En ren arbetsplats ökar trivseln och produktiviteten. Professionell städning för alla företag.',
    icon: Building2,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    title: 'Fönsterputs',
    description: 'Kristallklara fönster utan ränder. Vi putsar dina fönster snabbt och effektivt.',
    icon: Sparkle,
    color: 'bg-cyan-50 text-cyan-600'
  },
  {
    title: 'Gräsklippning',
    description: 'Vi hjälper dig att hålla trädgården fin. Vi klipper gräset så du får tid över till annat.',
    icon: Scissors,
    color: 'bg-lime-50 text-lime-600'
  },
  {
    title: 'Bortforsling',
    description: 'Vi hjälper dig att bli av med skräp och gammalt bråte på ett ansvarsfullt och miljövänligt sätt.',
    icon: Trash2,
    color: 'bg-rose-50 text-rose-600'
  }
];

export default function Services() {
  return (
    <section id="tjanster" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Våra Tjänster</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Vi erbjuder ett komplett utbud av städtjänster för både privatpersoner och företag i Gävleborg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform`}>
                <s.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                {s.description}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <CheckCircle2 size={14} className="text-blue-500" />
                  RUT-avdrag giltigt
                </li>
                {s.title === 'Flyttstädning' && (
                  <li className="flex items-center gap-2 text-xs font-semibold text-emerald-500 uppercase tracking-wide">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Garanti ingår
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
