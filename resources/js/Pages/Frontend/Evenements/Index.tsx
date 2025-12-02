import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Clock, Tag, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Evenement } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

type EvenementsPageProps = {
  evenements?: Evenement[];
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515165562835-c3b8e0ea7d83?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
];

function futureIso(daysFromNow: number, hour: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

const fallbackEvents: Evenement[] = [
  {
    id: 1,
    titre: "Festival des saveurs de Treichville",
    description: "Découverte de la gastronomie locale, concerts live et animations familiales.",
    categorie: "Culturel",
    image_url: fallbackImages[0],
    date_debut: futureIso(14, 10),
    date_fin: futureIso(14, 18),
    lieu: "Esplanade de la mairie",
    gratuit: true,
  },
  {
    id: 2,
    titre: "Course lagunaire solidaire",
    description: "Parcours 5 km et 10 km le long des berges pour soutenir les associations locales.",
    categorie: "Sportif",
    image_url: fallbackImages[1],
    date_debut: futureIso(28, 7),
    date_fin: futureIso(28, 11),
    lieu: "Berges lagunaires",
    gratuit: true,
  },
  {
    id: 3,
    titre: "Nuit de la culture urbaine",
    description: "Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune.",
    categorie: "Festif",
    image_url: fallbackImages[2],
    date_debut: futureIso(42, 18),
    date_fin: futureIso(42, 23),
    lieu: "Centre culturel de Treichville",
    gratuit: false,
  },
  {
    id: 4,
    titre: "Forum des associations",
    description: "Rencontre des associations locales, ateliers participatifs et débats citoyens.",
    categorie: "Citoyen",
    image_url: fallbackImages[3],
    date_debut: futureIso(7, 9),
    date_fin: futureIso(7, 16),
    lieu: "Maison des jeunes",
    gratuit: true,
  },
  {
    id: 5,
    titre: "Salon de l'emploi jeunes",
    description: "Entreprises, formations et coaching pour l'insertion professionnelle.",
    categorie: "Social",
    image_url: fallbackImages[4],
    date_debut: futureIso(21, 9),
    date_fin: futureIso(21, 17),
    lieu: "Salle des fêtes municipale",
    gratuit: true,
  },
  {
    id: 6,
    titre: "Concert lagunaire",
    description: "Concert en plein air avec des artistes locaux et animations familiales.",
    categorie: "Festif",
    image_url: fallbackImages[5],
    date_debut: futureIso(35, 18),
    date_fin: futureIso(35, 23),
    lieu: "Berges de Treichville",
    gratuit: false,
  },
];

const Evenements: FrontendPage<EvenementsPageProps> = ({ evenements = [] }) => {
  const isLoading = false;
  const dataset = evenements.length ? evenements : fallbackEvents;
  const eventsWithImages = dataset.map((evt, idx) => ({
    ...evt,
    image_url: evt.image_url || fallbackImages[idx % fallbackImages.length],
  }));

  const categoryColors = {
    "Culturel": "bg-purple-600",
    "Sportif": "bg-green-600",
    "Familial": "bg-blue-600",
    "Citoyen": "bg-orange-600",
    "Festif": "bg-pink-600"
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = eventsWithImages.filter((e) => new Date(e.date_debut) >= today);
  const pastEvents = eventsWithImages.filter((e) => new Date(e.date_debut) < today);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <PageBanner
        title="Événements"
        description="Découvrez tous les événements de notre commune"
        icon={Calendar}
        variant="compact"
        align="left"
        gradient={{
          from: "#f8812f",
          to: "#ea580c",
        }}
      /> */}


        <section className="relative bg-gradient-to-br from-[#1d8595] to-teal-700 py-24 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1d8595]/40 via-[#1d8595]/50 to-teal-700/60" />
      
              <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                      Découvrir Treichville
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                    Événements
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Découvrez tous les événements de notre commune
                  </p>
                </motion.div>
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
