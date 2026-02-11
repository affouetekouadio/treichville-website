// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import {
//   FileText,
//   Users,
//   Building,
//   Home,
//   Sprout,
//   Heart,
//   Briefcase,
//   Coins,
//   MapPin,
//   PhoneCall,
//   Mail,
//   ArrowLeft,
//   User,
// } from "lucide-react";
// import FrontendLayout from "@/layouts/frontend-layout";
// import type { FrontendPage } from "@/types";
// import type { Service as DirectionRecord } from "@/types/content";
// import PageBanner from "@/components/Frontend/PageBanner";
// import DirectorBioModal from "@/components/Frontend/DirectorBioModal";
// import { serviceDetailUrl } from "@/utils";

// const iconMap = {
//   FileText,
//   Users,
//   Building,
//   Home,
//   Sprout,
//   Heart,
//   Briefcase,
//   Coins,
//   MapPin,
//   PhoneCall,
// };

// type DirectionDetailsProps = {
//   direction: DirectionRecord;
//   autres_directions?: Array<Pick<DirectionRecord, "id" | "nom" | "slug" | "short_description" | "icon">>;
// };

// const contactIconMap = {
//   email: Mail,
//   telephone: PhoneCall,
//   fax: PhoneCall,
//   whatsapp: PhoneCall,
// };

// const ServicesDetails: FrontendPage<DirectionDetailsProps> = ({
//   direction,
//   autres_directions = [],
// }) => {
//   const [bioModalOpen, setBioModalOpen] = useState(false);

//   const detailContent =
//     direction.contenu && direction.contenu.trim().length > 0
//       ? direction.contenu
//       : `<p>${direction.short_description ?? direction.description ?? ""}</p>`;

//   const iconKey = ((direction.icone ?? direction.icon) as keyof typeof iconMap) ?? "FileText";
//   const Icon = iconMap[iconKey] || FileText;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <PageBanner title={direction.nom} variant="compact" />

//       <section className="max-w-6xl mx-auto px-6 pt-10">
//         <Link
//           href="/services"
//           className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Retour aux directions
//         </Link>
//         <div className="mt-4 flex flex-wrap items-center gap-3">
//           <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
//             <Icon className="h-4 w-4" />
//             Direction
//           </span>
//           {direction.responsable && (
//             <button
//               onClick={() => setBioModalOpen(true)}
//               className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2 shadow-sm cursor-pointer hover:shadow-md hover:border-orange-300 transition-all"
//               title="Voir le profil du responsable"
//             >
//               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
//                 {direction.photo_responsable_url ? (
//                   <img
//                     src={direction.photo_responsable_url}
//                     alt={direction.responsable}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-orange-100 flex items-center justify-center">
//                     <User className="w-5 h-5 text-orange-400" />
//                   </div>
//                 )}
//               </div>
//               <div className="text-left">
//                 <span className="text-xs font-semibold uppercase tracking-wide text-orange-600 block">
//                   Responsable
//                 </span>
//                 <span className="text-base sm:text-lg font-bold text-orange-900">
//                   {direction.responsable}
//                 </span>
//               </div>
//             </button>
//           )}
//         </div>
//         {/* {direction.short_description && (
//           <p className="mt-3 text-lg text-gray-600 max-w-3xl">{direction.short_description}</p>
//         )} */}
//       </section>

//       <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
//         <article className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
//           <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
//             <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
//               <Icon className="h-6 w-6 text-orange-600" />
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-wide text-gray-500">Direction</p>
//               <p className="text-lg font-semibold text-gray-900">{direction.nom}</p>
//             </div>
//           </div>

//           <div
//             className="rich-content mt-6"
//             dangerouslySetInnerHTML={{ __html: detailContent }}
//           />
//         </article>

