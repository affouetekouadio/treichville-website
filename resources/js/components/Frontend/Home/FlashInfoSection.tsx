import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Megaphone } from "lucide-react";
import { createPageUrl } from "@/utils";

const flashItems = [
  {
    label: "Alerte",
    message: "Coupure d'eau prévue ce soir de 20h à 23h dans les quartiers Arras et Biafra.",
    link: "Actualites",
  },
  {
    label: "Événement",
    message: "Fermeture temporaire du boulevard de Marseille ce samedi pour la course lagunaire.",
    link: "Evenements",
  },
  {
    label: "Service",
    message: "Nouvelle permanence passeport ouverte à la mairie annexe du Plateau.",
    link: "EtatCivil",
  },
];

export default function FlashInfoSection() {
  const items = [...flashItems, ...flashItems];

  return (
    <section className="relative z-30 py-4">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="rounded-2xl bg-[#f8812f] text-white shadow-lg overflow-hidden">
          <div className="px-5 lg:px-6 py-3 flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold uppercase tracking-wide text-sm shrink-0">
              <Megaphone className="w-5 h-5" />
              <span>Flash info</span>
            </div>

            <div className="relative overflow-hidden flex-1">
              <motion.div
                className="flex items-center gap-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              >
                {items.map((item, index) => (
                  <Link
                    key={`${item.label}-${index}`}
                    href={createPageUrl(item.link)}
                    className="flex items-center gap-3 text-sm font-medium hover:text-white/80 transition-colors"
                  >
                    <span className="px-2 py-1 rounded-full bg-white/15 border border-white/20">
                      {item.label}
                    </span>
                    <span className="whitespace-nowrap">
                      {item.message}
                    </span>
                  </Link>
                ))}
              </motion.div>
            </div>

            <Link
              href={createPageUrl("Actualites")}
              className="text-sm font-semibold underline decoration-white/60 decoration-2 underline-offset-4 hover:text-white/80 transition-colors shrink-0"
            >
              Voir tout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
