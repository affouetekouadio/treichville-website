import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroSlide = {
  id?: number;
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  image: string | null;
  cta: string;
  cta_link?: string | null;
};

type HeroSectionProps = {
  slides?: HeroSlide[];
};

const fallbackSlides: HeroSlide[] = [
 
  {
    title: "Bienvenue à Treichville ",
    subtitle: "notre",
    highlight: "cité",
    description: "Découvrez le dynamisme et la richesse culturelle de notre commune",
    // image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
      image: "images/bannieres/banniere-1.jpg",
    cta: "Découvrir"
  },
  {
    title: "Services municipaux",
    subtitle: "à votre",
    highlight: "service",
    description: "État civil, fiscalité, urbanisme... simplifiez vos démarches",
    // image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    image: "images/bannieres/banniere-2.jpg",
    cta: "Nos services"
  },
  {
    title: "Treichville",
    subtitle: "Commune",
    highlight: "dynamique",
    description: "Événements, culture, sports... vivez pleinement votre commune",
    // image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
    // image: "images/bannieres/banniere-3.jpg",
    image: "images/autres/maire-14.jpg",
    cta: "Que faire ?"
  }, 
   {
    title: "",
    subtitle: "",
    highlight: "",
    description: "",
    // image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
    // image: "images/bannieres/banniere-3.jpg",
    image: "images/autres/maire-10.jpg",
    cta: "Treichville"
  }, 
   {
    title: "",
    subtitle: "",
    highlight: "",
    description: "",
    // image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
    // image: "images/bannieres/banniere-3.jpg",
    image: "images/bannieres/banniere-4.jpg",
    cta: "CHU de Treichville"
  }, 
];

export default function HeroSection({ slides = [] }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const activeSlides = useMemo(
    () => (slides.length ? slides : fallbackSlides),
    [slides]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  useEffect(() => {
    if (currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleCta = () => {
    const link = activeSlides[currentSlide]?.cta_link;
    if (!link) {
      scrollToSection("services");
      return;
    }
    if (link.startsWith("#")) {
      scrollToSection(link.slice(1));
      return;
    }
    window.location.href = link;
  };

  // Crossfade only to avoid revealing the section background between slides
  const variants = {
    enter: () => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: () => ({ opacity: 0 })
  };

  return (
    <section className="relative h-[380px] sm:h-[520px] lg:h-[700px] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={activeSlides[currentSlide].image ?? ""}
              alt={activeSlides[currentSlide].title}
              className="w-full h-full object-cover object-[75%_30%] sm:object-[center_30%]"
            />
            {/* ça ajoute un peti fond sur les images */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div> */}
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6"
            >
                {activeSlides[currentSlide].title}
                <br />
                {activeSlides[currentSlide].subtitle}{" "}
                <span className="text-[#f8812f]">
                  {activeSlides[currentSlide].highlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
            >
                {activeSlides[currentSlide].description}
              </motion.p>

              {Boolean(activeSlides[currentSlide]?.cta?.trim()) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Button
                    onClick={handleCta}
                    className="bg-[#f8812f] text-white hover:bg-orange-600 px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    {activeSlides[currentSlide].cta}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-3 sm:left-8 bottom-24 sm:bottom-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-[#f8812f] backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 z-10 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-3 sm:right-8 bottom-24 sm:bottom-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-[#f8812f] backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 z-10 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? "bg-[#f8812f] w-10"
              : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