//         <aside className="space-y-6">
//           <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts & accès</h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               {direction.adresse && (
//                 <div className="flex items-start gap-3">
//                   <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
//                   <span>{direction.adresse}</span>
//                 </div>
//               )}
//               {direction.contacts && direction.contacts.length > 0 ? (
//                 direction.contacts.map((contact, index) => {
//                   const ContactIcon =
//                     contactIconMap[contact.type as keyof typeof contactIconMap] || PhoneCall;
//                   return (
//                     <div key={`${contact.type}-${index}`} className="flex items-start gap-3">
//                       <ContactIcon className="h-4 w-4 text-orange-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold text-gray-800">{contact.label ?? contact.type}</p>
//                         <p className="text-gray-600">{contact.valeur}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-gray-500">Aucun contact renseigné.</p>
//               )}
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres directions</h3>
//             {autres_directions.length > 0 ? (
//               <div className="space-y-4">
//                 {autres_directions.map((item) => {
//                   const OtherIcon = item.icon && iconMap[item.icon as keyof typeof iconMap]
//                     ? iconMap[item.icon as keyof typeof iconMap]
//                     : FileText;
//                   return (
//                     <Link
//                       key={item.id}
//                       href={item.slug ? serviceDetailUrl(item.slug) : "/services"}
//                       className="flex gap-3 group"
//                     >
//                       <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
//                         <OtherIcon className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-gray-900 group-hover:text-[#f8812f] line-clamp-2">
//                           {item.nom}
//                         </p>
//                         {item.short_description && (
//                           <p className="text-xs text-gray-500 line-clamp-2 mt-1">
//                             {item.short_description}
//                           </p>
//                         )}
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">Aucune autre direction disponible.</p>
//             )}
//           </div>
//         </aside>
//       </section>

//       {direction.responsable && (
//         <DirectorBioModal
//           open={bioModalOpen}
//           onOpenChange={setBioModalOpen}
//           nom={direction.responsable}
//           photoUrl={direction.photo_responsable_url}
//           biographie={direction.biographie_responsable}
//           reseauxSociaux={direction.reseaux_sociaux_responsable}
//         />
//       )}
//     </div>
//   );
// };

// ServicesDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

// export default ServicesDetails;


// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import {
//   FileText,
//   Users,
//   Building,
//   Home,
//   Sprout,
//   Heart,
//   Briefcase,
//   Coins,
//   MapPin,
//   PhoneCall,
//   Mail,
//   ArrowLeft,
//   User,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   ExternalLink,
// } from "lucide-react";
// import FrontendLayout from "@/layouts/frontend-layout";
// import type { FrontendPage } from "@/types";
// import type { Service as DirectionRecord } from "@/types/content";
// import PageBanner from "@/components/Frontend/PageBanner";
// import DirectorBioModal from "@/components/Frontend/DirectorBioModal";
// import { serviceDetailUrl } from "@/utils";

// const iconMap = {
//   FileText,
//   Users,
//   Building,
//   Home,
//   Sprout,
//   Heart,
//   Briefcase,
//   Coins,
//   MapPin,
//   PhoneCall,
// };

// type DirectionDetailsProps = {
//   direction: DirectionRecord;
//   autres_directions?: Array<
//     Pick<DirectionRecord, "id" | "nom" | "slug" | "short_description" | "icon">
//   >;
// };

// const contactIconMap = {
//   email: Mail,
//   telephone: PhoneCall,
//   fax: PhoneCall,
//   whatsapp: PhoneCall,
// };

// const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
//   facebook: Facebook,
//   twitter: Twitter,
//   linkedin: Linkedin,
//   instagram: Instagram,
// };

// const ServicesDetails: FrontendPage<DirectionDetailsProps> = ({
//   direction,
//   autres_directions = [],
// }) => {
//   const [bioModalOpen, setBioModalOpen] = useState(false);

//   const detailContent =
//     direction.contenu && direction.contenu.trim().length > 0
//       ? direction.contenu
//       : `<p>${direction.short_description ?? direction.description ?? ""}</p>`;

//   const iconKey =
//     ((direction.icone ?? direction.icon) as keyof typeof iconMap) ?? "FileText";
//   const Icon = iconMap[iconKey] || FileText;

//   /* Réseaux sociaux du responsable */
//   const socials = direction.reseaux_sociaux_responsable;
//   const socialEntries = socials
//     ? Object.entries(socials).filter(([, url]) => url)
//     : [];

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <PageBanner title={direction.nom} variant="compact" />

//       {/* ── Retour + badge ── */}
//       <section className="max-w-6xl mx-auto px-6 pt-10">
//         <Link
//           href="/services"
//           className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Retour aux directions
//         </Link>
//         <div className="mt-4 flex flex-wrap items-center gap-3">
//           <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
//             <Icon className="h-4 w-4" />
//             Direction
//           </span>
//         </div>
//       </section>

