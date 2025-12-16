import React from "react";
import { Calendar, Landmark, MapPin, Users } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const membres = [
  { name: "Adjoint 1", role: "4ème adjoint", photo: "/images/personnes/1.jpg", focus: "Vie citoyenne & proximité" },
  { name: "Adjoint 2", role: "3ème adjoint", photo: "/images/personnes/2.jpg", focus: "Culture & patrimoine" },
  { name: "Adjoint 3", role: "2ème adjoint", photo: "/images/personnes/3.jpg", focus: "Urbanisme & cadre de vie" },
  { name: "Adjoint 4", role: "5ème adjoint", photo: "/images/personnes/4.jpg", focus: "Jeunesse & sports" },
];

const commissions = [
  { name: "Culture et Patrimoine", lead: "Mme Kouadio", focus: "Valoriser les sites emblématiques et soutenir la création locale." },
  { name: "Jeunesse et Sports", lead: "M. Traoré", focus: "Soutenir les clubs, les écoles et les initiatives sportives." },
  { name: "Urbanisme et Cadre de vie", lead: "Mme Diallo", focus: "Améliorer les espaces publics et accompagner les projets urbains." },
];

const ConseilMunicipal: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero harmonisé */}
      <section className="relative bg-gradient-to-br from-[#03800a] to-[#03800a] py-20 overflow-hidden text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#03800a]/40 via-[#03800a]/50 to-[#03800a]/60" />
        <div className="max-w-6xl mx-auto px-6 relative space-y-3">
          <p className="uppercase tracking-[0.25em] text-sm text-orange-200">Vie citoyenne</p>
          <h1 className="text-4xl lg:text-5xl font-bold">Le Conseil municipal</h1>
          <div className="flex items-center gap-3 text-white/85 text-sm">
            <Landmark className="w-5 h-5" />
            <span>Administration locale et représentants des habitants</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 mt-10 mb-12">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            Le Conseil municipal oriente la stratégie de la commune et suit les projets au service des habitants.
            Chaque commission est chargée d'un domaine précis afin de garantir un suivi attentif et des décisions
            prises au plus près des besoins de terrain.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <Calendar className="w-4 h-4 text-[#f8812f]" />
              Réunions régulières et comptes-rendus publics
            </span>
            <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <Users className="w-4 h-4 text-[#f8812f]" />
              Représentants des quartiers de Treichville
            </span>
            <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-[#f8812f]" />
              Mairie de Treichville
            </span>
          </div>
        </div>
      </section>

      {/* Membres avec photos */}
      <section className="max-w-6xl mx-auto px-6 pb-10 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Les adjoints au Maire</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {membres.map((membre) => (
            <div
              key={membre.name}
              className="relative rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-300 border border-gray-200 bg-white"
            >
              <div className="h-72 relative overflow-hidden">
                <img
                  src={membre.photo}
                  alt={membre.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              </div>
              <div className="p-5 text-gray-900 space-y-1">
                <h3 className="text-xl font-semibold">{membre.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commissions */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Commissions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {commissions.map((commission) => (
            <div
              key={commission.name}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{commission.name}</h3>
              <p className="text-sm text-[#03800a] font-semibold mb-2">Référent : {commission.lead}</p>
              <p className="text-gray-600 leading-relaxed">{commission.focus}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

ConseilMunicipal.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ConseilMunicipal;
