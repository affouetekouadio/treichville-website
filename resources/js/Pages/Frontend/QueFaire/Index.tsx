import React from "react";
import { Link } from "@inertiajs/react";
import { CalendarClock, MapPin, Trees } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { createPageUrl } from "@/utils";

const QueFaire: FrontendPage = () => {
  const ideas = [
    {
      title: "Événements et expositions",
      description: "Le calendrier des rendez-vous culturels, sportifs et associatifs de Treichville.",
      icon: CalendarClock,
      href: createPageUrl("Evenements"),
      cta: "Voir les événements",
    },
    {
      title: "Endroits à découvrir",
      description: "Les espaces de détente pour profiter en famille : parcs, piscines et balades.",
      icon: Trees,
      href: createPageUrl("ParcsPiscines"),
      cta: "Explorer les lieux",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#f8812f] via-[#f8843f] to-[#03800a] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/80 mb-3">Découvrir Treichville</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-5">Que faire à Treichville ?</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Sortez, respirez, visitez : la commune regorge de lieux de vie, d'événements et de rendez-vous
              conviviaux. Préparez vos sorties en un clin d'œil.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white text-[#f8812f] rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/70">Sorties et loisirs</p>
                <p className="font-semibold text-lg">Près de chez vous</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              Trouvez une activité selon votre quartier ou vos envies : sport, culture, plein air, découvertes familiales.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-6">
        {ideas.map((idea) => (
          <Link
            key={idea.title}
            href={idea.href}
            className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#03800a]/10 text-[#03800a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <idea.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{idea.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{idea.description}</p>
            <span className="text-[#f8812f] font-semibold">{idea.cta} →</span>
          </Link>
        ))}
      </section>
    </div>
  );
};

QueFaire.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default QueFaire;
