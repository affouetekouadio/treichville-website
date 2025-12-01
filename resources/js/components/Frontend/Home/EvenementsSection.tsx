import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { civClient } from "@/api/civClient";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Clock, Euro } from "lucide-react";
import type { Evenement } from "@/types/content";

export default function EvenementsSection() {
  const { data: evenements = [] } = useQuery<Evenement[]>({
    queryKey: ['evenements'],
    queryFn: () => civClient.entities.Evenement.list<Evenement>('date_debut', 8),
  });

  const futurEvenements = evenements.filter(evt => new Date(evt.date_debut) >= new Date());

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

        {/* Timeline */}
        {futurEvenements.length > 0 ? (
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

            {futurEvenements.map((evt, index) => {
              const eventStart = new Date(evt.date_debut);
              const eventEnd = evt.date_fin ? new Date(evt.date_fin) : null;
              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-12 lg:mb-20 ${
                    index % 2 === 0 ? "lg:pr-1/2" : "lg:pl-1/2 lg:ml-auto"
                  } lg:w-1/2`}
                >
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute top-8 -right-3 lg:left-auto w-6 h-6 bg-[#D4AF37] rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Date Block */}
                    <div className="flex-shrink-0 text-center bg-[#0A1628] text-white rounded-xl p-4 w-24">
                      <div className="text-3xl font-bold">
                        {format(eventStart, "dd")}
                      </div>
                      <div className="text-sm uppercase tracking-wider">
                        {format(eventStart, "MMM", { locale: fr })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm font-semibold mb-3">
                        {evt.categorie}
                      </div>

                      <h3 className="text-2xl font-bold text-[#0A1628] mb-3">
                        {evt.titre}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#D4AF37]" />
                            <span>
                              {format(eventStart, "HH:mm")}
                              {eventEnd && ` - ${format(eventEnd, "HH:mm")}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          <span>{evt.lieu}</span>
                        </div>
                        {evt.gratuit && (
                          <div className="flex items-center gap-2">
                            <Euro className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-semibold">Gratuit</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
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