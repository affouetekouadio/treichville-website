import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { 
  FileText, Users, Building, Calendar, ArrowRight 
} from "lucide-react";

const quickServices = [
  {
    icon: FileText,
    title: "État Civil",
    description: "Actes de naissance, mariage, décès et certificats",
    link: "EtatCivil"
  },
  {
    icon: Building,
    title: "Fiscalité & Urbanisme",
    description: "Taxes, redevances et permis de construire",
    link: "Fiscalite"
  },
  {
    icon: Users,
    title: "Conseil Municipal",
    description: "Le Maire et son équipe à votre service",
    link: "ConseilMunicipal"
  },
  {
    icon: Calendar,
    title: "Événements",
    description: "Découvrez les prochains événements",
    link: "Evenements"
  }
];

export default function QuickServicesSection() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link 
                href={createPageUrl(service.link)}
                className="block bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group border-t-4 border-[#f8812f]"
              >
                <div className="w-16 h-16 bg-[#f8812f] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f8812f] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-[#f8812f] font-semibold group-hover:gap-3 transition-all">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}