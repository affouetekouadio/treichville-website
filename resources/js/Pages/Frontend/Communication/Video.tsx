import React from "react";
import { motion } from "framer-motion";
import { Youtube, Play } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const youtubeChannelUrl = "https://www.youtube.com/@MairieTreichville";
const videos = [
  { title: "Mot du Maire - Rentrée citoyenne" },
  { title: "Treichville en images - Développement urbain" },
  { title: "Culture et sport : moments forts" },
  { title: "Vie associative et initiatives locales" },
  { title: "Projets urbains : coulisses" },
  { title: "Jeunesse & Sports : temps forts" },
];

const VideoPage: FrontendPage = () => {
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
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="aspect-video bg-gradient-to-br from-[#f8812f] to-[#f4a85f] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative w-16 h-16 rounded-2xl bg-white text-[#f8812f] flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8" />
                </div>
                <span className="absolute bottom-3 right-3 text-xs font-semibold text-white/80 bg-black/30 px-3 py-1 rounded-full">
                  Bientôt
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Bientôt disponible sur la chaîne officielle.</p>
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