//       {/* ── Contenu principal ── */}
//       <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
//         {/* Colonne gauche : contenu */}
//         <article className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
//           <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
//             <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
//               <Icon className="h-6 w-6 text-orange-600" />
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-wide text-gray-500">
//                 Direction
//               </p>
//               <p className="text-lg font-semibold text-gray-900">
//                 {direction.nom}
//               </p>
//             </div>
//           </div>

//           <div
//             className="rich-content mt-6"
//             dangerouslySetInnerHTML={{ __html: detailContent }}
//           />

//           {/* Bloc responsable sous la description */}
//           {direction.responsable && (
//             <div className="mt-6 max-w-md mx-auto">
//               <div className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
//                 {/* Photo grande taille */}
//                 <div
//                   className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 cursor-pointer"
//                   onClick={() => setBioModalOpen(true)}
//                 >
//                   {direction.photo_responsable_url ? (
//                     <>
//                       <img
//                         src={direction.photo_responsable_url}
//                         alt={direction.responsable}
//                         className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                         loading="lazy"
//                       />
//                       {/* Overlay gradient */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//                     </>
//                   ) : (
//                     <div className="flex h-full w-full flex-col items-center justify-center">
//                       <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-inner">
//                         <User
//                           className="h-12 w-12 text-gray-300"
//                           strokeWidth={1.2}
//                         />
//                       </div>
//                       <p className="mt-3 text-xs text-gray-400">
//                         Photo non disponible
//                       </p>
//                     </div>
//                   )}

//                   {/* Réseaux sociaux au hover (en bas de la photo) */}
//                   {socialEntries.length > 0 && (
//                     <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//                       {socialEntries.map(([key, url]) => {
//                         const SocialIcon = socialIconMap[key] || ExternalLink;
//                         return (
//                           <a
//                             key={key}
//                             href={url!}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             onClick={(e) => e.stopPropagation()}
//                             className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-[#f8812f] hover:text-white hover:-translate-y-0.5"
//                           >
//                             <SocialIcon className="h-4 w-4" />
//                           </a>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 {/* Infos sous la photo */}
//                 <div className="px-4 py-3">
//                   <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
//                     {direction.fonction_responsable || "Responsable"}
//                   </p>
//                   <h3 className="mt-1 text-lg font-bold text-gray-900 leading-snug">
//                     {direction.responsable}
//                   </h3>
//                   <p className="mt-0.5 text-sm text-gray-500">{direction.nom}</p>

//                   <button
//                     onClick={() => setBioModalOpen(true)}
//                     className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 border border-orange-200 transition-all duration-300 hover:bg-orange-100 hover:border-orange-300 hover:shadow-sm"
//                   >
//                     <User className="h-4 w-4" />
//                     Voir le profil complet
//                   </button>
//                 </div>

//                 {/* Barre décorative animée */}
//                 <div className="h-1 w-0 bg-gradient-to-r from-[#f8812f] to-orange-400 transition-all duration-500 group-hover:w-full" />
//               </div>
//             </div>
//           )}
//         </article>

//         {/* ── Colonne droite : sidebar ── */}
//         <aside className="space-y-6">
//           {/* ═══ CONTACTS & ACCÈS ═══ */}
//           <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Contacts & accès
//             </h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               {direction.adresse && (
//                 <div className="flex items-start gap-3">
//                   <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
//                   <span>{direction.adresse}</span>
//                 </div>
//               )}
//               {direction.contacts && direction.contacts.length > 0 ? (
//                 direction.contacts.map((contact, index) => {
//                   const ContactIcon =
//                     contactIconMap[
//                       contact.type as keyof typeof contactIconMap
//                     ] || PhoneCall;
//                   return (
//                     <div
//                       key={`${contact.type}-${index}`}
//                       className="flex items-start gap-3"
//                     >
//                       <ContactIcon className="h-4 w-4 text-orange-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold text-gray-800">
//                           {contact.label ?? contact.type}
//                         </p>
//                         <p className="text-gray-600">{contact.valeur}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-gray-500">Aucun contact renseigné.</p>
//               )}
//             </div>
//           </div>

