import React from "react";
import { motion } from "framer-motion";
import { Building2, Coins, ClipboardCheck, MapPin, Clock, Phone, FileCheck, ShieldCheck } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const taxes = [
  {
    title: "Fiscalité des marchés",
    desc: "Taxes d'occupation, redevances journalières et modalités de paiement pour les commerçants.",
    icon: Coins,
  },
  {
    title: "Patente & taxes d'entreprises",
    desc: "Démarches pour la patente, calendrier de paiement et accompagnement des entreprises locales.",
    icon: ClipboardCheck,
  },
  {
    title: "Taxe foncière & urbanisme",
    desc: "Infos sur la taxe foncière, permis de construire et conformité des travaux.",
    icon: Building2,
  },
];

const etapesUrbanisme = [
  "Constituez le dossier (plan, pièces d'identité, attestation de propriété).",
  "Déposez-le au guichet urbanisme ou envoyez-le en ligne.",
  "Instruction par nos services techniques et retour sous 15 jours ouvrés.",
  "Retrait de l'autorisation ou compléments à fournir si besoin.",
];

const Fiscalite: FrontendPage = () => {
  const heroBg =
    "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200')";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero (sobre) */}
      <section className="relative bg-gradient-to-br from-[#1d8595] to-teal-700 py-16 overflow-hidden text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: heroBg, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d8595]/40 via-[#1d8595]/50 to-teal-700/60" />
        <div className="max-w-6xl mx-auto px-6 relative text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="uppercase tracking-[0.25em] text-sm text-orange-200 mb-3">
            Fiscalité & urbanisme
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-5xl font-bold leading-tight">
            Transparence sur vos taxes, clarté sur vos projets
          </motion.h1>
        </div>
      </section>

      {/* Blocs intro sous la bannière */}
      <section className="max-w-6xl mx-auto px-6 mt-[-60px] mb-12 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <p className="text-gray-700 text-lg mb-4">
              Entreprises, commerçants, riverains : infos sur les taxes locales, patente, marchés, et accompagnement pour vos projets.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#taxes" className="px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-colors">
                Comprendre les taxes
              </a>
              <a href="#urbanisme" className="px-5 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors">
                Démarrer une demande
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Guichet fiscal & urbanisme</span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">7h30 - 16h30</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Marchés & redevances", status: "Paiement journalier", icon: Coins },
                { label: "Permis de construire", status: "Délais ~15 jours", icon: Building2 },
                { label: "Patente", status: "Accompagnement entreprises", icon: ClipboardCheck },
                { label: "Conformité travaux", status: "Contrôles réguliers", icon: ShieldCheck },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">{item.label}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Taxes */}
      <section id="taxes" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {taxes.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:-translate-y-2 hover:border-orange-400/60 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-orange-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Urbanisme */}
      <section id="urbanisme" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-orange-500" />
            <h3 className="text-2xl font-bold text-gray-900">Démarches urbanisme</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Pour tout projet (construction, rénovation, extension), respectez les étapes ci-dessous. Nos services techniques
            vous accompagnent et contrôlent la conformité.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {etapesUrbanisme.map((step, i) => (
              <div key={step} className="flex gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-600 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
              <Clock className="w-4 h-4 text-orange-500" /> Délai moyen : 15 jours ouvrés
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
              <FileCheck className="w-4 h-4 text-orange-500" /> Formulaires disponibles au guichet
            </span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-gradient-to-r from-orange-500 to-orange-400">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Coordonnées</h3>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Service fiscalité & urbanisme, Mairie de Treichville</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+225 27 21 24 XX XX</span>
              </div>
            </div>
            <div className="lg:col-span-2 bg-white/10 rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Horaires
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Lundi - Vendredi : 7h30 - 16h30</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Samedi : 8h00 - 12h00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Fiscalite.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Fiscalite;
