import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Users, Heart, Award, CheckCircle2, Lightbulb, HandHeart, Building } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import { createPageUrl } from "@/utils";
import PageBanner from "@/components/Frontend/PageBanner";

const achievements = [
  { number: "15+", label: "Projets lancés", icon: Building },
  { number: "92%", label: "Satisfaction citoyenne", icon: Heart },
  { number: "30K+", label: "Citoyens engagés", icon: Users },
  { number: "50+", label: "Associations partenaires", icon: HandHeart },
];

const visions = [
  {
    title: "Une commune inclusive",
    description: "Garantir l'accès aux services publics pour tous, sans discrimination, et renforcer la cohésion sociale entre tous les quartiers.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Une économie dynamique",
    description: "Soutenir les entrepreneurs locaux, créer des opportunités d'emploi et développer l'attractivité économique de Treichville.",
    icon: TrendingUp,
    color: "from-[#f8812f] to-amber-500",
  },
  {
    title: "Un cadre de vie modernisé",
    description: "Améliorer les infrastructures, préserver notre patrimoine et créer des espaces publics de qualité pour tous.",
    icon: Target,
    color: "from-[#03800a] to-[#03800a]",
  },
  {
    title: "Une jeunesse épanouie",
    description: "Investir dans l'éducation, le sport et la culture pour offrir à notre jeunesse les meilleures opportunités de développement.",
    icon: Award,
    color: "from-purple-500 to-pink-500",
  },
];

const engagements = [
  "Transparence totale dans la gestion des affaires publiques",
  "Dialogue permanent avec les citoyens et les associations",
  "Développement durable et respect de l'environnement",
  "Innovation et modernisation des services municipaux",
  "Solidarité envers les plus vulnérables",
  "Promotion de la culture et du patrimoine local",
];

type MessageMaireContent = {
  intro?: {
    background_image?: string | null;
    image?: string | null;
  };
};

