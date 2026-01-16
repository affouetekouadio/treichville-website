import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type AboutSectionProps = {
  backgroundImage?: string | null;
  mayorImage?: string | null;
};

export default function AboutSection({
  backgroundImage,
  mayorImage,
}: AboutSectionProps) {
  const fallbackBackground = "images/autres/maire-14.jpg";
  const fallbackMayor = "/images/personnes/maire-2.jpg";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-35 bg-cover bg-center"
        style={{
          backgroundImage:
            // "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80')",
            `url('${backgroundImage || fallbackBackground}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-white/80" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                src={mayorImage || fallbackMayor}
                alt="Le Maire"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Badge */}
              {/* <div className="absolute bottom-8 left-8 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-4xl font-bold text-[#f8812f] mb-2">Treichville</div>
                <div className="text-gray-600 font-semibold">Commune d'Abidjan</div>
              </div> */}
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#03800a]/10 rounded-2xl -z-10"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-[#f8812f]/10 rounded-full mb-4">
              <span className="text-[#f8812f] font-semibold text-sm tracking-wider uppercase">Le Maire</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Bienvenue à Treichville
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Treichville, berceau historique d'Abidjan, est une commune riche de son histoire, 
              de sa diversité culturelle et du dynamisme de ses habitants. Ensemble, nous œuvrons 
              chaque jour pour améliorer votre cadre de vie et promouvoir le développement de notre territoire.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {[
                "Un territoire dynamique et solidaire",
                "Des services de proximité pour tous",
                "Une commune tournée vers l'avenir"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#03800a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link href={createPageUrl("MessageMaire")}>
              <Button className="bg-[#f8812f] text-white hover:bg-orange-600 px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300">
                Lire le message du Maire
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