//           {/* ═══ AUTRES DIRECTIONS ═══ */}
//           <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Autres directions
//             </h3>
//             {autres_directions.length > 0 ? (
//               <div className="space-y-4">
//                 {autres_directions.map((item) => {
//                   const OtherIcon =
//                     item.icon &&
//                     iconMap[item.icon as keyof typeof iconMap]
//                       ? iconMap[item.icon as keyof typeof iconMap]
//                       : FileText;
//                   return (
//                     <Link
//                       key={item.id}
//                       href={
//                         item.slug ? serviceDetailUrl(item.slug) : "/services"
//                       }
//                       className="flex gap-3 group"
//                     >
//                       <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
//                         <OtherIcon className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-gray-900 group-hover:text-[#f8812f] line-clamp-2 transition-colors">
//                           {item.nom}
//                         </p>
//                         {item.short_description && (
//                           <p className="text-xs text-gray-500 line-clamp-2 mt-1">
//                             {item.short_description}
//                           </p>
//                         )}
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">
//                 Aucune autre direction disponible.
//               </p>
//             )}
//           </div>
//         </aside>
//       </section>

//       {/* ── Modal bio (inchangé) ── */}
//       {direction.responsable && (
//         <DirectorBioModal
//           open={bioModalOpen}
//           onOpenChange={setBioModalOpen}
//           nom={direction.responsable}
//           fonction={direction.fonction_responsable}
//           photoUrl={direction.photo_responsable_url}
//           biographie={direction.biographie_responsable}
//           reseauxSociaux={direction.reseaux_sociaux_responsable}
//         />
//       )}
//     </div>
//   );
// };

// ServicesDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

// export default ServicesDetails;


// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import {
//   FileText,
//   Users,
//   Building,
//   Home,
//   Sprout,
//   Heart,
//   Briefcase,
//   Coins,
//   MapPin,
//   PhoneCall,
//   Mail,
//   ArrowLeft,
//   User,
// } from "lucide-react";
// import FrontendLayout from "@/layouts/frontend-layout";
// import type { FrontendPage } from "@/types";
// import type { Service as DirectionRecord } from "@/types/content";
// import PageBanner from "@/components/Frontend/PageBanner";
// import DirectorBioModal from "@/components/Frontend/DirectorBioModal";
// import { serviceDetailUrl } from "@/utils";

// const iconMap = {
//   FileText,
//   Users,
//   Building,
//   Home,
//   Sprout,
//   Heart,
//   Briefcase,
//   Coins,
//   MapPin,
//   PhoneCall,
// };

// type DirectionDetailsProps = {
//   direction: DirectionRecord;
//   autres_directions?: Array<Pick<DirectionRecord, "id" | "nom" | "slug" | "short_description" | "icon">>;
// };

// const contactIconMap = {
//   email: Mail,
//   telephone: PhoneCall,
//   fax: PhoneCall,
//   whatsapp: PhoneCall,
// };

// const ServicesDetails: FrontendPage<DirectionDetailsProps> = ({
//   direction,
//   autres_directions = [],
// }) => {
//   const [bioModalOpen, setBioModalOpen] = useState(false);

//   const detailContent =
//     direction.contenu && direction.contenu.trim().length > 0
//       ? direction.contenu
//       : `<p>${direction.short_description ?? direction.description ?? ""}</p>`;

//   const iconKey = ((direction.icone ?? direction.icon) as keyof typeof iconMap) ?? "FileText";
//   const Icon = iconMap[iconKey] || FileText;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <PageBanner title={direction.nom} variant="compact" />

//       <section className="max-w-6xl mx-auto px-6 pt-10">
//         <Link
//           href="/services"
//           className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Retour aux directions
//         </Link>
//         <div className="mt-4 flex flex-wrap items-center gap-3">
//           <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
//             <Icon className="h-4 w-4" />
//             Direction
//           </span>
//           {direction.responsable && (
//             <button
//               onClick={() => setBioModalOpen(true)}
//               className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2 shadow-sm cursor-pointer hover:shadow-md hover:border-orange-300 transition-all"
//               title="Voir le profil du responsable"
//             >
//               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
//                 {direction.photo_responsable_url ? (
//                   <img
//                     src={direction.photo_responsable_url}
//                     alt={direction.responsable}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-orange-100 flex items-center justify-center">
//                     <User className="w-5 h-5 text-orange-400" />
//                   </div>
//                 )}
//               </div>
//               <div className="text-left">
//                 <span className="text-xs font-semibold uppercase tracking-wide text-orange-600 block">
//                   Responsable
//                 </span>
//                 <span className="text-base sm:text-lg font-bold text-orange-900">
//                   {direction.responsable}
//                 </span>
//               </div>
//             </button>
//           )}
//         </div>
//         {/* {direction.short_description && (
//           <p className="mt-3 text-lg text-gray-600 max-w-3xl">{direction.short_description}</p>
//         )} */}
//       </section>

