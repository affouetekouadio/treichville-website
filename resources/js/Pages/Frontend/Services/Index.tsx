import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Users, Building, Home, Sprout, Heart, Briefcase, Coins,
  ExternalLink, Search, ChevronRight, Loader2, MapPin, PhoneCall, Calendar, User
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Service as ServiceRecord } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { createPageUrl, serviceDetailUrl } from "@/utils";
import PageBanner from "@/components/Frontend/PageBanner";

const iconMap = {
  FileText, Users, Building, Home, Sprout, Heart, Briefcase, Coins, MapPin, PhoneCall, Calendar
};

type ServicesPageProps = {
  services?: ServiceRecord[];
};

const Services: FrontendPage<ServicesPageProps> = ({ services = [] }) => {
  const fallbackServices: ServiceRecord[] = [
    {
      id: "etat-civil",
      nom: "État civil",
      description: "Actes de naissance, mariage, décès et mise à jour des documents officiels.",
      categorie: "État civil",
      icone: "FileText",
      lien_externe: createPageUrl("EtatCivil"),
      responsable: "M. KOUADIO Jean",
    },
    {
      id: "urbanisme",
      nom: "Urbanisme & permis",
      description: "Permis de construire, conformité et suivi des chantiers dans la commune.",
      categorie: "Urbanisme",
      icone: "Building",
      lien_externe: createPageUrl("Fiscalite"),
      responsable: "Mme TRAORE Marie",
    },
    {
      id: "fiscalite",
      nom: "Fiscalité locale",
      description: "Paiement des taxes, fiscalité des marchés et des entreprises locales.",
      categorie: "Administratif",
      icone: "Coins",
      lien_externe: createPageUrl("Fiscalite"),
      responsable: "M. YAO Bernard",
    },
    {
      id: "solidarite",
      nom: "Solidarité & santé",
      description: "Aides sociales, accompagnement des familles et santé communautaire.",
      categorie: "Social",
      icone: "Heart",
      lien_externe: createPageUrl("Services"),
      responsable: "Mme N'GUESSAN Aya",
    },
    {
      id: "jeunesse",
      nom: "Jeunesse & sport",
      description: "Équipements sportifs, agenda des clubs et programmes pour la jeunesse.",
      categorie: "Social",
      icone: "Users",
      lien_externe: createPageUrl("Evenements"),
      responsable: "M. KONE Seydou",
    },
    {
      id: "environnement",
      nom: "Environnement",
      description: "Propreté urbaine, collecte des déchets et initiatives écologiques.",
      categorie: "Environnement",
      icone: "Sprout",
      lien_externe: createPageUrl("ParcsPiscines"),
      responsable: "Mme BAMBA Fatou",
    },
  ];

  const servicesList = services.length ? services : fallbackServices;
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);

  const filteredServices = servicesList.filter(service => {
    const matchSearch = !searchQuery ||
      service.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.responsable?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageBanner
        title="Nos Directions"
        variant="compact"
      />

      {/* Search Section */}
      <section className="sticky top-[88px] z-40 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Rechercher une direction ou un responsable..."
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
                  {filteredServices.length} direction{filteredServices.length > 1 ? 's' : ''} trouvée{filteredServices.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => {
                  const iconKey = ((service.icone ?? service.icon) as keyof typeof iconMap) ?? "FileText";
                  const Icon = iconMap[iconKey] || FileText;
                  const detailUrl = service.slug ? serviceDetailUrl(service.slug) : service.lien_externe;
                  const description = service.short_description || service.description || " ";

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#03800a]/30 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                      {/* Gradient Accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#03800a] to-[#f8812f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                      <div className="p-6">
                        {/* Header avec Icône */}
                        <div className="flex items-start justify-between mb-4">
                          <motion.div
                            className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center group-hover:from-[#03800a]/10 group-hover:to-[#f8812f]/10 transition-all duration-500"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Icon className="w-7 h-7 text-gray-600 group-hover:text-[#03800a] transition-colors duration-500" />
                          </motion.div>
                        </div>

                        {/* Titre */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#03800a] transition-colors duration-300">
                          {service.nom}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {description}
                        </p>

                        {/* Responsable */}
                        {service.responsable && (
                          <motion.div
                            className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 group-hover:border-[#03800a]/20 transition-all duration-500"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            <div className="w-8 h-8 bg-gradient-to-br from-[#03800a]/10 to-[#f8812f]/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-[#03800a]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 font-medium">Responsable</p>
                              <p className="text-sm font-semibold text-gray-900 truncate">{service.responsable}</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Action */}
                        {detailUrl ? (
                          service.slug ? (
                            <Link
                              href={detailUrl}
                              className="inline-flex items-center gap-2 text-[#03800a] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                            >
                              <span>Voir la direction</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          ) : (
                            <a
                              href={detailUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[#03800a] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                            >
                              <span>Accéder au service</span>
                              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </a>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                            <span>En savoir plus</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      {/* Hover Effect Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#03800a]/0 to-[#f8812f]/0 group-hover:from-[#03800a]/[0.02] group-hover:to-[#f8812f]/[0.02] transition-all duration-500 pointer-events-none"></div>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune direction trouvée</h3>
              <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
              <Button
                variant="outline"
                onClick={() => { setSearchQuery(""); }}
              >
                Réinitialiser la recherche
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#03800a] to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Besoin d'aide ou d'informations ?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Notre équipe est disponible pour vous accompagner dans vos démarches administratives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#03800a] hover:bg-gray-100 px-8 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = createPageUrl('Contact')}
              >
                Nous contacter
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 font-semibold backdrop-blur-sm"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                Appeler la mairie
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
