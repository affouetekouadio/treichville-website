import React from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const RadioPage: FrontendPage = () => {
  const radioUrl = "https://radio.treichville.ci";

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#03800a] to-[#0f6b7a] py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Radio communale
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Informations officielles, alertes, événements en direct et programmes de proximité.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#03800a]/15 text-[#03800a] flex items-center justify-center mx-auto mb-4">
            <Radio className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Écouter la radio de Treichville</h2>
          <p className="text-gray-600 mb-6">
            Accédez au site officiel de la radio communale pour écouter en ligne, consulter la grille des programmes
            et suivre les dernières annonces.
          </p>
          <a
            href={radioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#03800a] text-white font-semibold hover:bg-[#176c79] transition-colors"
          >
            Accéder au site de la radio
          </a>
        </motion.div>
      </div>
    </div>
  );
};

RadioPage.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default RadioPage;
