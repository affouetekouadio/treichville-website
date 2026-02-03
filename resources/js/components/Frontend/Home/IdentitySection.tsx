import React from "react";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type IdentitySectionProps = {
  title?: string | null;
  content?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
};

export default function IdentitySection({
  title,
  content,
  ctaText,
  ctaLink,
}: IdentitySectionProps) {
  const hasDynamic = Boolean(title || content || ctaText || ctaLink);
  const fallbackTitle = "Carte d'identite de Treichville";
  const fallbackExcerpt =
    "<p>Treichville est l\u2019une des communes historiques d\u2019Abidjan, ou le vivre-ensemble, " +
    "la fraternite, l\u2019hospitalite et l\u2019union des peuples s\u2019expriment au quotidien. " +
    "Cette realite a valu a la commune le surnom de <strong>Commune N\u2019zassa</strong>, " +
    "attribue par son Premier Magistrat, le Maire Francois Albert Amichia. " +
    "En langue akan, <strong>N\u2019zassa</strong> signifie le brassage, le metissage et l\u2019union des peuples.</p>";
  const link = ctaLink || createPageUrl("Histoire");
  const buttonText = ctaText || "Découvrir l'histoire";

  return (
    <section className="relative py-16 overflow-hidden bg-[#F8FAFC]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="py-8 lg:py-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#03800a]/10 text-[#03800a] text-xs font-semibold uppercase tracking-wider mb-4">
                Carte d'identite
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {title || fallbackTitle}
              </h3>
              {content ? (
                <div
                  className="rich-content text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div
                  className="rich-content text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: fallbackExcerpt }}
                />
              )}
              <div className="mt-7">
                <Link
                  href={link}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f8812f] px-6 py-3 text-white font-semibold shadow-lg hover:bg-orange-600 transition-colors"
                >
                  {buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative group">
                <div className="absolute -inset-6 bg-[#03800a]/10 rounded-full blur-3xl" />
                <img
                  src="/maisnon-nzassa.jpg"
                  alt="Commune N'zassa"
                  className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[640px] h-[260px] sm:h-[320px] lg:h-[380px] object-cover opacity-95 rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
