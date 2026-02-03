import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

const annexes = [
  {
    title: "Le grand marché de Treichville",
    image: "/grand-marche-treichville.png",
    description:
      "Reconstruit et mis en service en 2003, il est l'un des principaux pôles commerciaux d'Abidjan. Structuré autour de plusieurs halls, allées couvertes, boutiques, étals et zones spécialisées, il s'étend sur plus de 26 000 m². Véritable coeur économique de Treichville, il joue un rôle clé dans l'approvisionnement et la vie sociale de la commune.",
  },
  {
    title: "Le port Autonome d'Abidjan",
    image: "/port-abidjan.jpg",
    description:
      "Mis en service en 1951, il constitue l'un des piliers majeurs du développement économique et politique de la Côte d'Ivoire. Sa proximité immédiate avec Treichville a structuré la commune, devenue un centre stratégique de main-d'oeuvre, de commerce et de services liés aux activités portuaires.",
  },
  {
    title: "Palais de la culture",
    image: "/palais-culture.png",
    description:
      "Inauguré en 1999, c'est l'un des plus grands complexes culturels d'Afrique de l'Ouest. Il comprend plusieurs salles de spectacles, d'exposition et de conférence, et accueille des événements culturels et institutionnels de grande envergure.",
  },
  {
    title: "Le CHU de Treichville",
    image: "/chu.jpg",
    description:
      "Créé en 1938 et érigé en Centre Hospitalier Universitaire en 1964, il joue un rôle majeur dans la prise en charge médicale, la formation des professionnels de santé et la recherche. Situé au coeur de la commune, il constitue une référence sanitaire nationale.",
  },
  {
    title: "La mosquée Mohamed IV",
    image: "/mosquee.webp",
    description:
      "D'une superficie d'environ 25 000 m², elle peut accueillir plus de 7 000 fidèles et dispose d'espaces annexes dédiés au culte, à l'administration et à la culture. Offerte par Sa Majesté le Roi Mohammed VI du Maroc, elle symbolise la fraternité avec la Côte d'Ivoire.",
  },
  {
    title: "Le Parc des Sports de Treichville",
    image: "/palais-des-sports.jpg",
    description:
      "Inauguré en 1952, il comprend un stade principal et plusieurs infrastructures dédiées aux activités sportives et aux grands rassemblements. Lieu emblématique du sport ivoirien, il demeure un symbole fort de la vie sportive et sociale de Treichville.",
  },
  {
    title: "La Maison Culturelle N'zassa",
    image: "/maisnon-nzassa.jpg",
    description:
      "Inaugurée le 28 juillet 2024, cette maison culturelle moderne promeut les arts, la créativité et la cohésion sociale. Elle comprend une grande salle polyvalente André Kouassi Lenoir, des espaces d'exposition, des bureaux administratifs et des zones dédiées aux activités culturelles et sociales.",
  },
];

const Annexes: FrontendPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % annexes.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + annexes.length) % annexes.length);
  };

  return (
    <>
      <PageBanner
        title="Annexes"
        subtitle="Repères institutionnels et lieux emblématiques de Treichville"
        image="/images/treichville-3.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Annexes</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Repères institutionnels
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Des infrastructures majeures qui illustrent l'histoire, l'économie et la culture de Treichville.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {annexes.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative w-full group cursor-pointer"
                  aria-label={`Voir ${item.title} en grand`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-colors duration-500" />
                </button>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              className="relative max-w-7xl w-full px-4 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={annexes[currentImageIndex].image}
                alt={annexes[currentImageIndex].title}
                className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center max-w-3xl"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {annexes[currentImageIndex].title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {annexes[currentImageIndex].description}
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  {currentImageIndex + 1} / {annexes.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Annexes.layout = (page: React.ReactElement) => <FrontendLayout>{page}</FrontendLayout>;

export default Annexes;
