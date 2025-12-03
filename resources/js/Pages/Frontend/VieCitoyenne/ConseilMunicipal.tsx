import React from "react";
import { motion } from "framer-motion";
import { Calendar, Landmark, MapPin, Users, Award, Target, Briefcase, Heart, FileText, MessageCircle, ChevronRight } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";

const membres = [
  { name: "Adjoint 1", role: "4ème adjoint", photo: "/images/personnes/1.jpg", focus: "Vie citoyenne & proximité", icon: Users },
  { name: "Adjoint 2", role: "3ème adjoint", photo: "/images/personnes/2.jpg", focus: "Culture & patrimoine", icon: Landmark },
  { name: "Adjoint 3", role: "2ème adjoint", photo: "/images/personnes/3.jpg", focus: "Urbanisme & cadre de vie", icon: MapPin },
  { name: "Adjoint 4", role: "5ème adjoint", photo: "/images/personnes/4.jpg", focus: "Jeunesse & sports", icon: Award },
];

const commissions = [
  {
    name: "Culture et Patrimoine",
    lead: "Mme Kouadio",
    focus: "Valoriser les sites emblématiques et soutenir la création locale.",
    icon: Landmark,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Jeunesse et Sports",
    lead: "M. Traoré",
    focus: "Soutenir les clubs, les écoles et les initiatives sportives.",
    icon: Award,
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Urbanisme et Cadre de vie",
    lead: "Mme Diallo",
    focus: "Améliorer les espaces publics et accompagner les projets urbains.",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500"
  },
];

const missions = [
  {
    icon: Target,
    title: "Définir la stratégie",
    description: "Orienter les grandes politiques publiques de la commune",
    color: "from-[#1d8595] to-teal-500"
  },
  {
    icon: Briefcase,
    title: "Gérer le budget",
    description: "Voter et contrôler l'utilisation des ressources communales",
    color: "from-[#f8812f] to-amber-500"
  },
  {
    icon: FileText,
    title: "Délibérer",
    description: "Prendre des décisions collégiales sur les projets majeurs",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Représenter",
    description: "Être à l'écoute et porter la voix des citoyens",
    color: "from-pink-500 to-rose-500"
  },
];

const ConseilMunicipal: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1d8595] to-teal-700 py-20 overflow-hidden text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d8595]/40 via-[#1d8595]/50 to-teal-700/60" />
        <div className="max-w-6xl mx-auto px-6 relative space-y-3">
          <p className="uppercase tracking-[0.25em] text-sm text-orange-200">Vie citoyenne</p>
          <h1 className="text-4xl lg:text-5xl font-bold">Le Conseil municipal</h1>
          <div className="flex items-center gap-3 text-white/85 text-sm">
            <Landmark className="w-5 h-5" />
            <span>Administration locale et représentants des habitants</span>
          </div>
        </div>
      </section>

      {/* Intro Section - Redesigned */}
      <section className="relative py-16">
        {/* Background Image légère */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-[#1d8595]/10 rounded-full mb-6">
                <span className="text-[#1d8595] font-semibold text-sm tracking-wider uppercase">Notre institution</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Au service des habitants
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Le Conseil municipal oriente la stratégie de la commune et suit les projets au service des habitants.
                Chaque commission est chargée d'un domaine précis afin de garantir un suivi attentif et des décisions
                prises au plus près des besoins de terrain.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Calendar, text: "Réunions régulières et comptes-rendus publics" },
                  { icon: Users, text: "Représentants des quartiers de Treichville" },
                  { icon: MapPin, text: "Mairie de Treichville" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-[#f8812f] rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-transparent">
                <img
                  src="/images/autres/maire-1.png"
                  alt="Conseil municipal"
                  className="w-full h-auto max-h-[540px] object-contain mx-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Nos missions</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Le rôle du Conseil municipal
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((mission, idx) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#f8812f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${mission.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <mission.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1d8595] transition-colors">
                  {mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membres - Redesigned */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#1d8595] font-semibold uppercase tracking-wider text-sm mb-3">Notre équipe</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Les adjoints au Maire
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membres.map((membre, idx) => (
              <motion.div
                key={membre.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  {/* Photo */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={membre.photo}
                      alt={membre.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d8595]/90 via-[#1d8595]/40 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <membre.icon className="w-6 h-6 text-[#1d8595]" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#1d8595] transition-colors">
                      {membre.name}
                    </h3>
                    <p className="text-[#f8812f] font-semibold text-sm mb-3">{membre.role}</p>
                    <div className="flex items-start gap-2 text-gray-600">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{membre.focus}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commissions - Redesigned */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Organisation</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Les commissions thématiques
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {commissions.map((commission, idx) => (
              <motion.div
                key={commission.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-gray-100"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${commission.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className={`w-14 h-14 bg-gradient-to-br ${commission.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative`}>
                  <commission.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{commission.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#1d8595]" />
                  </div>
                  <p className="text-sm text-[#1d8595] font-semibold">Référent : {commission.lead}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{commission.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1d8595] to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Une question sur le Conseil ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre écoute pour répondre à toutes vos interrogations
              sur le fonctionnement du Conseil municipal.
            </p>
            <Link
              href={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1d8595] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
            >
              Nous contacter
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

ConseilMunicipal.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ConseilMunicipal;