const MessageMaire: FrontendPage = () => {
  const { props } = usePage<{ content?: MessageMaireContent }>();
  const intro = props.content?.intro;
  const fallbackBackground =
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400";
  const fallbackMayor = "/images/personnes/message-maire.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero harmonisé */}
      <PageBanner
        title="Construire Treichville ensemble"
        variant="compact"
      />

      {/* Photo + Message du Maire */}
      <section className="relative py-16">
        {/* Background Image légère */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('${intro?.background_image || fallbackBackground}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Photo du Maire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="max-w-[520px] overflow-hidden rounded-3xl border-4 border-white">
                <img
                  src={intro?.image || fallbackMayor}
                  alt="Maire de Treichville"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#f8812f] font-semibold text-sm">Vision 2025-2030</p>
                <h2 className="text-2xl font-bold text-gray-900">Message aux citoyens</h2>
              </div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <span className="text-5xl text-[#03800a] font-serif float-left mr-3 mt-1">"</span>
                Chères Treichvilloises, chers Treichvillois,
              </p>
              <p>
                C'est avec une profonde gratitude et un engagement renouvelé que je m'adresse à vous aujourd'hui.
                Notre commune, riche de son histoire et de sa diversité, traverse une période de transformation sans précédent.
              </p>
              <p>
                Ensemble, nous avons lancé des projets ambitieux qui changent concrètement votre quotidien :
                modernisation de nos infrastructures, amélioration des services publics, soutien aux entreprises locales,
                et valorisation de notre magnifique patrimoine culturel.
              </p>
              <p>
                Mais notre travail ne fait que commencer. Nous devons poursuivre nos efforts pour faire de Treichville
                une commune moderne, inclusive et prospère où chaque citoyen trouve sa place et peut s'épanouir.
              </p>
              <p className="font-semibold text-gray-900">
                Votre participation, vos idées et votre engagement sont essentiels à notre réussite collective.
                Ensemble, construisons la Treichville de demain.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 bg-white rounded-2xl p-6 shadow-lg max-w-xl">
              <p className="text-gray-900 font-bold text-xl mb-1">François Albert <strong>AMICHIA</strong></p>
              <p className="text-[#03800a] font-semibold mb-4">Maire de Treichville</p>
              <div className="h-px bg-gradient-to-r from-[#f8812f] to-transparent mb-4" />
              <p className="text-gray-600 text-sm italic">"Ensemble, bâtissons une Treichville moderne, inclusive et prospère pour tous."</p>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Chiffres clés */}
      {/* <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 relative overflow-hidden"> */}
      <section className="bg-gradient-to-br from-green-700 to-green-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03800a] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Nos réalisations</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Des résultats concrets</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{item.number}</div>
                <div className="text-white/80 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision et Priorités */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Notre vision</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Les piliers de notre action
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {visions.map((vision, idx) => (
            <motion.div
              key={vision.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${vision.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

              <div className={`w-14 h-14 bg-gradient-to-br ${vision.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <vision.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{vision.title}</h3>
              <p className="text-gray-600 leading-relaxed">{vision.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Engagements */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Nos engagements</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Une promesse de transparence
            </h2>
          </motion.div>

          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="grid sm:grid-cols-2 gap-4">
              {engagements.map((engagement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#03800a] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{engagement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#03800a] to-[#03800a] rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8812f] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Vous avez une idée ? Une suggestion ?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Votre voix compte. Partagez vos propositions pour améliorer notre commune.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={createPageUrl("Contact")}
                className="px-8 py-4 bg-white text-[#03800a] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
              >
                Nous contacter
              </Link>
              <a
                href="#"
                className="px-8 py-4 bg-[#f8812f] text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-xl"
              >
                Participer à un projet
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

MessageMaire.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default MessageMaire;



// import React from "react";
// import { Link } from "@inertiajs/react";
// import { motion } from "framer-motion";
// import { Calendar, Target, TrendingUp, Users, Heart, Award, CheckCircle2, Lightbulb, HandHeart, Building } from "lucide-react";
// import FrontendLayout from "@/layouts/frontend-layout";
// import type { FrontendPage } from "@/types";
// import { createPageUrl } from "@/utils";

// const achievements = [
//   { number: "15+", label: "Projets lancés", icon: Building },
//   { number: "92%", label: "Satisfaction citoyenne", icon: Heart },
//   { number: "30K+", label: "Citoyens engagés", icon: Users },
//   { number: "50+", label: "Associations partenaires", icon: HandHeart },
// ];

// const visions = [
//   {
//     title: "Une commune inclusive",
//     description: "Garantir l'accès aux services publics pour tous, sans discrimination, et renforcer la cohésion sociale entre tous les quartiers.",
//     icon: Users,
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     title: "Une économie dynamique",
//     description: "Soutenir les entrepreneurs locaux, créer des opportunités d'emploi et développer l'attractivité économique de Treichville.",
//     icon: TrendingUp,
//     color: "from-[#f8812f] to-amber-500",
//   },
//   {
//     title: "Un cadre de vie modernisé",
//     description: "Améliorer les infrastructures, préserver notre patrimoine et créer des espaces publics de qualité pour tous.",
//     icon: Target,
//     color: "from-[#03800a] to-[#03800a]",
//   },
//   {
//     title: "Une jeunesse épanouie",
//     description: "Investir dans l'éducation, le sport et la culture pour offrir à notre jeunesse les meilleures opportunités de développement.",
//     icon: Award,
//     color: "from-purple-500 to-pink-500",
//   },
// ];

// const engagements = [
//   "Transparence totale dans la gestion des affaires publiques",
//   "Dialogue permanent avec les citoyens et les associations",
//   "Développement durable et respect de l'environnement",
//   "Innovation et modernisation des services municipaux",
//   "Solidarité envers les plus vulnérables",
//   "Promotion de la culture et du patrimoine local",
// ];

// const MessageMaire: FrontendPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero harmonisé */}
//       <section className="relative bg-gradient-to-br from-[#03800a] to-[#03800a] py-20 overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-25"
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-[#03800a]/40 via-[#03800a]/50 to-[#03800a]/60" />
//         <div className="max-w-6xl mx-auto px-6 relative text-center">
//           <p className="uppercase tracking-[0.25em] text-sm text-orange-200 mb-3">Mot du Maire</p>
//           <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Construire Treichville ensemble</h1>
//           <div className="flex items-center justify-center gap-2 text-white/85 text-sm">
//             <Calendar className="w-4 h-4" />
//             <span>Message institutionnel</span>
//           </div>
//         </div>
//       </section>

//       {/* Photo + Message du Maire */}
//       <section className="relative py-16">
//         {/* Background Image légère */}
//         <div
//           className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />

//         <div className="max-w-7xl mx-auto px-6 relative">
//           <div className="grid lg:grid-cols-5 gap-8 items-start">
//           {/* Photo du Maire */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-2"
//           >
//             <div className="relative">
//               <img
//                 // src="/images/personnes/message-maire.jpg"
//                 src="/images/personnes/message-maire.jpg"
//                 alt="Maire de Treichville"
//                 className="w-full max-w-[520px] object-cover"
//               />
//             </div>

//             {/* Signature */}
//             <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
//               <p className="text-gray-900 font-bold text-xl mb-1">François Albert Amichia</p>
//               <p className="text-[#03800a] font-semibold mb-4">Maire de Treichville</p>
//               <div className="h-px bg-gradient-to-r from-[#f8812f] to-transparent mb-4" />
//               <p className="text-gray-600 text-sm italic">"Ensemble, bâtissons une Treichville moderne, inclusive et prospère pour tous."</p>
//             </div>
//           </motion.div>

//           {/* Message */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-3"
//           >
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center">
//                 <Lightbulb className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-[#f8812f] font-semibold text-sm">Vision 2025-2030</p>
//                 <h2 className="text-2xl font-bold text-gray-900">Message aux citoyens</h2>
//               </div>
//             </div>

//             <div className="space-y-6 text-gray-700 leading-relaxed">
//               <p className="text-lg">
//                 <span className="text-5xl text-[#03800a] font-serif float-left mr-3 mt-1">"</span>
//                 Chères Treichvilloises, chers Treichvillois,
//               </p>
//               <p>
//                 C'est avec une profonde gratitude et un engagement renouvelé que je m'adresse à vous aujourd'hui.
//                 Notre commune, riche de son histoire et de sa diversité, traverse une période de transformation sans précédent.
//               </p>
//               <p>
//                 Ensemble, nous avons lancé des projets ambitieux qui changent concrètement votre quotidien :
//                 modernisation de nos infrastructures, amélioration des services publics, soutien aux entreprises locales,
//                 et valorisation de notre magnifique patrimoine culturel.
//               </p>
//               <p>
//                 Mais notre travail ne fait que commencer. Nous devons poursuivre nos efforts pour faire de Treichville
//                 une commune moderne, inclusive et prospère où chaque citoyen trouve sa place et peut s'épanouir.
//               </p>
//               <p className="font-semibold text-gray-900">
//                 Votre participation, vos idées et votre engagement sont essentiels à notre réussite collective.
//                 Ensemble, construisons la Treichville de demain.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//         </div>
//       </section>

//       {/* Chiffres clés */}
//       <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03800a] rounded-full blur-3xl" />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Nos réalisations</p>
//             <h2 className="text-3xl lg:text-4xl font-bold text-white">Des résultats concrets</h2>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {achievements.map((item, idx) => (
//               <motion.div
//                 key={item.label}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <item.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-4xl font-bold text-white mb-2">{item.number}</div>
//                 <div className="text-white/80 font-medium">{item.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Vision et Priorités */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Notre vision</p>
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
//             Les piliers de notre action
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {visions.map((vision, idx) => (
//             <motion.div
//               key={vision.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: idx * 0.1 }}
//               className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
//             >
//               <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${vision.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

//               <div className={`w-14 h-14 bg-gradient-to-br ${vision.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                 <vision.icon className="w-7 h-7 text-white" />
//               </div>

//               <h3 className="text-xl font-bold text-gray-900 mb-3">{vision.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{vision.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Engagements */}
//       <section className="bg-gray-100 py-16">
//         <div className="max-w-4xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Nos engagements</p>
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
//               Une promesse de transparence
//             </h2>
//           </motion.div>

//           <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl">
//             <div className="grid sm:grid-cols-2 gap-4">
//               {engagements.map((engagement, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="flex items-start gap-3"
//                 >
//                   <CheckCircle2 className="w-6 h-6 text-[#03800a] flex-shrink-0 mt-0.5" />
//                   <span className="text-gray-700 leading-relaxed">{engagement}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="bg-gradient-to-br from-[#03800a] to-[#03800a] rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden"
//         >
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8812f] rounded-full blur-3xl" />
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
//           </div>

//           <div className="relative">
//             <h2 className="text-3xl lg:text-4xl font-bold mb-4">Vous avez une idée ? Une suggestion ?</h2>
//             <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//               Votre voix compte. Partagez vos propositions pour améliorer notre commune.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href={createPageUrl("Contact")}
//                 className="px-8 py-4 bg-white text-[#03800a] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
//               >
//                 Nous contacter
//               </Link>
//               <a
//                 href="#"
//                 className="px-8 py-4 bg-[#f8812f] text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-xl"
//               >
//                 Participer à un projet
//               </a>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// MessageMaire.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

// export default MessageMaire;
