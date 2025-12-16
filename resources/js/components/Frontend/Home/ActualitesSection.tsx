import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Actualite } from "@/types/content";

type Props = {
  actualites?: Actualite[];
};

export default function ActualitesSection({ actualites = [] }: Props) {

  const categoryColors = {
    "Annonce": "bg-blue-600 text-white",
    "Événement": "bg-purple-600 text-white",
    "Travaux": "bg-orange-600 text-white",
    "Culture": "bg-pink-600 text-white",
    "Social": "bg-green-600 text-white",
    "Environnement": "bg-emerald-600 text-white"
  };

  return (
    <section id="actualites" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#f8812f]/10 rounded-full mb-4">
            <span className="text-[#f8812f] font-semibold text-sm tracking-wider uppercase">Actualités</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Actualités
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restez informé de toute l'actualité de votre territoire
          </p>
        </motion.div>

        {/* Grid */}
        {actualites.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((actu, index) => {
              const badgeClass =
                categoryColors[actu.categorie as keyof typeof categoryColors] ||
                "bg-gray-600 text-white";
              return (
                <motion.article
                  key={actu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  {actu.image_url ? (
                    <img
                      src={actu.image_url}
                      alt={actu.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                      <Tag className="w-16 h-16 text-white opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${badgeClass} border-0 font-semibold`}>
                      {actu.categorie}
                    </Badge>
                  </div>

                  {/* Date */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {format(new Date(actu.date_publication), "d MMMM yyyy", { locale: fr })}
                    </time>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f8812f] transition-colors line-clamp-2">
                    {actu.titre}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {actu.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#f8812f] font-semibold group-hover:gap-3 transition-all">
                    Lire la suite
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune actualité pour le moment</p>
          </div>
        )}
      </div>
    </section>
  );
}