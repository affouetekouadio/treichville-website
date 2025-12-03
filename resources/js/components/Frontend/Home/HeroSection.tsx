import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
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
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative h-[700px] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction} mode="wait">
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
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
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
                className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                {slides[currentSlide].title}
                <br />
                {slides[currentSlide].subtitle}{" "}
                <span className="text-[#f8812f]">
                  {slides[currentSlide].highlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  onClick={() => scrollToSection("services")}
                  className="bg-[#f8812f] text-white hover:bg-orange-600 px-10 py-6 text-lg rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-[#f8812f] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-[#f8812f] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
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
