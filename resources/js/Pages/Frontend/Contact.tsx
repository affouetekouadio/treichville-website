import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  FileText,
  Building,
  Users,
  Calendar,
  PhoneCall,
  Heart,
} from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { useForm } from "@inertiajs/react";
import PageBanner from "@/components/Frontend/PageBanner";

const Contact: FrontendPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      {/* <section className="bg-[#f8812f] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90"
          >
            Notre équipe est à votre disposition
          </motion.p>
        </div>
      </section> */}

      <PageBanner
        title="Nous contacter"
        variant="compact"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>
            {[
              { icon: MapPin, title: "Adresse", content: "8X6P+3Q4, Av. Victor Biaka, Abidjan" },
              { icon: Phone, title: "Téléphone", content: "27 21 2 40809", link: "tel:27212240809" },
              { icon: Mail, title: "Email", content: "contact@treichville.ci", link: "mailto:contact@treichville.ci" },
              { icon: Clock, title: "Horaires", content: "Lun - Ven : 7h30 - 16h30" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-[#03800a] rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                  {item.link ? (
                    <a href={item.link} className="text-gray-600 hover:text-[#f8812f] transition-colors whitespace-pre-line">
                      {item.content}
                    </a>
                  ) : (
                    <div className="text-gray-600 whitespace-pre-line">{item.content}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-8 shadow-xl"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message envoyé !</h3>
                <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nom">Nom complet *</Label>
                    <Input
                      id="nom"
                      required
                      value={data.nom}
                      onChange={(e) => setData("nom", e.target.value)}
                      placeholder="Votre nom"
                    />
                    {errors.nom && <p className="text-red-600 text-sm mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={data.telephone}
                      onChange={(e) => setData("telephone", e.target.value)}
                      placeholder="06 12 34 56 78"
                    />
                    {errors.telephone && <p className="text-red-600 text-sm mt-1">{errors.telephone}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="sujet">Sujet *</Label>
                  <Input
                    id="sujet"
                    required
                    value={data.sujet}
                    onChange={(e) => setData("sujet", e.target.value)}
                    placeholder="Objet de votre demande"
                  />
                  {errors.sujet && <p className="text-red-600 text-sm mt-1">{errors.sujet}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    placeholder="Décrivez votre demande..."
                  />
                  {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#f8812f] hover:bg-orange-600 py-6 text-lg"
                >
                  {processing ? "Envoi..." : (
                    <>Envoyer <Send className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Contacts des directions */}
        <div className="mt-16">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Contacts des directions</h3>
              <p className="text-gray-600">Appelez ou écrivez directement le service concerné.</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "État civil",
                description: "Actes, mariages, certificats et dossiers administratifs.",
                phone: "27 21 24 08 09",
                email: "etatcivil@treichville.ci",
              },
              {
                icon: Building,
                title: "Fiscalité & urbanisme",
                description: "Taxes locales, permis de construire et occupation du domaine public.",
                phone: "27 21 24 10 22",
                email: "fiscalite@treichville.ci",
              },
              {
                icon: Users,
                title: "Conseil municipal",
                description: "Cabinet du Maire, protocoles, prises de rendez-vous.",
                phone: "27 21 24 00 11",
                email: "cabinet@treichville.ci",
              },
              {
                icon: Calendar,
                title: "Événements & culture",
                description: "Programmation culturelle, locations d'espaces, partenariats.",
                phone: "27 21 24 12 30",
                email: "culture@treichville.ci",
              },
              {
                icon: PhoneCall,
                title: "Numéros utiles",
                description: "Sécurité, urgences sanitaires et interventions rapides.",
                phone: "170 / 180",
                email: "urgence@treichville.ci",
              },
              {
                icon: Heart,
                title: "Solidarité & santé",
                description: "Aide sociale, santé communautaire et accompagnement des familles.",
                phone: "27 21 24 14 45",
                email: "solidarite@treichville.ci",
              },
            ].map((dir, idx) => (
              <motion.div
                key={dir.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(29,133,149,0.12)" }}>
                  <dir.icon className="w-6 h-6" style={{ color: "#03800a" }} />
                </div>
                <h4 className="text-lg font-bold text-[#0f172a]">{dir.title}</h4>
                <p className="text-sm text-[#1f2937] mt-2 mb-4 leading-relaxed">{dir.description}</p>
                <div className="space-y-2 text-sm">
                  <a
                    className="flex items-center gap-2 text-[#0f172a] hover:text-[#03800a] transition-colors font-semibold"
                    href={`tel:${dir.phone.replace(/\s+/g, "")}`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{dir.phone}</span>
                  </a>
                  <a
                    className="flex items-center gap-2 text-[#0f172a] hover:text-[#03800a] transition-colors font-semibold break-words"
                    href={`mailto:${dir.email}`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{dir.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Contact;
