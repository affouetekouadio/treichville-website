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
      description: "Équipements sportifs, agendas des clubs et programmes pour la jeunesse.",
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
  const accentPalette = ["#f8812f", "#1d8595", "#D4AF37", "#0A1628", "#22c55e", "#ea580c"];

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
            const accent = accentPalette[index % accentPalette.length];
            const bgImage =
              service.icone === "Sprout"
                ? "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80"
                : service.icone === "Coins"
                  ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80"
                  : service.icone === "Heart"
                    ? "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80"
                    : service.icone === "Users"
                      ? "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?auto=format&fit=crop&w=1400&q=80"
                      : service.icone === "Building"
                        ? "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1400&q=80"
                        : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80";
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="snap-start min-w-[280px] md:min-w-[320px] bg-[#0b172b] text-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group border border-white/10"
                style={{ boxShadow: `0 14px 38px -18px ${accent}80` }}
              >
                <div className="relative h-40">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.65)), url('${bgImage}')` }}
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur"
                    style={{ borderColor: accent, backgroundColor: `${accent}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                    <span>{service.categorie ?? "Service municipal"}</span>
                  </div>
                </div>

                <div className="p-7 space-y-4 bg-gradient-to-b from-[#0b172b] to-[#11284c]">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accent}25` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: accent }} />
                  </div>
                  <h3 className="text-xl font-bold leading-tight">{service.nom}</h3>
                  <p className="text-white/80 leading-relaxed">
                    {service.description}
                  </p>
                  {service.lien_externe && (
                    <a
                      href={service.lien_externe}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: accent }}
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