//       <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
//         <article className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
//           <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
//             <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
//               <Icon className="h-6 w-6 text-orange-600" />
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-wide text-gray-500">Direction</p>
//               <p className="text-lg font-semibold text-gray-900">{direction.nom}</p>
//             </div>
//           </div>

//           <div
//             className="rich-content mt-6"
//             dangerouslySetInnerHTML={{ __html: detailContent }}
//           />
//         </article>

//         <aside className="space-y-6">
//           <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts & accès</h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               {direction.adresse && (
//                 <div className="flex items-start gap-3">
//                   <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
//                   <span>{direction.adresse}</span>
//                 </div>
//               )}
//               {direction.contacts && direction.contacts.length > 0 ? (
//                 direction.contacts.map((contact, index) => {
//                   const ContactIcon =
//                     contactIconMap[contact.type as keyof typeof contactIconMap] || PhoneCall;
//                   return (
//                     <div key={`${contact.type}-${index}`} className="flex items-start gap-3">
//                       <ContactIcon className="h-4 w-4 text-orange-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold text-gray-800">{contact.label ?? contact.type}</p>
//                         <p className="text-gray-600">{contact.valeur}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-gray-500">Aucun contact renseigné.</p>
//               )}
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres directions</h3>
//             {autres_directions.length > 0 ? (
//               <div className="space-y-4">
//                 {autres_directions.map((item) => {
//                   const OtherIcon = item.icon && iconMap[item.icon as keyof typeof iconMap]
//                     ? iconMap[item.icon as keyof typeof iconMap]
//                     : FileText;
//                   return (
//                     <Link
//                       key={item.id}
//                       href={item.slug ? serviceDetailUrl(item.slug) : "/services"}
//                       className="flex gap-3 group"
//                     >
//                       <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
//                         <OtherIcon className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-gray-900 group-hover:text-[#f8812f] line-clamp-2">
//                           {item.nom}
//                         </p>
//                         {item.short_description && (
//                           <p className="text-xs text-gray-500 line-clamp-2 mt-1">
//                             {item.short_description}
//                           </p>
//                         )}
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">Aucune autre direction disponible.</p>
//             )}
//           </div>
//         </aside>
//       </section>

//       {direction.responsable && (
//         <DirectorBioModal
//           open={bioModalOpen}
//           onOpenChange={setBioModalOpen}
//           nom={direction.responsable}
//           photoUrl={direction.photo_responsable_url}
//           biographie={direction.biographie_responsable}
//           reseauxSociaux={direction.reseaux_sociaux_responsable}
//         />
//       )}
//     </div>
//   );
// };

// ServicesDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

// export default ServicesDetails;


import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  FileText,
  Users,
  Building,
  Home,
  Sprout,
  Heart,
  Briefcase,
  Coins,
  MapPin,
  PhoneCall,
  Mail,
  ArrowLeft,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import type { Service as DirectionRecord } from "@/types/content";
import PageBanner from "@/components/Frontend/PageBanner";
import DirectorBioModal from "@/components/Frontend/DirectorBioModal";
import { serviceDetailUrl } from "@/utils";

const iconMap = {
  FileText,
  Users,
  Building,
  Home,
  Sprout,
  Heart,
  Briefcase,
  Coins,
  MapPin,
  PhoneCall,
};

type DirectionDetailsProps = {
  direction: DirectionRecord;
  autres_directions?: Array<
    Pick<DirectionRecord, "id" | "nom" | "slug" | "short_description" | "icon">
  >;
};

const contactIconMap = {
  email: Mail,
  telephone: PhoneCall,
  fax: PhoneCall,
  whatsapp: PhoneCall,
};

const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

