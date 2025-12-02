import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Building, BookOpen } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

const Histoire: FrontendPage = () => {
  const timeline = [
    { year: "1934", title: "Création de Treichville", description: "Fondation officielle de la commune, nommée en l'honneur de Marcel Treich-Laplène." },
    { year: "1960", title: "Indépendance", description: "Treichville devient une commune à part entière de la jeune République de Côte d'Ivoire." },
    { year: "1980", title: "Expansion", description: "Développement des infrastructures et croissance démographique importante." },
    { year: "2000", title: "Modernisation", description: "Lancement de grands projets d'aménagement et de rénovation urbaine." },
    { year: "Aujourd'hui", title: "Treichville moderne", description: "Une commune dynamique, cœur économique et culturel d'Abidjan." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageBanner
        title="Notre Histoire"
        description="Découvrez l'histoire riche et fascinante de Treichville, berceau culturel d'Abidjan"
        icon={BookOpen}
        variant="compact"
        align="left"
        gradient={{
          from: "#1d8595",
          to: "#0d7490",
        }}
      />

      {/* Présentation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block w-12 h-1 bg-[#f8812f] mb-6"></span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Présentation de Treichville
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Treichville est une commune emblématique d'Abidjan, située au cœur de la capitale économique 
                de la Côte d'Ivoire. Connue pour son dynamisme commercial, sa richesse culturelle et son 
                histoire unique, elle représente un véritable melting-pot de cultures et de traditions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Avec ses marchés animés, ses quartiers historiques et sa population cosmopolite, 
                Treichville incarne l'âme d'Abidjan. La commune abrite également le célèbre Port d'Abidjan, 
                poumon économique de la sous-région.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800"
                alt="Treichville"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, value: "1934", label: "Année de création" },
              { icon: Users, value: "150 000+", label: "Habitants" },
              { icon: MapPin, value: "7.29 km²", label: "Superficie" },
              { icon: Building, value: "10+", label: "Quartiers" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50"
              >
                <div className="w-14 h-14 bg-[#f8812f] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Les grandes dates
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#1d8595]/20"></div>
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <span className="inline-block px-3 py-1 bg-[#f8812f] text-white text-sm font-bold rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1d8595] rounded-full border-4 border-white shadow"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

Histoire.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Histoire;
