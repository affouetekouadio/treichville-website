import React from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, History } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

type PatrimoineItem = {
  id: number;
  titre: string;
  description?: string | null;
  image_url?: string | null;
  lieu?: string | null;
};

type PatrimoinePageProps = {
  patrimoines?: PatrimoineItem[];
};

const Patrimoine: FrontendPage<PatrimoinePageProps> = ({ patrimoines = [] }) => {
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
          {patrimoines.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
              Aucun patrimoine publié pour le moment.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patrimoines.map((monument, index) => (
              <motion.div
                key={monument.id ?? monument.titre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={monument.image_url || "/images/treichville-1.jpeg"}
                      alt={monument.titre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{monument.titre}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    {monument.description ? (
                      <div
                        className="text-gray-600 rich-content"
                        dangerouslySetInnerHTML={{ __html: monument.description }}
                      />
                    ) : (
                      <p className="text-gray-600">Description non disponible.</p>
                    )}
                    {monument.lieu && (
                      <div className="mt-4 flex items-center gap-2 text-[#f8812f]">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{monument.lieu}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-16 bg-[#03800a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Camera className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Visitez Treichville
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Venez découvrir en personne les trésors de notre commune
          </p>
        </div>
      </section> */}
    </div>
  );
};

Patrimoine.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Patrimoine;
