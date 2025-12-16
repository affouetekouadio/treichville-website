import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const members = useMemo(() => [...teamMembers, ...teamMembers], []);

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
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      scrollByStep("next");
    }, 4500);
    return () => clearInterval(timer);
  }, [scrollByStep]);

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
            className="overflow-hidden"
          >
            <div className="flex gap-8">
              {members.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="flex-shrink-0 w-80 group"
                  ref={index === 0 ? cardRef : undefined}
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 relative shadow-lg">
                    <div className="relative overflow-hidden h-96">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03800a]/85 via-[#03800a]/35 to-transparent opacity-90" />
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#03800a] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 font-medium text-sm">{member.role}</p>
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
