import React from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import PageBanner from "@/components/Frontend/PageBanner";
import { usePage } from "@inertiajs/react";

type JournalEdition = {
  id: number;
  title: string;
  description?: string | null;
  size?: string | null;
  url: string;
  download_url?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
};

type JournalProps = {
  editions?: JournalEdition[];
};

const Journal: FrontendPage = () => {
  const { props } = usePage<JournalProps>();
  const editions = props.editions ?? [];

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
              key={edition.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col"
            >
              {edition.cover_image ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-gray-100">
                  <img
                    src={edition.cover_image}
                    alt={edition.title}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#f8812f]/15 text-[#f8812f] flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
              )}
              <h2 className="text-lg font-bold text-gray-900 mb-2">{edition.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{edition.size || 'PDF'}</p>
              {edition.description && (
                <p className="text-sm text-gray-600 mb-4">{edition.description}</p>
              )}
              <a
                href={edition.download_url || edition.url}
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
