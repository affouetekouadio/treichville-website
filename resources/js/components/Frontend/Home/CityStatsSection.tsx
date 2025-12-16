import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, TrendingUp, Heart } from "lucide-react";

type Stat = {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
  bgGradient: string;
};

const stats: Stat[] = [
  {
    icon: Users,
    value: 137,
    suffix: "K",
    label: "Habitants",
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Building2,
    value: 12,
    suffix: "",
    label: "Quartiers",
    color: "text-[#f8812f]",
    bgGradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    icon: TrendingUp,
    value: 8,
    suffix: "K+",
    label: "Entreprises",
    color: "text-[#03800a]",
    bgGradient: "from-[#03800a]/20 to-[#03800a]/10",
  },
  {
    icon: Heart,
    value: 250,
    suffix: "+",
    label: "Services publics",
    color: "text-rose-500",
    bgGradient: "from-rose-500/20 to-pink-500/10",
  },
];

function Counter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <>{count}</>;
}

export default function CityStatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-gray-900/90" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#f8812f]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#03800a]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-orange-400 font-semibold uppercase tracking-wider text-sm mb-3">
            Treichville en chiffres
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Une commune dynamique
            <br />
            <span className="text-[#f8812f]">au cœur d'Abidjan</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>

                {/* Number */}
                <div className="relative mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold ${stat.color} tabular-nums`}>
                      <Counter value={stat.value} inView={inView} />
                    </span>
                    <span className={`text-3xl font-bold ${stat.color}`}>{stat.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <div className="relative">
                  <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
                </div>

                {/* Decorative Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.bgGradient.replace("/20", "").replace("/10", "")} w-0 group-hover:w-full transition-all duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-white/20">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#03800a] to-[#03800a] border-2 border-white" />
            </div>
            <span className="text-gray-900 font-medium">
              Plus de <span className="font-bold text-[#f8812f]">400 000</span> citoyens dans le
              district
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
