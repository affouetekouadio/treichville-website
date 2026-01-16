import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  ordre: number;
}

type TeamSectionProps = {
  adjoints?: Array<{
    id: number;
    nom: string;
    role: string;
    photo_url: string | null;
    ordre: number;
  }>;
};

const fallbackMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adjoint 1",
    role: "Vie citoyenne & proximité",
    image: "/images/personnes/1.jpg",
    ordre: 1,
  },
  {
    id: 2,
    name: "Adjoint 2",
    role: "Culture & patrimoine",
    image: "/images/personnes/2.jpg",
    ordre: 2,
  },
  {
    id: 3,
    name: "Adjoint 3",
    role: "Urbanisme & cadre de vie",
    image: "/images/personnes/3.jpg",
    ordre: 3,
  },
  {
    id: 4,
    name: "Adjoint 4",
    role: "Jeunesse & sports",
    image: "/images/personnes/4.jpg",
    ordre: 4,
  },
];

export default function TeamSection({ adjoints = [] }: TeamSectionProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const source = adjoints.length ? adjoints : fallbackMembers;
  const normalized: TeamMember[] = source.map((member) => {
    const isAdjoint = 'nom' in member;
    return {
      id: member.id,
      name: isAdjoint ? member.nom : member.name,
      role: member.role,
      image: isAdjoint ? member.photo_url ?? "/images/personnes/default.jpg" : member.image,
      ordre: member.ordre,
    };
  });
  const orderedMembers = [...normalized].sort((a, b) => a.ordre - b.ordre);
  const members = useMemo(() => [...orderedMembers, ...orderedMembers], [orderedMembers]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      window.clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    const node = sliderRef.current;
    if (!node) return;
    stopAutoScroll();
    const scroll = () => {
      const halfWidth = node.scrollWidth / 2;
      node.scrollLeft += 1;
      if (node.scrollLeft >= halfWidth) {
        node.scrollLeft = 0;
      }
    };
    autoScrollRef.current = window.setInterval(scroll, 20);
  }, [stopAutoScroll]);

  const scrollByStep = useCallback((direction: "next" | "prev") => {
    const node = sliderRef.current;
    const card = cardRef.current;
    if (!node || !card) return;
    const gap = 32; // matches gap-8
    const step = card.offsetWidth + gap;
    const maxScroll = node.scrollWidth - node.clientWidth;
    const next = direction === "next" ? node.scrollLeft + step : node.scrollLeft - step;
    const target = next >= maxScroll ? 0 : next < 0 ? maxScroll : next;
    node.scrollTo({ left: target, behavior: "smooth" });
    stopAutoScroll();
    resumeTimeoutRef.current = window.setTimeout(() => startAutoScroll(), 3000);
  }, [startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
            Les adjoints au Maire
            <br />
            {/* <span className="text-[#03800a]">Les Adjoints au Maire</span> */}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <button
            onClick={() => scrollByStep("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center shadow"
            aria-label="Précédent"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scrollByStep("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center shadow"
            aria-label="Suivant"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={sliderRef}
            className="overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth"
          >
            <div className="flex gap-8">
              {members.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="flex-shrink-0 w-80 group"
                  ref={index === 0 ? cardRef : undefined}
                >
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 relative shadow-lg h-full flex flex-col">
                    <a
                      href={member.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden h-96 block"
                      aria-label={`Voir la photo de ${member.name}`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </a>
                    <div className="p-6 text-center bg-white flex flex-col flex-1 justify-center items-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#03800a] transition-colors text-center">
                        {member.name}
                      </h3>
                      <p className="inline-flex items-center rounded-full bg-[#f8812f] px-4 py-1.5 text-sm font-bold text-white shadow-sm text-center">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
