import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Building,
  Home,
  Sprout,
  Heart,
  Briefcase,
  Coins,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import type { Service as ServiceRecord } from "@/types/content";
import { createPageUrl } from "@/utils";

const iconMap = {
  FileText,
  Users,
  Building,
  Home,
  Sprout,
  Heart,
  Briefcase,
  Coins,
};

type Props = {
  services?: ServiceRecord[];
};

export default function ServicesSection({ services = [] }: Props) {
  const fallbackServices: ServiceRecord[] = [
    {
      id: "etat-civil",
      nom: "État civil",
      description: "Actes de naissance, mariage, décès et mise à jour des documents officiels.",
      icone: "FileText",
      lien_externe: createPageUrl("EtatCivil"),
    },
    {
      id: "urbanisme",
      nom: "Urbanisme & permis",
      description: "Permis de construire, conformité et suivi des chantiers dans la commune.",
      icone: "Building",
      lien_externe: createPageUrl("Fiscalite"),
    },
    {
      id: "fiscalite",
      nom: "Fiscalité locale",
      description: "Paiement des taxes, fiscalité des marchés et des entreprises locales.",
      icone: "Coins",
      lien_externe: createPageUrl("Fiscalite"),
    },
    {
      id: "solidarite",
      nom: "Solidarité & santé",
      description: "Aides sociales, accompagnement des familles et santé communautaire.",
      icone: "Heart",
      lien_externe: createPageUrl("Services"),
    },
    {
      id: "jeunesse",
      nom: "Jeunesse & sport",
      description: "Équipements sportifs, agenda des clubs et programmes pour la jeunesse.",
      icone: "Users",
      lien_externe: createPageUrl("Evenements"),
    },
    {
      id: "environnement",
      nom: "Environnement",
      description: "Propreté urbaine, collecte des déchets et initiatives écologiques.",
      icone: "Sprout",
      lien_externe: createPageUrl("ParcsPiscines"),
    },
  ];

  const items = useMemo(() => (services.length ? services : fallbackServices), [services]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const accent = "#f8812f";
  const bgImagesByKey: Record<string, string> = {
    FileText: "/images/etat-civil-2.jpg", // état civil / démarches
    Building: "/images/palais.jpg",
    Coins: "/images/fiscalite-locale.jpg",
    Heart: "/images/mairie.jpg",
    // Users: "/images/treichville-1.jpeg",
    Users: "/images/palais-des-sports.jpg",
    Sprout: "/images/treichville-3.jpg",
  };

  const handleScroll = (direction: "prev" | "next") => {
    const node = scrollRef.current;
    if (!node) return;
    const width = node.clientWidth;
    node.scrollBy({ left: direction === "next" ? width : -width, behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#f8812f]/10 rounded-full mb-4">
            <span className="text-[#f8812f] font-semibold text-sm tracking-wider uppercase">
              À VOTRE SERVICE
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Services municipaux de Treichville
          </h2>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => handleScroll("prev")}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow hover:-translate-y-0.5 transition-all flex items-center justify-center"
              aria-label="Précédent"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => handleScroll("next")}
              className="w-12 h-12 rounded-full bg-[#f8812f] text-white shadow hover:-translate-y-0.5 transition-all flex items-center justify-center"
              aria-label="Suivant"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Services slider */}
        <div
          ref={scrollRef}
          className="relative flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar"
        >
          {items.map((service, index) => {
            const iconKey = (service.icone as keyof typeof iconMap) ?? "FileText";
            const Icon = iconMap[iconKey] || FileText;
            const bgImage = bgImagesByKey[iconKey] ?? "/images/treichville-4.jpg";
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="snap-start min-w-[300px] md:min-w-[360px] bg-[#fff7ef] text-[#0f172a] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group border border-white/10"
                style={{ boxShadow: `0 14px 38px -18px ${accent}80` }}
              >
                <div className="relative h-60 md:h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55)), url('${bgImage}')`,
                    }}
                  />
                  <div
                    className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur"
                    style={{ borderColor: accent, backgroundColor: `${accent}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                    <span>{service.categorie ?? "Service municipal"}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 bg-gradient-to-b from-[#fff7ef] via-[#ffdcb8] to-[#f39a4a]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#c75d0d" }} />
                  </div>
                  <h3 className="text-lg font-bold leading-tight">{service.nom}</h3>
                  <p className="text-[#1f2937] leading-relaxed text-sm">{service.description}</p>
                  {service.lien_externe && (
                    <a
                      href={service.lien_externe}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors px-3 py-2 rounded-full"
                      style={{ backgroundColor: "#c75d0d" }}
                    >
                      En savoir plus →
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
