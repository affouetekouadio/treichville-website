import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Radio, Video } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { createPageUrl } from "@/utils";
import { Link } from "@inertiajs/react";

const radioUrl = "https://radio.treichville.ci";

const tiles = [
  {
    icon: BookOpen,
    title: "Journal municipal",
    description: "Consultez et téléchargez les éditions du journal.",
    href: createPageUrl("Journal"),
  },
  {
    icon: Radio,
    title: "Radio communale",
    description: "Accédez directement au site officiel de la radio.",
    href: radioUrl,
    external: true,
  },
  {
    icon: Video,
    title: "Chaîne vidéo",
    description: "Découvrez les vidéos officielles de la mairie.",
    href: createPageUrl("Video"),
  },
];

const CommunicationIndex: FrontendPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative bg-gradient-to-br from-[#f8812f] to-[#f5b166] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80')] opacity-15 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
              Communication
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Restez connectés avec la Mairie
            </h1>
            <p className="text-lg text-white/90">
              Journal, radio, vidéos : retrouvez l’information officielle là où vous êtes.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {tiles.map((tile, idx) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8812f]/15 text-[#f8812f] flex items-center justify-center mb-4">
                <tile.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{tile.title}</h2>
              <p className="text-gray-600 mb-6 flex-1">{tile.description}</p>
              {tile.external ? (
                <a
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#f8812f] font-semibold"
                >
                  Ouvrir →
                </a>
              ) : (
                <Link
                  href={tile.href}
                  className="inline-flex items-center gap-2 text-[#f8812f] font-semibold"
                >
                  Découvrir →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

CommunicationIndex.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default CommunicationIndex;
