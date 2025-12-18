import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Building, Ship, ShoppingBag, Landmark, Map, Heart, Home, ChevronLeft, ChevronRight } from "lucide-react";
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
        url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
        alt: "Treichville - Vue principale",
      },
      secondary: {
        url: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600",
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

  const timeline = [
    { year: "1934", title: "Création de Treichville", description: "Fondation officielle de la commune, nommée en l'honneur de Marcel Treich-Laplène." },
    { year: "1960", title: "Indépendance", description: "Treichville devient une commune à part entière de la jeune République de Côte d'Ivoire." },
    { year: "1980", title: "Expansion", description: "Développement des infrastructures et croissance démographique importante." },
    { year: "2000", title: "Modernisation", description: "Lancement de grands projets d'aménagement et de rénovation urbaine." },
    { year: "Aujourd'hui", title: "Treichville moderne", description: "Une commune dynamique, cœur économique et culturel d'Abidjan." },
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
                  Treichville tire son nom de <strong className="text-gray-900">Marcel Treich-Laplène</strong> (1860-1890),
                  explorateur français qui a joué un rôle crucial dans l'exploration de la Côte d'Ivoire à la fin du XIXe siècle.
                </p>
                <p>
                  Envoyé en mission d'exploration en 1887, Treich-Laplène a parcouru l'arrière-pays ivoirien,
                  établissant des contacts avec les populations locales et contribuant à la connaissance géographique
                  de la région.
                </p>
                <p>
                  En hommage à son travail d'exploration et à sa contribution à l'histoire de la Côte d'Ivoire,
                  la commune fondée en 1934 porte fièrement son nom, perpétuant ainsi sa mémoire.
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
                Treichville est une commune emblématique d'Abidjan, située au cœur de la capitale économique
                de la Côte d'Ivoire. Connue pour son dynamisme commercial, sa richesse culturelle et son
                histoire unique, elle représente un véritable melting-pot de cultures et de traditions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Avec ses marchés animés, ses quartiers historiques et sa population cosmopolite,
                Treichville incarne l'âme d'Abidjan. La commune abrite également le célèbre Port d'Abidjan,
                poumon économique de la sous-région ouest-africaine.
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
      <section className="py-16 bg-white">
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
      </section>

      {/* Situation géographique */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">Géographie</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Une position stratégique</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#03800a] rounded-xl flex items-center justify-center">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Localisation</h3>
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Située au sud du Plateau, Treichville est bordée par la lagune Ébrié et constitue
                    une zone de transition entre le centre administratif d'Abidjan et les communes plus
                    résidentielles.
                  </p>
                  <p>
                    <strong className="text-gray-900">Limites :</strong> La commune est délimitée au nord
                    par la lagune Ébrié, à l'est par la commune de Marcory, à l'ouest par le Boulevard VGE,
                    et au sud par l'océan Atlantique.
                  </p>
                  <p>
                    Cette position stratégique fait de Treichville un carrefour économique majeur,
                    facilité par la proximité du Port Autonome d'Abidjan et des principales voies de communication.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Carousel Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/30 to-transparent z-10 pointer-events-none" />

                <button
                  onClick={() => nudge("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#03800a] transition-all duration-300 flex items-center justify-center shadow-xl group"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#03800a] transition-colors" />
                </button>
                <button
                  onClick={() => nudge("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-[#03800a] transition-all duration-300 flex items-center justify-center shadow-xl group"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#03800a] transition-colors" />
                </button>

                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={geographicImages[currentGeo].id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(geographicImages, currentGeo)}
                      className="absolute inset-0 cursor-pointer"
                      aria-label="Voir l'image en grand"
                    >
                      <img
                        src={geographicImages[currentGeo].url}
                        alt={geographicImages[currentGeo].alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#03800a]/20 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quartiers */}
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

      {/* Patrimoine culturel */}
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
                  Treichville se positionne comme l'un des principaux centres économiques d'Abidjan,
                  grâce notamment à la présence du <strong className="text-gray-900">Port Autonome d'Abidjan</strong>,
                  premier port d'Afrique de l'Ouest francophone.
                </p>
                <p>
                  Le commerce constitue l'épine dorsale de l'économie locale, avec des marchés animés
                  comme celui de <strong className="text-gray-900">Belleville</strong> et de la
                  <strong className="text-gray-900"> Zone 4</strong>, qui attirent quotidiennement
                  des milliers de commerçants et de clients.
                </p>
                <p>
                  La commune accueille également de nombreuses PME, entreprises de services,
                  et établissements financiers, renforçant son statut de hub économique incontournable.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#03800a] to-[#03800a] rounded-xl p-5 text-white">
                  <div className="text-3xl font-bold mb-1">1er</div>
                  <div className="text-sm text-white/90">Port d'Afrique de l'Ouest</div>
                </div>
                <div className="bg-gradient-to-br from-[#f8812f] to-amber-500 rounded-xl p-5 text-white">
                  <div className="text-3xl font-bold mb-1">5000+</div>
                  <div className="text-sm text-white/90">Commerces et entreprises</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800"
                  alt="Activité économique à Treichville"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#f8812f]/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
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
      </section>

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
