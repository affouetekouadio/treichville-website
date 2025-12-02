import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Clock, Euro } from "lucide-react";
import type { Evenement } from "@/types/content";

type Props = {
  evenements?: Evenement[];
};

export default function EvenementsSection({ evenements = [] }: Props) {
  const futurEvenements = evenements.filter((evt) => {
    const start = evt.date_debut ? new Date(evt.date_debut) : null;
    if (!start || Number.isNaN(start.getTime())) return false;
    return start >= new Date();
  });
  const displayEvents = (futurEvenements.length ? futurEvenements : evenements).slice(0, 3);
  const accentPalette = ["#D4AF37", "#1d8595", "#f8812f"];

  return (
    <section id="evenements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-4">
            <span className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase">Événements</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
            Vivez votre territoire
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les prochains événements près de chez vous
          </p>
        </motion.div>

        {/* Cards */}
        {displayEvents.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayEvents.map((evt, index) => {
              const eventStart = new Date(evt.date_debut);
              const eventEnd = evt.date_fin ? new Date(evt.date_fin) : null;
              const accent = accentPalette[index % accentPalette.length];
              return (
                <motion.article
                  key={evt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative overflow-hidden rounded-2xl border border-[#0A1628]/20 shadow-xl bg-[#0A1628] text-white"
                  style={{ boxShadow: `0 14px 38px -16px ${accent}80` }}
                >
                  <div className="h-48 bg-gray-200 relative">
                    {evt.image_url ? (
                      <img
                        src={evt.image_url}
                        alt={evt.titre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0A1628] to-[#122544]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-[#0A1628]/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur text-white text-xs font-semibold border"
                        style={{ backgroundColor: "#ffffff20", borderColor: accent }}
                      >
                        {evt.categorie}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 bg-gradient-to-b from-[#0A1628] to-[#10274a]">
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: accent }} />
                        <span>{format(eventStart, "d MMM yyyy", { locale: fr })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: accent }} />
                        <span>
                          {format(eventStart, "HH:mm")}
                          {eventEnd && ` - ${format(eventEnd, "HH:mm")}`}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">{evt.titre}</h3>
                    <p className="text-white/80 leading-relaxed line-clamp-3">{evt.description}</p>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{ color: accent }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{evt.lieu}</span>
                      </div>
                      {evt.gratuit && (
                        <span className="text-green-300 text-sm font-semibold inline-flex items-center gap-1">
                          <Euro className="w-4 h-4" />
                          Gratuit
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                  />
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun événement à venir</p>
          </div>
        )}
      </div>
    </section>
  );
}
