import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Building, Ship, ShoppingBag, Landmark, Map, Heart, Home, ChevronLeft, ChevronRight, Award, School, Palette, TrendingUp, Target } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import PageBanner from "@/components/Frontend/PageBanner";
import type { FrontendPage } from "@/types";

const Histoire: FrontendPage = () => {
  // Images géographiques de Treichville
  const geographicImages = [
    { id: 1, url: "/images/treichville-1.jpeg", alt: "Vue de Treichville" },
    { id: 2, url: "/images/treichville-2.jpg", alt: "Quartiers de Treichville" },
    { id: 3, url: "/images/treichville-3.jpg", alt: "Lagune et port" },
    { id: 4, url: "/images/treichville-4.jpg", alt: "Boulevard et vie urbaine" },
  ];
  const presentationSlides = [
    {
      id: 1,
      main: {
        url: "/images/treichville-4.jpg",
        alt: "Treichville - Vue principale",
      },
      secondary: {
        url: "/images/treichville-1.jpeg",
        alt: "Treichville - Architecture",
      },
    },
    {
      id: 2,
      main: {
        url: "/images/treichville-3.jpg",
        alt: "Lagune et port de Treichville",
      },
      secondary: {
        url: "/images/treichville-2.jpg",
        alt: "Quartiers de Treichville",
      },
    },
    {
      id: 3,
      main: {
        url: "/images/treichville-4.jpg",
        alt: "Boulevard et vie urbaine",
      },
      secondary: {
        url: "/images/treichville-1.jpeg",
        alt: "Vue de Treichville",
      },
    },
  ];
  const economicImages = [
    { id: 1, url: "/port-abidjan.jpg", alt: "Port Autonome d'Abidjan" },
    { id: 2, url: "/bollore.jpg", alt: "Bollore Logistics" },
    { id: 3, url: "/sifca.jpg", alt: "SIFCA" },
    { id: 4, url: "/solibra-1.jpg", alt: "SOLIBRA" },
  ];

  const timeline = [
    { year: "1934", title: "Création de Treichville", description: "Fondation officielle de la commune, nommée en l'honneur de Marcel Treich-Laplène, sur le site de l'ancien village Ebrié Anoumabo." },
    { year: "1938", title: "CHU de Treichville", description: "Création du Centre Hospitalier Universitaire, qui deviendra l'un des établissements de santé les plus emblématiques du pays." },
    { year: "1951", title: "Port Autonome d'Abidjan", description: "Mise en service du port, pilier majeur du développement économique. Treichville devient un centre stratégique d'activités portuaires." },
    { year: "1952", title: "Parc des Sports", description: "Inauguration du complexe sportif historique, symbole fort de la vie sportive et sociale de Treichville." },
    { year: "1960", title: "Indépendance", description: "Treichville devient une commune à part entière de la jeune République de Côte d'Ivoire." },
    { year: "2003", title: "Grand Marché", description: "Reconstruction et mise en service du Grand Marché de Treichville, l'un des principaux pôles commerciaux d'Abidjan." },
    { year: "Aujourd'hui", title: "Commune N'zassa", description: "Une commune dynamique, cosmopolite et accueillante, symbole du vivre-ensemble et de l'intégration sous-régionale." },
  ];

  const quartiers = [
    { name: "Zone 4", description: "Quartier résidentiel et administratif, cœur administratif de la commune" },
    { name: "Belleville", description: "Quartier populaire et commerçant, célèbre pour son marché animé" },
    { name: "Biafra", description: "Zone dynamique avec une forte activité économique" },
    { name: "Sans-fil", description: "Quartier historique avec architecture coloniale préservée" },
  ];

  const patrimoine = [
    {
      icon: Ship,
      title: "Port Autonome d'Abidjan",
      description: "Premier port de l'Afrique de l'Ouest francophone, poumon économique de la région.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShoppingBag,
      title: "Marché de Belleville",
      description: "L'un des marchés les plus animés d'Abidjan, véritable temple du commerce.",
      color: "from-[#f8812f] to-amber-500"
    },
    {
      icon: Landmark,
      title: "Gare Lagunaire",
      description: "Point de départ historique des transports lagunaires vers les autres communes.",
      color: "from-[#03800a] to-[#03800a]"
    },
    {
      icon: Building,
      title: "Boulevard VGE",
      description: "Artère principale reliant Treichville au Plateau, symbole de modernité.",
      color: "from-purple-500 to-pink-500"
    },
  ];

  // Carousel logic for geographic images (like homepage hero)
  const [currentGeo, setCurrentGeo] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentEconomy, setCurrentEconomy] = useState(0);
  const [economyDirection, setEconomyDirection] = useState(0);
  const [currentPresentation, setCurrentPresentation] = useState(0);
  const [presentationDirection, setPresentationDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<
    { id: string | number; url: string; alt: string }[]
  >([]);

  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentGeo((prev) => (prev + 1) % geographicImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [geographicImages.length, isLightboxOpen]);

  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      setEconomyDirection(1);
      setCurrentEconomy((prev) => (prev + 1) % economicImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [economicImages.length, isLightboxOpen]);

  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      setPresentationDirection(1);
      setCurrentPresentation((prev) => (prev + 1) % presentationSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [presentationSlides.length, isLightboxOpen]);

  const nudge = useCallback(
    (dir: "next" | "prev") => {
      setDirection(dir === "next" ? 1 : -1);
      setCurrentGeo((prev) =>
        dir === "next"
          ? (prev + 1) % geographicImages.length
          : (prev - 1 + geographicImages.length) % geographicImages.length
      );
    },
    [geographicImages.length]
  );

  const nudgeEconomy = useCallback(
    (dir: "next" | "prev") => {
      setEconomyDirection(dir === "next" ? 1 : -1);
      setCurrentEconomy((prev) =>
        dir === "next"
          ? (prev + 1) % economicImages.length
          : (prev - 1 + economicImages.length) % economicImages.length
      );
    },
    [economicImages.length]
  );

  const presentationImages = presentationSlides.flatMap((slide) => [
    { id: `${slide.id}-main`, url: slide.main.url, alt: slide.main.alt },
    { id: `${slide.id}-secondary`, url: slide.secondary.url, alt: slide.secondary.alt },
  ]);

  const nudgePresentation = useCallback(
    (dir: "next" | "prev") => {
      setPresentationDirection(dir === "next" ? 1 : -1);
      setCurrentPresentation((prev) =>
        dir === "next"
          ? (prev + 1) % presentationSlides.length
          : (prev - 1 + presentationSlides.length) % presentationSlides.length
      );
    },
    [presentationSlides.length]
  );

  const openLightbox = useCallback(
    (
      images: { id: string | number; url: string; alt: string }[],
      index: number
    ) => {
      setLightboxImages(images);
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    },
    []
  );

  const stepLightbox = useCallback(
    (dir: "next" | "prev") => {
      if (lightboxImages.length === 0) return;
      setLightboxIndex((prev) =>
        dir === "next"
          ? (prev + 1) % lightboxImages.length
          : (prev - 1 + lightboxImages.length) % lightboxImages.length
      );
    },
    [lightboxImages.length]
  );

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        return;
      }
      if (event.key === "ArrowRight") {
        stepLightbox("next");
      }
      if (event.key === "ArrowLeft") {
        stepLightbox("prev");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLightboxOpen, stepLightbox]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageBanner
        title="Notre Histoire"
        variant="compact"
      />

      {/* Origine du nom */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background Image légère */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('images/personnes/fond-3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative max-w-[420px] mx-auto">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-white/70 bg-white/50 backdrop-blur-sm">
                  <img
                    src="images/personnes/treich-laplene.jpg"
                    alt="Marcel Treich-Laplène"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#f8812f]/30 rounded-full blur-2xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Origine du nom</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Marcel Treich-Laplène
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Ancien village Ebrié dénommé <strong className="text-gray-900">Anoumabo</strong>, signifiant « forêt aux roussettes »,
                  Treichville est riche d'une histoire marquée par de profondes mutations. Après avoir porté le nom du premier
                  explorateur français en Côte d'Ivoire, <strong className="text-gray-900">Treich-Laplène</strong>, la commune
                  s'est affirmée comme un <strong className="text-gray-900">territoire de luttes, de migrations et d'émancipation</strong>.
                </p>
                <p>
                  Elle a notamment accueilli les premiers Européens à l'époque coloniale, amorçant ainsi les premières
                  transformations démographiques et économiques. Son développement est étroitement lié à l'essor économique
                  du pays, en particulier à travers les activités portuaires, industrielles et commerciales.
                </p>
                <p>
                  Commune populaire et cosmopolite, Treichville a forgé une identité forte fondée sur le brassage culturel,
                  la solidarité communautaire et l'esprit entrepreneurial.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block w-12 h-1 bg-[#f8812f] mb-6"></span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Présentation de Treichville
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Treichville est l'une des communes historiques d'Abidjan, où le vivre-ensemble, la fraternité, l'hospitalité
                et l'union des peuples s'expriment au quotidien. Cette réalité a valu à la commune le surnom de
                <strong className="text-gray-900"> « Commune N'zassa »</strong>, attribué par son Premier Magistrat,
                le Maire François Albert Amichia. En langue akan, <em>N'zassa</em> signifie le brassage, le métissage et
                l'union des peuples.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Souvent qualifiée de <strong className="text-gray-900">« CEDEAO en miniature »</strong>, Treichville incarne
                une expérience réussie d'intégration sous-régionale. La commune abrite une importante communauté étrangère,
                majoritairement issue de l'Afrique de l'Ouest, mais également des ressortissants du monde arabe, d'Europe,
                d'Asie et des Amériques. Cette diversité se reflète notamment dans ses rues commerciales emblématiques et
                dans son intense activité économique.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                La présence du Port Autonome d'Abidjan et l'implantation de grands groupes industriels et commerciaux tels
                que Bolloré, Castelli, SIFCA ou SOLIBRA renforcent davantage la notoriété de Treichville comme modèle
                d'intégration et de dynamisme économique.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[520px]"
            >
              <div className="absolute inset-0">
                <button
                  onClick={() => nudgePresentation("prev")}
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#f8812f] transition-all duration-300 flex items-center justify-center shadow-xl group"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#f8812f] transition-colors" />
                </button>
                <button
                  onClick={() => nudgePresentation("next")}
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#f8812f] transition-all duration-300 flex items-center justify-center shadow-xl group"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#f8812f] transition-colors" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                  {presentationSlides.map((slide, index) => {
                    const isActive = index === currentPresentation;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => {
                          setPresentationDirection(index > currentPresentation ? 1 : -1);
                          setCurrentPresentation(index);
                        }}
                        type="button"
                        className={`h-2.5 rounded-full transition-all ${
                          isActive ? "w-6 bg-[#f8812f]" : "w-2.5 bg-white/80 hover:bg-white"
                        }`}
                        aria-label={`Aller à l'image ${index + 1}`}
                      />
                    );
                  })}
                </div>

                <AnimatePresence custom={presentationDirection} initial={false}>
                  <motion.div
                    key={presentationSlides[currentPresentation].id}
                    custom={presentationDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {/* Image principale - Grande */}
                    <div className="absolute top-0 left-0 w-[80%] h-[420px] z-10">
                      <button
                        type="button"
                        onClick={() => openLightbox(presentationImages, currentPresentation * 2)}
                        className="relative h-full w-full group cursor-pointer"
                        aria-label="Voir l'image en grand"
                      >
                        <img
                          src={presentationSlides[currentPresentation].main.url}
                          alt={presentationSlides[currentPresentation].main.alt}
                          className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
                        {/* Bordure décorative */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-[#03800a]/20 to-[#f8812f]/20 rounded-3xl -z-10 blur-xl" />
                      </button>
                    </div>

                    {/* Image secondaire - Petite, en bas à droite */}
                    <div className="absolute bottom-0 right-0 w-[60%] h-[300px] z-20">
                      <button
                        type="button"
                        onClick={() => openLightbox(presentationImages, currentPresentation * 2 + 1)}
                        className="relative h-full w-full group cursor-pointer"
                        aria-label="Voir l'image en grand"
                      >
                        <div className="absolute inset-0 bg-white p-3 rounded-3xl shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                          <img
                            src={presentationSlides[currentPresentation].secondary.url}
                            alt={presentationSlides[currentPresentation].secondary.alt}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                        {/* Badge décoratif */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                          <Building className="w-10 h-10 text-white" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute top-1/4 -left-6 w-32 h-32 bg-[#03800a]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-6 w-40 h-40 bg-[#f8812f]/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">En chiffres</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Treichville en quelques données</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, value: "1934", label: "Année de création" },
              { icon: Users, value: "150 000+", label: "Habitants" },
              { icon: MapPin, value: "7.29 km²", label: "Superficie" },
              { icon: Building, value: "10+", label: "Quartiers" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Situation géographique */}
      <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">
              Géographie
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Une position stratégique
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 opacity-[0.08] bg-no-repeat bg-left-top bg-contain pointer-events-none"
                  style={{ backgroundImage: "url('/logo.png')" }}
                />
                <div className="relative space-y-5">
                  {/* <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#03800a] rounded-xl flex items-center justify-center">
                      <Map className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Une position exceptionnelle</h3>
                  </div> */}
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Située au cœur d'Abidjan Sud, Treichville bénéficie d'une position stratégique exceptionnelle,
                    caractérisée par :
                  </p>

                  <ul className="space-y-3 text-gray-700 leading-relaxed text-lg">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f8812f]" />
                      <span><strong>La proximité immédiate du Port Autonome d'Abidjan</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f8812f]" />
                      <span><strong>Une connexion directe avec les communes du Plateau, de Marcory et de Koumassi</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f8812f]" />
                      <span><strong>La présence de grandes gares routières et d’axes structurants</strong>.</span>
                    </li>
                  </ul>

                  <div className="space-y-3 text-gray-700 leading-relaxed text-lg">
                    <p>
                      <strong>Le Pont Houphouët-Boigny et le Pont Général de Gaulle</strong> reliant la commune
                      de Treichville à celle du Plateau.
                    </p>
                    <p>
                      <strong>L’échangeur Shinzo Abe</strong> reliant Treichville à Marcory par le Boulevard
                      Felix Houphouët Boigny.
                    </p>
                  </div>

                  <p className="text-gray-900 font-semibold text-lg">
                    Cette centralité fait de Treichville un pôle logistique, commercial et économique de premier plan.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { url: "/port.jpg", label: "Port Autonome d'Abidjan" },
                { url: "/pont-fhb.jpg", label: "Pont Houphouet-Boigny" },
                { url: "/pont-charles-degaule.jpg", label: "Pont General de Gaulle" },
                { url: "/echangeur-shinzo-abe.webp", label: "Echangeur Shinzo Abe" },
              ].map((image, idx) => (
                <motion.button
                  key={image.url}
                  type="button"
                  onClick={() =>
                    openLightbox(
                      [
                        { id: "port", url: "/port.jpg", alt: "Port Autonome d'Abidjan" },
                        { id: "fhb", url: "/pont-fhb.jpg", alt: "Pont Houphouet-Boigny" },
                        { id: "cdg", url: "/pont-charles-degaule.jpg", alt: "Pont General de Gaulle" },
                        { id: "shinzo", url: "/echangeur-shinzo-abe.webp", alt: "Echangeur Shinzo Abe" },
                      ],
                      idx
                    )
                  }
                  className="group relative h-44 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg bg-gray-200"
                >
                  <img
                    src={image.url}
                    alt={image.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                    {image.label}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quartiers */}
      {/*
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Nos quartiers</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Les quartiers de Treichville</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {quartiers.map((quartier, index) => (
              <motion.div
                key={quartier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#f8812f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#03800a] transition-colors">
                      {quartier.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{quartier.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Patrimoine culturel */}
      {/*
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Patrimoine</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Lieux emblématiques
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {patrimoine.map((lieu, idx) => (
              <motion.div
                key={lieu.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${lieu.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className={`w-14 h-14 bg-gradient-to-br ${lieu.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <lieu.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{lieu.title}</h3>
                <p className="text-gray-600 leading-relaxed">{lieu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Économie */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Économie</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Un pôle économique majeur
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Son développement est étroitement lié à l'essor économique du pays, en particulier à travers les
                  activités portuaires, industrielles et commerciales. Commune populaire et cosmopolite, Treichville
                  a forgé une identité forte fondée sur le brassage culturel, la solidarité communautaire et l'esprit
                  entrepreneurial.
                </p>
                <p>
                  La présence du <strong className="text-gray-900">Port Autonome d'Abidjan</strong>, mis en service
                  en 1951, constitue l'un des piliers majeurs du développement économique et politique de la Côte d'Ivoire.
                  Son implantation à proximité immédiate de Treichville a profondément structuré la commune, qui est
                  devenue un centre stratégique de main-d'œuvre, de commerce et de services liés aux activités portuaires.
                </p>
                <p>
                  L'implantation de grands groupes industriels et commerciaux tels que
                  <strong className="text-gray-900"> Bolloré, Castelli, SIFCA ou SOLIBRA</strong> renforce davantage
                  la notoriété de Treichville comme modèle d'intégration et de dynamisme économique. La commune constitue
                  un moteur économique majeur grâce à un tissu commercial dense et structurant, des activités industrielles
                  et artisanales variées, une forte présence de PME et de l'économie informelle.
                </p>
              </div>

              {/* <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#03800a] to-[#03800a] rounded-xl p-5 text-white">
                  <div className="text-3xl font-bold mb-1">1er</div>
                  <div className="text-sm text-white/90">Port d'Afrique de l'Ouest</div>
                </div>
                <div className="bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl p-5 text-white">
                  <div className="text-3xl font-bold mb-1">5000+</div>
                  <div className="text-sm text-white/90">Commerces et entreprises</div>
                </div>
              </div> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative h-72 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/30 to-transparent z-10 pointer-events-none" />

                <button
                  type="button"
                  onClick={() => openLightbox(economicImages, currentEconomy)}
                  className="absolute inset-0 z-10 cursor-zoom-in"
                  aria-label="Voir l'image en grand"
                />
                <button
                  onClick={() => nudgeEconomy("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#03800a] transition-all duration-300 flex items-center justify-center shadow-xl group"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#03800a] transition-colors" />
                </button>
                <button
                  onClick={() => nudgeEconomy("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#03800a] transition-all duration-300 flex items-center justify-center shadow-xl group"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#03800a] transition-colors" />
                </button>

                <AnimatePresence custom={economyDirection} initial={false}>
                  <motion.div
                    key={economicImages[currentEconomy].id}
                    custom={economyDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={economicImages[currentEconomy].url}
                      alt={economicImages[currentEconomy].alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#f8812f]/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gouvernance municipale */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url('/logo.png')" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Administration</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Gouvernance municipale</h2>
          </motion.div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 order-2 lg:order-1"
            >
              <div className="h-72 sm:h-80 lg:h-[460px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/mairie.jpg"
                  alt="Mairie de Treichville"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  La Commune de Treichville est administrée par un Conseil municipal dirigé par le Maire.
                  L'administration communale s'appuie sur un Secrétariat général, qui coordonne six directions :
                </p>
                <ul className="space-y-2">
                  {[
                    "Direction des Affaires Économiques et Financières",
                    "Direction des Affaires Administratives et de la Formation",
                    "Direction des Services Techniques et de l'Environnement",
                    "Direction de Cabinet",
                    "Direction des Services Sociaux, Culturels et de la Promotion humaine",
                    "Direction de la Sécurité Incendie et de l'Assistance à Personnes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#f8812f]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <p className="text-gray-900 font-semibold mb-3">
                  La gouvernance municipale est fondée sur trois principes majeurs :
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Users, title: "Proximité", desc: "Avec les populations" },
                    { icon: Target, title: "Performance", desc: "Administrative" },
                    { icon: Landmark, title: "Transparence", desc: "Et redevabilité" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-center"
                    >
                      <div className="w-10 h-10 bg-[#f8812f] rounded-full flex items-center justify-center mx-auto mb-3">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-gray-700">
                  Une administration de proximité, à l’écoute des citoyens, pour un service public plus efficace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructures et équipements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Équipements</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Infrastructures et équipements structurants</h2>
          </motion.div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 opacity-[0.06] bg-no-repeat bg-left-top bg-contain pointer-events-none"
                  style={{ backgroundImage: "url('/logo.png')" }}
                />
                <div className="relative space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Treichville dispose de nombreux équipements structurants, parmi lesquels :
                  </p>
                  <ul className="space-y-3 text-gray-700 leading-relaxed text-lg">
                    {[
                      "Des bâtiments administratifs municipaux",
                      "Des établissements scolaires et des centres de formation",
                      "Des centres de santé publics et privés, ainsi qu’un dispensaire municipal offrant des soins gratuits",
                      "Des infrastructures sportives et culturelles",
                      "Des marchés, des gares routières et des espaces de loisirs",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-3 w-3 rounded-full bg-[#f8812f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[
                {
                  src: "/ecole-maternelle.jpeg",
                  title: "Ecole maternelle Marguerite Sakoum",
                  caption:
                    "Etablissement prescolaire municipal de la commune.",
                },
                {
                  src: "/dispensaire-municipal.png",
                  title: "Dispensaire municipal",
                  caption:
                    "Structure de sante de proximite pour rapprocher les soins.",
                },
              ].map((item) => (
                <div key={item.src} className="space-y-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-52 object-cover"
                    />
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">{item.title}</strong> {item.caption}
                  </div>
                </div>
              ))}

              <div className="sm:col-span-2 space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                  <img
                    src="/stade-cheick-konate.png"
                    alt="Stade Cheick Konaté Anzoumana"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="text-sm text-gray-700 leading-relaxed text-center">
                  <strong className="text-gray-900">Stade Cheick Konaté Anzoumana</strong> situé au quartier
                  Yobou Lambert ex Biafra.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamique économique locale */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Économie locale</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Dynamique économique locale</h2>
          </motion.div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 items-start">
            {/* Texte principal */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 opacity-[0.06] bg-no-repeat bg-left-top bg-contain pointer-events-none"
                  style={{ backgroundImage: "url('/logo.png')" }}
                />
                <div className="relative space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    La commune constitue un <strong>moteur économique majeur</strong>, grâce à :
                  </p>
                  <ul className="space-y-3 text-gray-700 leading-relaxed text-lg">
                    {[
                      "Un tissu commercial dense et une structure diversifiée",
                      "Des activités industrielles dans différents secteurs",
                      "L'importance des PME et de l'économie informelle",
                      "Des initiatives d'insertion professionnelle et d'entrepreneuriat jeunesse",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-3 w-3 rounded-full bg-[#f8812f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pôles économiques */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[
                {
                  image: "/marche-telephone.jpg",
                  title: "Marché de téléphones",
                  badge: "Pôle technologique",
                  badgeColor: "bg-[#03800a]",
                  text:
                    "Pôle informel majeur de la téléphonie mobile, reconnu pour la diversité de l’offre et le savoir-faire.",
                },
                {
                  image: "/centre-artisanal.png",
                  title: "CAVA",
                  badge: "Artisanat & Culture",
                  badgeColor: "bg-[#f8812f]",
                  text:
                    "Centre Artisanal de la Ville d'Abidjan, vitrine de l’artisanat local ivoirien et africain.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 ${item.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">{item.title}</strong> — {item.text}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vie sociale, culturelle et sportive */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Vie communautaire</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Vie sociale, culturelle et sportive</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              La vie sociale de Treichville se distingue par sa richesse et son dynamisme, avec une intense activité culturelle,
              artistique et sportive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Activité culturelle et artistique",
                description: "Événements culturels, expositions et manifestations artistiques tout au long de l'année",
                icon: Palette,
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Manifestations sportives",
                description: "Compétitions, tournois et encadrement soutenu de la jeunesse par le sport",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Tissu associatif actif",
                description: "Associations de quartiers, unions de femmes et groupements de jeunes dynamiques",
                icon: Heart,
                color: "from-[#03800a] to-emerald-700",
              },
              {
                title: "Cohésion sociale",
                description: "Actions de solidarité, célébrations communautaires et programmes d'entraide",
                icon: Users,
                color: "from-[#f8812f] to-amber-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* TODO: Images des programmes sociaux (natation, fête des mères/pères) */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600"
                  alt="Programme natation enfants - Image placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Programme natation 2025 : 2 mois offerts à plus de 1000 enfants de la commune
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600"
                  alt="Fête des mères - Image placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Célébration de la fête des mères avec remise de cadeaux aux mamans de la commune
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600"
                  alt="Fête des pères - Image placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Célébration de la fête des pères avec les papas de la commune
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Actions et politiques de développement */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#03800a] font-semibold uppercase tracking-wider text-sm mb-3">Politiques municipales</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Actions et politiques de développement</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Politiques structurantes</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-[#03800a] pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Cadre de vie et salubrité</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Création d'un Comité local de salubrité, d'une brigade dédiée et d'équipes de nettoyage nocturne
                    pour une commune propre.
                  </p>
                </div>
                <div className="border-l-4 border-[#f8812f] pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Programmes sociaux</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Prise en charge scolaire, équipement des cantines, soutien aux comités de quartiers,
                    unions de femmes et associations de jeunes.
                  </p>
                </div>
                <div className="border-l-4 border-[#03800a] pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Modernisation des services</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Amélioration continue des services municipaux pour plus d'efficacité et de proximité.
                  </p>
                </div>
                <div className="border-l-4 border-[#f8812f] pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Digitalisation progressive</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Transformation numérique de l'administration pour des services plus accessibles.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* TODO: Images comité salubrité et prise en charge scolaire */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800"
                    alt="Comité de salubrité - Image placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Comité local de salubrité</h4>
                  <p className="text-gray-600 text-sm">
                    Opérations mensuelles de nettoyage de la commune avec la participation des habitants et des agents municipaux.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800"
                    alt="Prise en charge scolaire - Image placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Soutien à l'éducation</h4>
                  <p className="text-gray-600 text-sm">
                    Remise de prises en charge scolaires aux élèves et étudiants de la commune pour favoriser leur réussite.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Perspectives et vision d'avenir */}
      <section className="py-16 bg-gradient-to-br from-[#f8812f] to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#03800a] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-white/80 font-semibold uppercase tracking-wider text-sm mb-3">Avenir</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Perspectives et vision d'avenir</h2>
            <p className="text-white/90 max-w-3xl mx-auto">
              La vision municipale s'articule autour de plusieurs axes prioritaires pour faire de Treichville
              une commune moderne, inclusive et dynamique.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Building,
                title: "Développement urbain maîtrisé",
                description: "Aménagement harmonieux et durable du territoire",
              },
              {
                icon: TrendingUp,
                title: "Économie locale renforcée",
                description: "Soutien à l'entrepreneuriat et à l'emploi",
              },
              {
                icon: Heart,
                title: "Commune propre, moderne et inclusive",
                description: "Cadre de vie amélioré pour tous les habitants",
              },
              {
                icon: Users,
                title: "Jeunesse formée et engagée",
                description: "Formation, responsabilisation et insertion des jeunes",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[#f8812f]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* TODO: Image projet Eburny Pearl */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="aspect-video lg:aspect-auto bg-white/5">
                <img
                  src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800"
                  alt="Projet Eburny Pearl - Image placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Projet Eburny Pearl</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Rénovation ambitieuse du quartier Yobou-Lambert (ex-Biafra) visant à transformer cet espace
                  en un pôle moderne d'attractivité économique, culturelle et touristique.
                </p>
                <p className="text-white/80 text-sm">
                  Un projet structurant pour l'avenir de Treichville et du District d'Abidjan.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline - Commentée temporairement */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Chronologie</p>
            <h2 className="text-3xl font-bold text-gray-900">Les grandes dates</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#03800a]/20"></div>
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-8 lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'} text-left`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 break-words">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#f8812f] to-amber-500 text-white text-sm font-bold rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#03800a] rounded-full border-4 border-white shadow"></div>
                <div className="hidden lg:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#03800a] to-[#03800a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Fier d'être Treichvillois
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Treichville, c'est avant tout une histoire humaine, un patrimoine vivant
              et une communauté dynamique qui construit chaque jour l'avenir de la commune.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute -top-12 right-0 rounded-full bg-white/90 hover:bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg transition-colors"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Fermer"
              >
                Fermer
              </button>

              <button
                type="button"
                onClick={() => stepLightbox("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#f8812f] transition-all duration-300 flex items-center justify-center shadow-xl group"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#f8812f] transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => stepLightbox("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#f8812f] transition-all duration-300 flex items-center justify-center shadow-xl group"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#f8812f] transition-colors" />
              </button>

              {lightboxImages[lightboxIndex] && (
                <>
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black/40">
                    <img
                      src={lightboxImages[lightboxIndex].url}
                      alt={lightboxImages[lightboxIndex].alt}
                      className="w-full max-h-[80vh] object-contain"
                    />
                  </div>
                  <div className="mt-4 text-center text-sm text-white/80">
                    {lightboxImages[lightboxIndex].alt}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Histoire.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Histoire;
