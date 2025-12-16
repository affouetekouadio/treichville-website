import React from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

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
      <section className="relative bg-gradient-to-br from-[#03800a] to-[#0f6b7a] py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#03800a]/40 via-[#03800a]/55 to-[#0f6b7a]/65" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Journal municipal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Retrouvez les dernières éditions à feuilleter ou télécharger en PDF.
          </motion.p>
        </div>
      </section>

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
