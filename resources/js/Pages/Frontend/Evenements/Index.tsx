import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Clock, Tag, Users, Sparkles, CheckCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Evenement } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";
import { evenementDetailUrl, slugify } from "@/utils";
import ListingPagination from "@/components/listing/ListingPagination";
import { listingVisit } from "@/lib/listing";

type EvenementsPageProps = {
  evenements?: Evenement[];
  categories?: { id: number; name: string }[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  filters?: {
    search?: string;
    category?: string;
  };
};

const Evenements: FrontendPage<EvenementsPageProps> = () => {
  const { props, url } = usePage<EvenementsPageProps>();
  const baseUrl = url.split("?")[0];
  const evenements = props.evenements ?? [];
  const categories = props.categories ?? [];
  const pagination = props.pagination ?? {
    page: 1,
    per_page: 12,
    total: evenements.length,
    last_page: 1,
  };
  const filters = props.filters ?? {};
  const isLoading = false;
  const [selectedCategory, setSelectedCategory] = React.useState(
    filters.category && filters.category.trim() !== "" ? filters.category : "Toutes"
  );
  const [searchQuery, setSearchQuery] = React.useState(filters.search ?? "");
  const eventsWithImages = evenements.map((evt) => ({
    ...evt,
    slug: evt.slug ?? slugify(evt.titre),
  }));

  const categoryNames = categories.length
    ? categories.map((cat) => cat.name)
    : Array.from(new Set(eventsWithImages.map((evt) => evt.categorie).filter(Boolean)));
  const categoryOptions = ["Toutes", ...categoryNames];

  useEffect(() => {
    setSelectedCategory(
      filters.category && filters.category.trim() !== "" ? filters.category : "Toutes"
    );
    setSearchQuery(filters.search ?? "");
  }, [filters.category, filters.search]);

  const applyFilters = (nextCategory = selectedCategory) => {
    const normalizedCategory =
      !nextCategory || nextCategory === "Toutes" ? "" : nextCategory;
    listingVisit(baseUrl, {
      search: searchQuery.trim(),
      category: normalizedCategory,
      page: 1,
      per_page: pagination.per_page,
    });
  };

  const categoryColors = {
    "Culturel": "bg-purple-600",
    "Sportif": "bg-green-600",
    "Familial": "bg-blue-600",
    "Citoyen": "bg-orange-600",
    "Festif": "bg-pink-600",
    "Social": "bg-[#03800a]"
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEventsBase = eventsWithImages.filter((e) => new Date(e.date_debut) >= today);
  const pastEvents = eventsWithImages.filter((e) => new Date(e.date_debut) < today);
  const upcomingEvents = upcomingEventsBase;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <PageBanner
        title="Événements"
        variant="compact"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <form
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          onSubmit={(event) => {
            event.preventDefault();
            applyFilters();
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    applyFilters(cat);
                  }}
                  className={selectedCategory === cat ? "bg-[var(--primary-orange)] hover:bg-orange-600" : ""}
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
            <Button type="submit" className="bg-[var(--primary-orange)] hover:bg-orange-600">
              Rechercher
            </Button>
          </div>
        </form>
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
                    const detailUrl = evenementDetailUrl(event.slug ?? slugify(event.titre));
                    return (
                      <Link key={event.id} href={detailUrl} className="block">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                        <div className="relative h-56 overflow-hidden">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.titre}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                              <Tag className="h-8 w-8" />
                            </div>
                          )}
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

                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#03800a] transition-colors">
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
                      </Link>
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
                    const detailUrl = evenementDetailUrl(event.slug ?? slugify(event.titre));
                    return (
                      <Link key={event.id} href={detailUrl} className="block">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                        <div className="relative h-48 overflow-hidden">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.titre}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                              <Tag className="h-7 w-7" />
                            </div>
                          )}
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
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <ListingPagination
              page={pagination.page}
              lastPage={pagination.last_page}
              total={pagination.total}
              onPageChange={(page) =>
                listingVisit(baseUrl, {
                  search: searchQuery.trim(),
                  category: selectedCategory === "Toutes" ? "" : selectedCategory,
                  page,
                  per_page: pagination.per_page,
                })
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

Evenements.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Evenements;
