import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Radio, Video } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { createPageUrl } from "@/utils";
import { Link } from "@inertiajs/react";
import PageBanner from "@/components/Frontend/PageBanner";

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
      <PageBanner
        title="Restez connectés avec la Mairie"
        variant="compact"
      />

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
