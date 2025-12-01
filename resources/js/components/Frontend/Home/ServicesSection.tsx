import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { civClient } from "@/api/civClient";
import { 
  FileText, Users, Building, Home, Sprout, Heart, Briefcase, Coins
} from "lucide-react";
import type { Service as ServiceRecord } from "@/types/content";

const iconMap = {
  FileText, Users, Building, Home, Sprout, Heart, Briefcase, Coins
};

export default function ServicesSection() {
  const { data: services = [] } = useQuery<ServiceRecord[]>({
    queryKey: ['services'],
    queryFn: () => civClient.entities.Service.list<ServiceRecord>('ordre'),
  });

  return (
    <section id="services" className="py-24 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#f8812f]/10 rounded-full mb-4">
            <span className="text-[#f8812f] font-semibold text-sm tracking-wider uppercase">
              À VOTRE SERVICE
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Services municipaux de Treichville
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const iconKey = (service.icone as keyof typeof iconMap) ?? "FileText";
            const Icon = iconMap[iconKey] || FileText;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border-b-4 border-transparent hover:border-[#DC2626]"
              >
                <div className="w-16 h-16 bg-[#f8812f] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f8812f] transition-colors leading-tight">
                  {service.nom}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {service.lien_externe && (
                  <a
                    href={service.lien_externe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-[#f8812f] font-semibold hover:underline"
                  >
                    En savoir plus →
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}