import React, { useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adjoint 1",
    role: "Vie citoyenne & proximité",
    image: "/images/personnes/1.jpg",
  },
  {
    id: 2,
    name: "Adjoint 2",
    role: "Culture & patrimoine",
    image: "/images/personnes/2.jpg",
  },
  {
    id: 3,
    name: "Adjoint 3",
    role: "Urbanisme & cadre de vie",
    image: "/images/personnes/3.jpg",
  },
  {
    id: 4,
    name: "Adjoint 4",
    role: "Jeunesse & sports",
    image: "/images/personnes/4.jpg",
  },
];

export default function TeamSection() {
  // Prépare une liste répétée pour un défilement fluide
  const duplicatedMembers = [...teamMembers, ...teamMembers];
  const controls = useAnimation();
  const loopDistance = -100 * teamMembers.length;

  const startLoop = useCallback(() => {
    controls.start({
      x: [0, loopDistance],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 28,
        ease: "linear",
      },
    });
  }, [controls, loopDistance]);

  useEffect(() => {
    startLoop();
  }, [startLoop]);

  const nudge = useCallback(
    async (direction: "next" | "prev") => {
      await controls.stop();
      await controls.start({
        x: direction === "next" ? "-=240" : "+=240",
        transition: { duration: 0.35, ease: "easeInOut" },
      });
      startLoop();
    },
    [controls, startLoop]
  );

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#f8812f] font-semibold uppercase tracking-wider text-sm mb-3">
            Notre équipe
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Rencontrez les membres du
            <br />
            <span className="text-[#1d8595]">conseil municipal</span>
          </h2>
        </motion.div>

        {/* Slider infini */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          <button
            onClick={() => nudge("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
            aria-label="Précédent"
          >
            <span className="sr-only">Précédent</span>
            ‹
          </button>
          <button
            onClick={() => nudge("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
            aria-label="Suivant"
          >
            <span className="sr-only">Suivant</span>
            ›
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={controls}
              transition={{
                x: {
                  duration: 28,
                },
              }}
            >
              {duplicatedMembers.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="flex-shrink-0 w-80 group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 relative">
                    <div className="relative overflow-hidden h-96">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1d8595]/85 via-[#1d8595]/35 to-transparent opacity-90" />
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#1d8595] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 font-medium text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 mt-12 max-w-2xl mx-auto"
        >
          Des élus engagés au service de Treichville et de ses habitants, œuvrant chaque jour pour
          améliorer notre commune.
        </motion.p>
      </div>
    </section>
  );
}
