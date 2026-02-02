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
    "En langue akan, <strong>N\u2019zassa</strong> signifie le brassage, le metissage et l\u2019union des peuples.</p>" +
    "<p><strong>Ancien village Ebrie denommee Anoumabo</strong>, signifiant \"foret aux roussettes\", " +
    "Treichville est riche d\u2019une histoire marquee par de profondes mutations. " +
    "Apres avoir porte le nom du premier explorateur francais en Cote d\u2019Ivoire, Treich-Laplene, " +
    "la commune s\u2019est affirmee comme un territoire de luttes, de migrations et d\u2019emancipation. " +
    "Elle a notamment accueilli les premiers Europeens a l\u2019epoque coloniale, " +
    "amorcant ainsi les premieres transformations demographiques et economiques.</p>";
  const link = ctaLink || createPageUrl("Histoire");
  const buttonText = ctaText || "Découvrir l'histoire";

  return (
    <section className="relative py-16 overflow-hidden bg-[#F8FAFC]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-8 lg:py-10"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 items-center">
            <div>
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
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-[#03800a]/10 rounded-full blur-3xl" />
                <img
                  src="/logo.png"
                  alt="Logo Treichville"
                  className="relative w-48 sm:w-56 lg:w-64 h-auto opacity-80"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
