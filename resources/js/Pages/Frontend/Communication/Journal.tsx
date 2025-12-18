import React from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import PageBanner from "@/components/Frontend/PageBanner";

const editions = [
  {
    title: "Journal municipal - Édition Juin 2024",
    size: "0.6 Mo - PDF",
    url: "/pdfs/journal-2024-06.pdf",
  },
  {
    title: "Journal municipal - Édition Mars 2024",
    size: "0.6 Mo - PDF",
    url: "/pdfs/journal-2024-03.pdf",
  },
  {
    title: "Journal municipal - Édition Décembre 2023",
    size: "0.7 Mo - PDF",
    url: "/pdfs/journal-2023-12.pdf",
  },
];

const Journal: FrontendPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="Journal municipal"
        variant="compact"
      />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-white border border-amber-100 text-amber-800 rounded-xl p-4 text-sm font-medium">
          Téléchargement direct : chaque édition est hébergée sur le site de la mairie et peut être consultée hors ligne.
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {editions.map((edition, idx) => (
            <motion.div
              key={edition.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8812f]/15 text-[#f8812f] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{edition.title}</h2>
              <p className="text-sm text-gray-500 mb-6">{edition.size}</p>
              <a
                href={edition.url}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f8812f] text-white font-semibold hover:bg-orange-600 transition-colors"
                download
              >
                <Download className="w-4 h-4" />
                Télécharger le PDF
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

Journal.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Journal;
