import React from "react";
import { Link } from "@inertiajs/react";
import { Landmark, Megaphone, Newspaper, Users } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { createPageUrl } from "@/utils";

const VieCitoyenne: FrontendPage = () => {
  const sections = [
    {
      title: "Message du Maire",
      description: "La vision et les priorités de l'équipe municipale pour les citoyens de Treichville.",
      icon: Megaphone,
      href: createPageUrl("MessageMaire"),
    },
    {
      title: "Le Conseil municipal",
      description: "Découvrez l'organisation, les commissions et les élus qui agissent pour la commune.",
      icon: Landmark,
      href: createPageUrl("ConseilMunicipal"),
    },
    {
      title: "Dernières actualités",
      description: "Suivez les informations et annonces officielles de votre mairie.",
      icon: Newspaper,
      href: createPageUrl("Actualites"),
    },
  ];

  const engagements = [
    "Dialogue permanent avec les habitants et les associations",
    "Services publics accessibles et simplifiés",
    "Vie associative, sportive et culturelle soutenue",
    "Proximité dans chaque quartier de Treichville",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1d8595] to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-4">Vie citoyenne</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Une mairie proche de ses habitants
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Retrouvez toutes les informations pratiques, les messages officiels et les actions menées
              par la commune pour améliorer la qualité de vie des Treichvillois.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={createPageUrl("MessageMaire")}
                className="bg-white text-[#1d8595] px-5 py-3 rounded-lg font-semibold shadow-lg hover:-translate-y-0.5 transition-transform"
              >
                Lire le mot du Maire
              </Link>
              <Link
                href={createPageUrl("ConseilMunicipal")}
                className="border border-white/30 text-white px-5 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Découvrir le Conseil
              </Link>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white text-[#1d8595] w-12 h-12 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/70">Treichville, commune citoyenne</p>
                <p className="font-semibold text-lg">Engagée pour ses habitants</p>
              </div>
            </div>
            <ul className="space-y-3 text-white/90">
              {engagements.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#f8812f]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8812f]/10 flex items-center justify-center text-[#f8812f] mb-4 group-hover:scale-105 transition-transform">
                <section.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{section.description}</p>
              <span className="text-[#1d8595] font-semibold">En savoir plus →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

VieCitoyenne.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default VieCitoyenne;
