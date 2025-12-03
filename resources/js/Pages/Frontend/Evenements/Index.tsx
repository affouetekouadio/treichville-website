import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Clock, Tag, Users, Sparkles, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Evenement } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

type EvenementsPageProps = {
  evenements?: Evenement[];
};

const fallbackImages = [
  // Événements culturels
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",

  // Événements sportifs
  "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=80",

  // Événements festifs
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=80",

  // Événements citoyens/sociaux
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80",

  // Événements variés
  "https://images.unsplash.com/photo-1515165562835-c3b8e0ea7d83?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80",
];

function futureIso(daysFromNow: number, hour: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function pastIso(daysAgo: number, hour: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

const fallbackEvents: Evenement[] = [
  // ÉVÉNEMENTS À VENIR
  {
    id: 1,
    titre: "Festival des saveurs de Treichville",
    description: "Découverte de la gastronomie locale, concerts live et animations familiales. Venez déguster les meilleurs plats de notre commune.",
    categorie: "Culturel",
    image_url: fallbackImages[0],
    date_debut: futureIso(14, 10),
    date_fin: futureIso(14, 18),
    lieu: "Esplanade de la mairie",
    gratuit: false,
  },
  {
    id: 2,
    titre: "Course lagunaire solidaire",
    description: "Parcours 5 km et 10 km le long des berges pour soutenir les associations locales. Inscription sur place.",
    categorie: "Sportif",
    image_url: fallbackImages[3],
    date_debut: futureIso(28, 7),
    date_fin: futureIso(28, 11),
    lieu: "Berges lagunaires",
    gratuit: false,
  },
  {
    id: 3,
    titre: "Nuit de la culture urbaine",
    description: "Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune. Une soirée exceptionnelle.",
    categorie: "Festif",
    image_url: fallbackImages[6],
    date_debut: futureIso(42, 18),
    date_fin: futureIso(42, 23),
    lieu: "Centre culturel de Treichville",
    gratuit: false,
  },
  {
    id: 4,
    titre: "Forum des associations",
    description: "Rencontre des associations locales, ateliers participatifs et débats citoyens pour construire ensemble l'avenir.",
    categorie: "Citoyen",
    image_url: fallbackImages[9],
    date_debut: futureIso(7, 9),
    date_fin: futureIso(7, 16),
    lieu: "Maison des jeunes",
    gratuit: true,
  },
  {
    id: 5,
    titre: "Salon de l'emploi jeunes",
    description: "Entreprises, formations et coaching pour l'insertion professionnelle. Plus de 50 entreprises présentes.",
    categorie: "Citoyen",
    image_url: fallbackImages[11],
    date_debut: futureIso(21, 9),
    date_fin: futureIso(21, 17),
    lieu: "Salle des fêtes municipale",
    gratuit: true,
  },
  {
    id: 6,
    titre: "Concert lagunaire",
    description: "Concert en plein air avec des artistes locaux et animations familiales. Restauration sur place.",
    categorie: "Festif",
    image_url: fallbackImages[8],
    date_debut: futureIso(35, 18),
    date_fin: futureIso(35, 23),
    lieu: "Berges de Treichville",
    gratuit: false,
  },
  {
    id: 7,
    titre: "Tournoi de football inter-quartiers",
    description: "Compétition amicale entre les équipes des différents quartiers de Treichville. Venez supporter votre équipe !",
    categorie: "Sportif",
    image_url: fallbackImages[4],
    date_debut: futureIso(49, 14),
    date_fin: futureIso(49, 18),
    lieu: "Stade municipal",
    gratuit: true,
  },
  {
    id: 8,
    titre: "Exposition d'art contemporain",
    description: "Découvrez les œuvres d'artistes locaux émergents. Vernissage en présence des artistes.",
    categorie: "Culturel",
    image_url: fallbackImages[2],
    date_debut: futureIso(56, 15),
    date_fin: futureIso(56, 20),
    lieu: "Galerie municipale",
    gratuit: true,
  },

  // ÉVÉNEMENTS PASSÉS
  {
    id: 101,
    titre: "Journée citoyenne du nettoyage",
    description: "Mobilisation générale pour nettoyer nos quartiers et embellir notre commune. Plus de 300 participants.",
    categorie: "Citoyen",
    image_url: fallbackImages[10],
    date_debut: pastIso(7, 8),
    date_fin: pastIso(7, 12),
    lieu: "Divers quartiers",
    gratuit: true,
  },
  {
    id: 102,
    titre: "Concert de jazz au clair de lune",
    description: "Une soirée magique avec les meilleurs jazzmen de la région. Ambiance conviviale garantie.",
    categorie: "Festif",
    image_url: fallbackImages[7],
    date_debut: pastIso(14, 19),
    date_fin: pastIso(14, 23),
    lieu: "Place de la République",
    gratuit: false,
  },
  {
    id: 103,
    titre: "Marathon de Treichville",
    description: "5ème édition du marathon annuel avec plus de 2000 participants. Parcours au bord de la lagune.",
    categorie: "Sportif",
    image_url: fallbackImages[5],
    date_debut: pastIso(21, 7),
    date_fin: pastIso(21, 13),
    lieu: "Départ Esplanade de la mairie",
    gratuit: false,
  },
  {
    id: 104,
    titre: "Fête de la musique",
    description: "Concerts gratuits dans toute la commune avec plus de 30 groupes. Une journée exceptionnelle.",
    categorie: "Culturel",
    image_url: fallbackImages[1],
    date_debut: pastIso(35, 14),
    date_fin: pastIso(35, 23),
    lieu: "Divers lieux",
    gratuit: true,
  },
  {
    id: 105,
    titre: "Salon du livre et de la lecture",
    description: "Rencontres avec des auteurs, dédicaces et ateliers d'écriture. Plus de 50 auteurs présents.",
    categorie: "Culturel",
    image_url: fallbackImages[14],
    date_debut: pastIso(42, 10),
    date_fin: pastIso(42, 18),
    lieu: "Bibliothèque municipale",
    gratuit: true,
  },
  {
    id: 106,
    titre: "Carnaval de Treichville",
    description: "Défilé haut en couleur avec chars, costumes et musique. Plus de 5000 spectateurs.",
    categorie: "Festif",
    image_url: fallbackImages[15],
    date_debut: pastIso(56, 15),
    date_fin: pastIso(56, 20),
    lieu: "Boulevard principal",
    gratuit: true,
  },
  {
    id: 107,
    titre: "Forum santé et bien-être",
    description: "Dépistages gratuits, conseils nutrition et activités physiques. Stands d'information.",
    categorie: "Citoyen",
    image_url: fallbackImages[16],
    date_debut: pastIso(63, 9),
    date_fin: pastIso(63, 16),
    lieu: "Centre de santé communautaire",
    gratuit: true,
  },
  {
    id: 108,
    titre: "Gala de danse urbaine",
    description: "Spectacle de hip-hop, breakdance et afro-fusion par les jeunes talents de la commune.",
    categorie: "Festif",
    image_url: fallbackImages[17],
    date_debut: pastIso(70, 19),
    date_fin: pastIso(70, 22),
    lieu: "Salle polyvalente",
    gratuit: false,
  },
];

const Evenements: FrontendPage<EvenementsPageProps> = ({ evenements = [] }) => {
  const isLoading = false;
  const dataset = (evenements?.length ?? 0) > 0 ? evenements : fallbackEvents;
  const eventsWithImages = dataset.map((evt, idx) => ({
    ...evt,
    image_url: evt.image_url || fallbackImages[idx % fallbackImages.length],
  }));

  const categoryColors = {
    "Culturel": "bg-purple-600",
    "Sportif": "bg-green-600",
    "Familial": "bg-blue-600",
    "Citoyen": "bg-orange-600",
    "Festif": "bg-pink-600",
    "Social": "bg-teal-600"
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEventsBase = eventsWithImages.filter((e) => new Date(e.date_debut) >= today);
  const pastEvents = eventsWithImages.filter((e) => new Date(e.date_debut) < today);
  const fallbackUpcoming = fallbackEvents.filter((e) => new Date(e.date_debut) >= today);
  const upcomingEvents = upcomingEventsBase.length ? upcomingEventsBase : fallbackUpcoming;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
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
            <p className="text-xl text-white/90 leading-relaxed">
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
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-8 h-8 text-[#f8812f]" />
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Événements à venir</h2>
                </div>
                <p className="text-gray-600 ml-11">Ne manquez pas ces prochains rendez-vous</p>
              </motion.div>

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
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={event.image_url}
                            alt={event.titre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                          {/* Badge Gratuit */}
                          {event.gratuit && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                              Gratuit
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <Badge className={`${badgeClass} text-white border-0 mb-3`}>
                            {event.categorie}
                          </Badge>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1d8595] transition-colors">
                            {event.titre}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                          <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#f8812f]" />
                              <span className="font-medium">{format(eventStart, "EEEE d MMMM yyyy", { locale: fr })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#f8812f]" />
                              <span>{format(eventStart, "HH:mm", { locale: fr })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#f8812f]" />
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Événements passés</h2>
                  </div>
                  <p className="text-gray-600 ml-11">Revivez les moments forts de notre commune</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event, index) => {
                    const badgeClass =
                      categoryColors[event.categorie as keyof typeof categoryColors] || "bg-gray-600";
                    const eventStart = new Date(event.date_debut);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={event.image_url}
                            alt={event.titre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

                          {/* Badge Terminé */}
                          <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Terminé
                          </div>
                        </div>

                        <div className="p-6">
                          <Badge className={`${badgeClass} text-white border-0 mb-3 opacity-75`}>
                            {event.categorie}
                          </Badge>

                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {event.titre}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{format(eventStart, "d MMMM yyyy", { locale: fr })}</span>
                          </div>
                        </div>
                      </motion.div>
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
