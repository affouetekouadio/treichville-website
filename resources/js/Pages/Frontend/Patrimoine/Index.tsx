import React from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, History } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

const monuments = [
  {
    name: "Le Port d'Abidjan",
    description: "Premier port de la sous-région ouest-africaine, symbole du dynamisme économique de Treichville.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    category: "Économique"
  },
  {
    name: "Le Marché de Treichville",
    description: "Haut lieu du commerce et de la vie quotidienne, reflet de la diversité culturelle de la commune.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
    category: "Commerce"
  },
  {
    name: "La Gare de Treichville",
    description: "Vestige historique du chemin de fer Abidjan-Niger, témoin du passé colonial.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800",
    category: "Historique"
  },
  {
    name: "Place de la République",
    description: "Espace public central, lieu de rassemblement et de manifestations culturelles.",
    image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800",
    category: "Public"
  },
  {
    name: "Cathédrale Saint-Paul",
    description: "Édifice religieux remarquable, symbole de la foi et de l'architecture moderne.",
    image: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800",
    category: "Religieux"
  },
  {
    name: "Le Boulevard VGE",
    description: "Artère principale de la commune, vitrine du commerce et de l'animation urbaine.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    category: "Urbain"
  }
];

const Patrimoine: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      {/* <section className="relative bg-gradient-to-br from-[#f8812f] to-orange-600 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
              Découvrir Treichville
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Patrimoine et Monuments
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explorez les lieux emblématiques qui font la richesse historique et culturelle de notre commune
            </p>
          </motion.div>
        </div>
      </section> */}

      <PageBanner
        title="Patrimoine et Monuments"
        variant="compact"
      />

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <History className="w-16 h-16 text-[#03800a] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Un patrimoine riche et diversifié
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Treichville possède un patrimoine architectural et culturel unique qui témoigne de son histoire 
              et de son rôle central dans le développement d'Abidjan. Des édifices coloniaux aux constructions 
              modernes, chaque monument raconte une partie de notre histoire commune.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Monuments Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monuments.map((monument, index) => (
              <motion.div
                key={monument.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={monument.image}
                      alt={monument.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-[#03800a] text-white text-xs font-semibold rounded-full">
                        {monument.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{monument.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{monument.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-[#f8812f]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">Treichville, Abidjan</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#03800a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Camera className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Visitez Treichville
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Venez découvrir en personne les trésors de notre commune
          </p>
        </div>
      </section>
    </div>
  );
};

Patrimoine.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Patrimoine;
