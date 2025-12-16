import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Baby,
  Heart,
  Users,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CalendarRange,
  Sparkles,
  Check,
  Download,
  AlertCircle,
  ChevronRight,
  Building2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

const services = [
  {
    icon: Baby,
    title: "Acte de naissance",
    description: "Déclaration et délivrance d'acte, copie intégrale, extrait avec ou sans filiation.",
    delai: "24 à 48h",
    color: "from-blue-500 to-cyan-500",
    documents: ["Certificat d'accouchement", "Pièces d'identité des parents", "Livret de famille"],
  },
  {
    icon: Heart,
    title: "Mariage civil",
    description: "Publication des bans, célébration de mariage, copie d'acte de mariage.",
    delai: "Sur rendez-vous",
    color: "from-rose-500 to-pink-500",
    documents: ["Extraits de naissance", "Certificat de célibat", "Pièces d'identité"],
  },
  {
    icon: FileText,
    title: "Acte de décès",
    description: "Déclaration, copie d'acte et autorisation d'inhumation.",
    delai: "Immédiat",
    color: "from-gray-600 to-gray-700",
    documents: ["Certificat médical de décès", "Pièce d'identité du défunt", "Livret de famille"],
  },
  {
    icon: Users,
    title: "Certificats & légalisations",
    description: "Certificats de résidence, de vie, de nationalité, légalisation de documents.",
    delai: "24h",
    color: "from-[#03800a] to-[#03800a]",
    documents: ["Pièce d'identité", "Justificatif de domicile", "Document à légaliser"],
  },
];

const steps = [
  {
    number: "01",
    title: "Préparez vos pièces",
    desc: "Consultez la liste des documents requis pour votre démarche et rassemblez-les avant de vous déplacer.",
  },
  {
    number: "02",
    title: "Dépôt ou rendez-vous",
    desc: "Présentez-vous à l'accueil du service État civil ou prenez rendez-vous en ligne pour les mariages.",
  },
  {
    number: "03",
    title: "Traitement du dossier",
    desc: "Votre dossier est instruit par nos agents. Vous serez contacté en cas de pièce manquante.",
  },
  {
    number: "04",
    title: "Retrait de l'acte",
    desc: "Récupérez votre document au guichet ou recevez-le par courrier certifié selon votre choix.",
  },
];

const faqs = [
  {
    q: "Combien de temps pour obtenir un acte de naissance ?",
    a: "Les actes de naissance sont généralement disponibles sous 24 à 48h ouvrées. Pour les copies urgentes, un traitement prioritaire est possible.",
  },
  {
    q: "Comment prendre rendez-vous pour un mariage ?",
    a: "Contactez le service État civil par téléphone ou rendez-vous directement au guichet. Les mariages sont célébrés du lundi au samedi sur rendez-vous.",
  },
  {
    q: "Puis-je faire une procuration pour retirer un document ?",
    a: "Oui, une procuration manuscrite signée accompagnée d'une copie de votre pièce d'identité permet à un tiers de retirer vos documents.",
  },
  {
    q: "Quels sont les tarifs des actes d'état civil ?",
    a: "Les tarifs varient selon le type d'acte. Consultez le tableau des tarifs disponible à l'accueil ou contactez-nous pour plus d'informations.",
  },
];

const stats = [
  { value: "3 200+", label: "Actes délivrés/mois", icon: FileText },
  { value: "150+", label: "Mariages célébrés/an", icon: Heart },
  { value: "24-48h", label: "Délai moyen", icon: Clock },
  { value: "98%", label: "Satisfaction usagers", icon: Check },
];

const EtatCivil: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageBanner
        title="État Civil de Treichville"
        description="Vos actes officiels, vos célébrations, vos démarches administratives"
        badge={{
          text: "Service public municipal",
        }}
        variant="compact"
        align="left"
        gradient={{
          from: "#03800a",
          to: "#03800a",
        }}
      />

      {/* Stats Section */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-8 h-8 text-[#03800a]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Horaires & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#03800a] to-[#03800a] rounded-3xl p-8 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Horaires & Contact</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CalendarRange className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Lundi - Vendredi</div>
                    <div className="text-white/90">7h30 - 16h30 (sans interruption)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CalendarRange className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Samedi</div>
                    <div className="text-white/90">8h00 - 12h00 (mariages uniquement)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Adresse</div>
                    <div className="text-white/90">Hall État civil, Mairie de Treichville</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Téléphone</div>
                    <div className="text-white/90">+225 27 21 24 XX XX</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-white/90">etatcivil@treichville.ci</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* File d'attente */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#f8812f]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Services en direct</h3>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Naissance", status: "Sans RDV", icon: Baby, color: "bg-blue-50 text-blue-600 border-blue-200" },
                  { label: "Mariage", status: "RDV en ligne", icon: Heart, color: "bg-rose-50 text-rose-600 border-rose-200" },
                  { label: "Décès", status: "Prioritaire", icon: FileText, color: "bg-gray-50 text-gray-600 border-gray-200" },
                  { label: "Certificats", status: "24h", icon: Users, color: "bg-[#03800a]/10 text-[#03800a] border-[#03800a]/30" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 border ${item.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <span className="font-semibold">Bon à savoir :</span> Pour un traitement rapide,
                  assurez-vous d'avoir tous les documents requis avant de vous présenter.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#f8812f]" />
              <span className="text-sm text-[#f8812f] font-semibold">Nos services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Actes et démarches disponibles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos différents services d'état civil, les délais de traitement et les
              documents nécessaires pour chaque démarche.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {service.delai}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#03800a] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Documents requis
                  </div>
                  {service.documents.map((doc) => (
                    <div key={doc} className="flex items-start gap-2 text-gray-700 text-sm">
                      <Check className="w-4 h-4 text-[#03800a] mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03800a]/20 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4 text-[#03800a]" />
              <span className="text-sm text-[#03800a] font-semibold">Processus simplifié</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment effectuer votre démarche ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un parcours clair et accompagné pour obtenir vos documents officiels en toute
              simplicité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#03800a] transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#03800a] to-[#03800a] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <ChevronRight className="hidden lg:block w-5 h-5 text-gray-300 absolute -right-8 top-10" />
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 text-[#03800a] hover:text-[#03800a] font-semibold text-lg transition-colors"
            >
              Besoin d'aide ? Contactez-nous
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
              <AlertCircle className="w-4 h-4 text-[#f8812f]" />
              <span className="text-sm text-[#f8812f] font-semibold">Questions fréquentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vous avez des questions ?
            </h2>
            <p className="text-lg text-gray-600">
              Retrouvez les réponses aux questions les plus fréquentes sur nos services d'état
              civil.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#03800a] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    ?
                  </div>
                  {faq.q}
                </h4>
                <p className="text-gray-600 leading-relaxed pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#f8812f] to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Démarches sécurisées et confidentielles
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Vos données personnelles sont protégées conformément à la réglementation en vigueur.
              Nos agents sont formés pour vous accompagner dans le respect de votre vie privée.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button className="bg-white text-[#f8812f] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold">
                Prendre rendez-vous maintenant
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Link
                href={createPageUrl("Contact")}
                className="text-white hover:text-white/80 font-semibold text-lg underline underline-offset-4 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

EtatCivil.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default EtatCivil;
