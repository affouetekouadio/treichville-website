import React, { useState } from "react";
import { motion } from "framer-motion";
import { civClient } from "@/api/civClient";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import type { ContactPayload } from "@/types/content";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const Contact: FrontendPage = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const createContactMutation = useMutation({
    mutationFn: (data: ContactPayload) =>
      civClient.entities.Contact.create<Record<string, unknown>, ContactPayload>(data),
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ nom: "", email: "", telephone: "", sujet: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createContactMutation.mutate(formData);
  };

  const handleChange = (field: keyof ContactPayload, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#f8812f] py-20">
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
      </section>

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
              { icon: MapPin, title: "Adresse", content: "Place de la Mairie, 75000 Paris" },
              { icon: Phone, title: "Téléphone", content: "01 23 45 67 89", link: "tel:0123456789" },
              { icon: Mail, title: "Email", content: "contact@collectivite.fr", link: "mailto:contact@collectivite.fr" },
              { icon: Clock, title: "Horaires", content: "Lun-Ven : 8h30 - 17h00\nSam : 9h00 - 12h00" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-[#1d8595] rounded-lg flex items-center justify-center flex-shrink-0">
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
                      value={formData.nom}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("nom", e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={formData.telephone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("telephone", e.target.value)}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("email", e.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="sujet">Sujet *</Label>
                  <Input
                    id="sujet"
                    required
                    value={formData.sujet}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("sujet", e.target.value)}
                    placeholder="Objet de votre demande"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("message", e.target.value)}
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createContactMutation.isPending}
                  className="w-full bg-[#f8812f] hover:bg-orange-600 py-6 text-lg"
                >
                  {createContactMutation.isPending ? "Envoi..." : (
                    <>Envoyer <Send className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

Contact.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Contact;