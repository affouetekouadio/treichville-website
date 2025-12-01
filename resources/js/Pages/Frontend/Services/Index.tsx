import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { civClient } from "@/api/civClient";
import { 
  FileText, Users, Building, Home, Sprout, Heart, Briefcase, Coins, 
  ExternalLink, Search, ChevronRight, Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Service as ServiceRecord } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const iconMap = {
  FileText, Users, Building, Home, Sprout, Heart, Briefcase, Coins
};

const categoryInfo = {
  "Administratif": { color: "bg-blue-500", lightColor: "bg-blue-50", textColor: "text-blue-600" },
  "État civil": { color: "bg-purple-500", lightColor: "bg-purple-50", textColor: "text-purple-600" },
  "Urbanisme": { color: "bg-amber-500", lightColor: "bg-amber-50", textColor: "text-amber-600" },
  "Social": { color: "bg-green-500", lightColor: "bg-green-50", textColor: "text-green-600" },
  "Culture": { color: "bg-pink-500", lightColor: "bg-pink-50", textColor: "text-pink-600" },
  "Environnement": { color: "bg-emerald-500", lightColor: "bg-emerald-50", textColor: "text-emerald-600" }
};

const Services: FrontendPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: services = [], isLoading } = useQuery<ServiceRecord[]>({
    queryKey: ['services-page'],
    queryFn: () => civClient.entities.Service.list<ServiceRecord>('ordre'),
  });

  const categories = ["Tous", "Administratif", "État civil", "Urbanisme", "Social", "Culture", "Environnement"];

  const filteredServices = services.filter(service => {
    const matchCategory = selectedCategory === "Tous" || service.categorie === selectedCategory;
    const matchSearch = !searchQuery || 
      service.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#DC2626] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DC2626] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-[#f8812f]/20 text-[#f8812f] rounded-full text-sm font-semibold mb-6">
              À votre service
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Nos Services Municipaux
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Découvrez l'ensemble des services proposés par votre collectivité pour simplifier vos démarches au quotidien
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-[88px] z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === cat
                            ? "bg-[#f8812f] text-white shadow-lg shadow-orange-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Rechercher un service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-[#f8812f] animate-spin" />
            </div>
          ) : filteredServices.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-500">
                  {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => {
                  const iconKey = (service.icone as keyof typeof iconMap) ?? "FileText";
                  const Icon = iconMap[iconKey] || FileText;
                  const catInfo =
                    categoryInfo[service.categorie as keyof typeof categoryInfo] || {
                      color: "bg-gray-500",
                      lightColor: "bg-gray-50",
                      textColor: "text-gray-600",
                    };
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-14 h-14 ${catInfo.lightColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-7 h-7 ${catInfo.textColor}`} />
                          </div>
                          <span className={`px-3 py-1 ${catInfo.lightColor} ${catInfo.textColor} text-xs font-semibold rounded-full`}>
                            {service.categorie}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f8812f] transition-colors">
                          {service.nom}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {service.description}
                        </p>
                        
                        {/* Action */}
                        {service.lien_externe ? (
                          <a
                            href={service.lien_externe}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#f8812f] font-semibold text-sm group-hover:gap-3 transition-all"
                          >
                            Accéder au service
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                            <ChevronRight className="w-4 h-4" />
                            En savoir plus
                          </span>
                        )}
                      </div>
                      
                      {/* Bottom Accent */}
                      <div className={`h-1 ${catInfo.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun service trouvé</h3>
              <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
              <Button 
                variant="outline" 
                onClick={() => { setSelectedCategory("Tous"); setSearchQuery(""); }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#f8812f] to-orange-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Besoin d'aide ?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Notre équipe est disponible pour vous accompagner dans vos démarches
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#DC2626] hover:bg-gray-100 px-8"
                onClick={() => window.location.href = '/Contact'}
              >
                Nous contacter
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8"
              >
                01 23 45 67 89
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

Services.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Services;