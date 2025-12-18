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



import React from "react";
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
  ArrowRight,
} from "lucide-react";

const quickServices = [
  {
    icon: FileText,
    title: "Direction 1",
    description: "Actes de naissance, mariage, décès et certificats",
    link: "EtatCivil"
  },
  {
    icon: Building,
    title: "Direction 2",
    description: "Taxes, redevances et permis de construire",
    link: "Fiscalite"
  },
  {
    icon: Users,
    title: "Direction 3",
    description: "Le Maire et son équipe à votre service",
    link: "ConseilMunicipal"
  },
  {
    icon: Calendar,
    title: "Direction 4",
    description: "Découvrez les prochains événements",
    link: "Evenements"
  },
  {
    icon: MapPin,
    title: "Direction 5",
    description: "Monuments, quartiers et lieux incontournables",
    link: "Decouvrir"
  },
  {
    icon: PhoneCall,
    title: "DIrection 6",
    description: "Services d'urgence et contacts indispensables",
    link: "ContactsUtiles"
  }
];

export default function QuickServicesSection() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-8 items-stretch">
          {quickServices.map((service, index) => (
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
                href={createPageUrl(service.link)}
                className="block h-full bg-white rounded-2xl p-5 sm:p-6 md:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 group border-t-4 border-[#f8812f] flex flex-col"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f8812f] rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#f8812f] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[#f8812f] font-semibold group-hover:gap-3 transition-all text-sm sm:text-base">
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
