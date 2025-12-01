import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { civClient } from "@/api/civClient";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Clock, Tag, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Evenement } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const Evenements: FrontendPage = () => {
  const { data: evenements = [], isLoading } = useQuery<Evenement[]>({
    queryKey: ['evenements-page'],
    queryFn: () => civClient.entities.Evenement.list<Evenement>('date_debut'),
  });

  const categoryColors = {
    "Culturel": "bg-purple-600",
    "Sportif": "bg-green-600",
    "Familial": "bg-blue-600",
    "Citoyen": "bg-orange-600",
    "Festif": "bg-pink-600"
  };

  const upcomingEvents = evenements.filter(e => new Date(e.date_debut) >= new Date());
  const pastEvents = evenements.filter(e => new Date(e.date_debut) < new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#DC2626] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Événements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90"
          >
            Découvrez tous les événements de notre territoire
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : (
          <>
            {/* Événements à venir */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Événements à venir</h2>
              {upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event, index) => {
                    const badgeClass =
                      categoryColors[event.categorie as keyof typeof categoryColors] || "bg-gray-600";
                    const eventStart = new Date(event.date_debut);
                    return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.titre} className="w-full h-48 object-cover" />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#DC2626] to-red-700 flex items-center justify-center">
                          <Calendar className="w-16 h-16 text-white/50" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${badgeClass} text-white border-0`}>
                            {event.categorie}
                          </Badge>
                          {event.gratuit && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Gratuit
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.titre}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#DC2626]" />
                            <span>{format(eventStart, "EEEE d MMMM yyyy", { locale: fr })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#DC2626]" />
                            <span>{format(eventStart, "HH:mm", { locale: fr })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#DC2626]" />
                            <span>{event.lieu}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun événement à venir pour le moment</p>
                </div>
              )}
            </div>

            {/* Événements passés */}
            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Événements passés</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75">
                  {pastEvents.map((event) => {
                    const eventStart = new Date(event.date_debut);
                    return (
                      <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                        <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <div className="p-6">
                          <Badge variant="outline" className="mb-2">
                            Terminé
                          </Badge>
                          <h3 className="text-lg font-bold text-gray-700 mb-2">{event.titre}</h3>
                          <p className="text-sm text-gray-500">
                            {format(eventStart, "d MMMM yyyy", { locale: fr })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Evenements.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Evenements;