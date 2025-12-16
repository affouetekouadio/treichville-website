import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Tag, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Actualite } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

type ActualitesPageProps = {
  actualites?: Actualite[];
};

const Actualites: FrontendPage<ActualitesPageProps> = ({ actualites = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);

  const categories = ["Toutes", "Annonce", "Événement", "Travaux", "Culture", "Social", "Environnement"];

  const categoryColors = {
    "Annonce": "bg-blue-600",
    "Événement": "bg-purple-600",
    "Travaux": "bg-orange-600",
    "Culture": "bg-pink-600",
    "Social": "bg-green-600",
    "Environnement": "bg-emerald-600"
  };

  const filteredActualites = actualites.filter(actu => {
    const matchCategory = selectedCategory === "Toutes" || actu.categorie === selectedCategory;
    const matchSearch = !searchQuery || 
      actu.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actu.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      {/* <section className="bg-[#e0d4d4] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Actualités
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90"
          >
            Toutes les informations de votre collectivité
          </motion.p>
        </div>
      </section> */}

      <section className="relative bg-gradient-to-br from-[#03800a] to-[#0f6b7a] py-24 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#03800a]/40 via-[#03800a]/55 to-[#0f6b7a]/65" />
      
              <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                    Actualités
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                    Actualités
                  </h1>
                  {/* <p className="text-xl text-gray-300 leading-relaxed">
                   Toutes les informations de votre collectivité
                  </p> */}
                </motion.div>
              </div>
        </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filtres */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "bg-[#DC2626] hover:bg-red-700" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : filteredActualites.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActualites.map((actu, index) => {
              const badgeClass =
                categoryColors[actu.categorie as keyof typeof categoryColors] || "bg-gray-600";
              return (
              <motion.article
                key={actu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {actu.image_url ? (
                    <img
                      src={actu.image_url}
                      alt={actu.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                      <Tag className="w-16 h-16 text-white/30" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${badgeClass} text-white border-0`}>
                      {actu.categorie}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <time>{format(new Date(actu.date_publication), "d MMMM yyyy", { locale: fr })}</time>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#DC2626] transition-colors line-clamp-2">
                    {actu.titre}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">{actu.description}</p>
                </div>
              </motion.article>
            );
          })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune actualité trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

Actualites.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Actualites;
