import React from "react";
import { motion } from "framer-motion";
import { Trees, Waves, MapPin, Clock, Users, Star } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const lieux = [
  {
    type: "Parc",
    name: "Jardin Public de Treichville",
    description: "Espace vert au cœur de la commune, idéal pour les promenades en famille et les activités de plein air.",
    image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800",
    horaires: "6h00 - 18h00",
    acces: "Gratuit",
    equipements: ["Aires de jeux", "Bancs", "Espaces verts", "Allées piétonnes"]
  },
  {
    type: "Piscine",
    name: "Piscine Municipale",
    description: "Complexe aquatique moderne avec bassins pour tous les âges et tous les niveaux.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    horaires: "8h00 - 20h00",
    acces: "Payant",
    equipements: ["Grand bassin", "Bassin enfants", "Vestiaires", "Snack-bar"]
  },
  {
    type: "Parc",
    name: "Square de la Jeunesse",
    description: "Espace dédié aux jeunes avec terrains de sport et zones de détente.",
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800",
    horaires: "7h00 - 19h00",
    acces: "Gratuit",
    equipements: ["Terrain de basket", "Terrain de foot", "Skate park", "Gradins"]
  },
  {
    type: "Piscine",
    name: "Centre Aquatique du Port",
    description: "Piscine olympique pour les nageurs confirmés et les compétitions.",
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800",
    horaires: "6h00 - 21h00",
    acces: "Payant",
    equipements: ["Bassin olympique", "Tribunes", "Salle de musculation", "Sauna"]
  }
];

const ParcsPiscines: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#03800a] to-[#03800a] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200"
            alt="Parc"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center gap-4 mb-6">
              <Trees className="w-12 h-12 text-white" />
              <Waves className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {/* Parcs et Piscines */}
              Endroits à découvrir
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Détente, loisirs et activités sportives pour toute la famille
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lieux */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {lieux.map((lieu, index) => (
              <motion.div
                key={lieu.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={lieu.image}
                    alt={lieu.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-4 py-1.5 text-white text-sm font-semibold rounded-full ${
                      lieu.type === "Parc" ? "bg-green-500" : "bg-blue-500"
                    }`}>
                      {lieu.type === "Parc" ? <Trees className="w-4 h-4 inline mr-1" /> : <Waves className="w-4 h-4 inline mr-1" />}
                      {lieu.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      lieu.acces === "Gratuit" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {lieu.acces}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{lieu.name}</h3>
                  <p className="text-gray-600 mb-4">{lieu.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#f8812f]" />
                      {lieu.horaires}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#f8812f]" />
                      Treichville
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {lieu.equipements.map((eq, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-[#f8812f]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Users className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Profitez de nos espaces de loisirs
          </h2>
          <p className="text-white/90 text-lg">
            Nos équipements sont à votre disposition pour des moments de détente et de convivialité
          </p>
        </div>
      </section>
    </div>
  );
};

ParcsPiscines.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ParcsPiscines;
