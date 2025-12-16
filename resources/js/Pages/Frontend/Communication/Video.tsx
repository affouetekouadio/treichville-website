import React from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const youtubeChannelUrl = "https://www.youtube.com/@MairieTreichville";
const videos = [
  { title: "Mot du Maire - Rentrée citoyenne", id: "ScMzIvxBSi4" },
  { title: "Treichville en images - Développement urbain", id: "ysz5S6PUM-U" },
  { title: "Culture et sport : moments forts", id: "aqz-KE-bpKQ" },
];

const VideoPage: FrontendPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#f8812f] to-[#f4a85f] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Chaîne vidéo officielle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Suivez les actions de la mairie en vidéo : événements, coulisses et messages officiels.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-[#f8812f] font-semibold">
            <Youtube className="w-6 h-6" />
            <span>Chaîne YouTube officielle</span>
          </div>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#f8812f] text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            S'abonner
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="aspect-video bg-gray-200">
                <iframe
                  title={video.title}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Extrait de démonstration en attendant les vidéos officielles.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

VideoPage.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default VideoPage;
