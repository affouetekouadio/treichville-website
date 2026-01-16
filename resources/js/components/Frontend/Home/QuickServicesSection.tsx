// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "@inertiajs/react";
// import { createPageUrl } from "@/utils";
// import { 
//   FileText, Users, Building, Calendar, ArrowRight 
// } from "lucide-react";

// const quickServices = [
//   {
//     icon: FileText,
//     title: "État Civil",
//     description: "Actes de naissance, mariage, décès et certificats",
//     link: "EtatCivil"
//   },
//   {
//     icon: Building,
//     title: "Fiscalité & Urbanisme",
//     description: "Taxes, redevances et permis de construire",
//     link: "Fiscalite"
//   },
//   {
//     icon: Users,
//     title: "Conseil Municipal",
//     description: "Le Maire et son équipe à votre service",
//     link: "ConseilMunicipal"
//   },
//   {
//     icon: Calendar,
//     title: "Événements",
//     description: "Découvrez les prochains événements",
//     link: "Evenements"
//   }
// ];

// export default function QuickServicesSection() {
//   return (
//     <section className="relative -mt-20 z-20">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {quickServices.map((service, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -8 }}
//             >
//               <Link 
//                 href={createPageUrl(service.link)}
//                 className="block bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group border-t-4 border-[#f8812f]"
//               >
//                 <div className="w-16 h-16 bg-[#f8812f] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                   <service.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f8812f] transition-colors">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed mb-4">
//                   {service.description}
//                 </p>
//                 <div className="flex items-center gap-2 text-[#f8812f] font-semibold group-hover:gap-3 transition-all">
//                   En savoir plus
//                   <ArrowRight className="w-4 h-4" />
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import {
  FileText,
  Users,
  Building,
  Calendar,
  MapPin,
  PhoneCall,
  Briefcase,
  Coins,
  Heart,
  Home,
  Sprout,
  ArrowRight,
} from "lucide-react";
import { serviceDetailUrl } from "@/utils";

const iconMap = {
  FileText,
  Users,
  Building,
  Calendar,
  MapPin,
  PhoneCall,
  Briefcase,
  Coins,
  Heart,
  Home,
  Sprout,
};

type DirectionItem = {
  id: number;
  nom: string;
  slug?: string | null;
  short_description?: string | null;
  icon?: string | null;
  ordre?: number | null;
};

type QuickServicesProps = {
  directions?: DirectionItem[];
};

const fallbackServices = [
  {
    icon: FileText,
    title: "Direction des Affaires Economiques et Financières",
    href: createPageUrl("EtatCivil"),
  },
  {
    icon: Building,
    title: "Direction des Affaires Administratives et de la Formation",
    href: createPageUrl("Fiscalite"),
  },
  {
    icon: Users,
    title: "Direction des Services Techniques et de l’Environnement",
    href: createPageUrl("ConseilMunicipal"),
  },
  {
    icon: Calendar,
    title: "Direction du Cabinet",
    href: createPageUrl("Evenements"),
  },
  {
    icon: MapPin,
    title: "Direction des Services Sociaux, Culturels et de Promotion Humaine",
    href: createPageUrl("ParcsPiscines"),
  },
  {
    icon: PhoneCall,
    title: "Direction de la Sécurité Incendie et d’Assistance à Personnes",
    href: createPageUrl("Contact"),
  }
];

export default function QuickServicesSection({ directions = [] }: QuickServicesProps) {
  const items = useMemo(() => {
    if (!directions.length) {
      return fallbackServices;
    }

    return [...directions]
      .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
      .map((direction) => {
        const iconKey = direction.icon as keyof typeof iconMap;
        const Icon = iconKey && iconMap[iconKey] ? iconMap[iconKey] : FileText;
        return {
          icon: Icon,
          title: direction.nom,
          href: direction.slug ? serviceDetailUrl(direction.slug) : createPageUrl("Services"),
        };
      });
  }, [directions]);

  return (
    <section className="relative -mt-20 z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 items-stretch">
          {items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link 
                href={service.href}
                className="block h-full bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-t-4 border-[#f8812f] flex flex-col"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#f8812f] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#f8812f] transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[#f8812f] font-semibold group-hover:gap-3 transition-all text-sm">
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