const ServicesDetails: FrontendPage<DirectionDetailsProps> = ({
  direction,
  autres_directions = [],
}) => {
  const [bioModalOpen, setBioModalOpen] = useState(false);

  const detailContent =
    direction.contenu && direction.contenu.trim().length > 0
      ? direction.contenu
      : `<p>${direction.short_description ?? direction.description ?? ""}</p>`;

  const iconKey =
    ((direction.icone ?? direction.icon) as keyof typeof iconMap) ?? "FileText";
  const Icon = iconMap[iconKey] || FileText;

  /* Réseaux sociaux du responsable */
  const socials = direction.reseaux_sociaux_responsable;
  const socialEntries = socials
    ? Object.entries(socials).filter(([, url]) => url)
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageBanner title={direction.nom} variant="compact" />

      {/* ── Retour + badge ── */}
      <section className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux directions
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
            <Icon className="h-4 w-4" />
            Direction
          </span>
        </div>
      </section>

      {/* ── Contenu principal ── */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
        {/* Colonne gauche : contenu */}
        <article className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Icon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Direction
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {direction.nom}
              </p>
            </div>
          </div>

          <div
            className="rich-content mt-6"
            dangerouslySetInnerHTML={{ __html: detailContent }}
          />
        </article>

        {/* ── Colonne droite : sidebar ── */}
        <aside className="space-y-6">
          {/* ═══ CARTE RESPONSABLE (style Digtek) ═══ */}
          {direction.responsable && (
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              {/* Photo grande taille */}
              <div
                className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 cursor-pointer"
                onClick={() => setBioModalOpen(true)}
              >
                {direction.photo_responsable_url ? (
                  <>
                    <img
                      src={direction.photo_responsable_url}
                      alt={direction.responsable}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-inner">
                      <User
                        className="h-12 w-12 text-gray-300"
                        strokeWidth={1.2}
                      />
                    </div>
                    <p className="mt-3 text-xs text-gray-400">
                      Photo non disponible
                    </p>
                  </div>
                )}

                {/* Réseaux sociaux au hover (en bas de la photo) */}
                {socialEntries.length > 0 && (
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {socialEntries.map(([key, url]) => {
                      const SocialIcon = socialIconMap[key] || ExternalLink;
                      return (
                        <a
                          key={key}
                          href={url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-[#f8812f] hover:text-white hover:-translate-y-0.5"
                        >
                          <SocialIcon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Infos sous la photo */}
              <div className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  {direction.fonction_responsable || "Responsable"}
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900 leading-snug">
                  {direction.responsable}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">{direction.nom}</p>

                <button
                  onClick={() => setBioModalOpen(true)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 border border-orange-200 transition-all duration-300 hover:bg-orange-100 hover:border-orange-300 hover:shadow-sm"
                >
                  <User className="h-4 w-4" />
                  Voir le profil complet
                </button>
              </div>

              {/* Barre décorative animée */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#f8812f] to-orange-400 transition-all duration-500 group-hover:w-full" />
            </div>
          )}

        

          {/* ═══ AUTRES DIRECTIONS ═══ */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Autres directions
            </h3>
            {autres_directions.length > 0 ? (
              <div className="space-y-4">
                {autres_directions.map((item) => {
                  const OtherIcon =
                    item.icon &&
                    iconMap[item.icon as keyof typeof iconMap]
                      ? iconMap[item.icon as keyof typeof iconMap]
                      : FileText;
                  return (
                    <Link
                      key={item.id}
                      href={
                        item.slug ? serviceDetailUrl(item.slug) : "/services"
                      }
                      className="flex gap-3 group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <OtherIcon className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-[#f8812f] line-clamp-2 transition-colors">
                          {item.nom}
                        </p>
                        {item.short_description && (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {item.short_description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Aucune autre direction disponible.
              </p>
            )}
          </div>
        </aside>
      </section>

      {/* ── Modal bio (inchangé) ── */}
      {direction.responsable && (
        <DirectorBioModal
          open={bioModalOpen}
          onOpenChange={setBioModalOpen}
          nom={direction.responsable}
          fonction={direction.fonction_responsable}
          photoUrl={direction.photo_responsable_url}
          biographie={direction.biographie_responsable}
          reseauxSociaux={direction.reseaux_sociaux_responsable}
        />
      )}
    </div>
  );
};

ServicesDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ServicesDetails;