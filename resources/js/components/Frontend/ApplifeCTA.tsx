import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Download, Bell, MapPin, Calendar, Shield } from "lucide-react";

export default function ApplifeCTA() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#1d8595] via-[#1d8595] to-[#0d7490]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1600&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d8595]/95 via-[#1d8595]/90 to-[#0d7490]/95" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Smartphone className="w-5 h-5 text-[#f8812f]" />
              <span className="text-white font-semibold text-sm">Application mobile officielle</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Téléchargez
              <br />
              <span className="text-[#f8812f]">Applife Treichville</span>
            </h2>

            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Simplifiez vos démarches administratives, restez informé des actualités et événements,
              et accédez à tous les services de la commune depuis votre smartphone.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Bell, text: "Notifications en temps réel" },
                { icon: Calendar, text: "Événements et actualités" },
                { icon: MapPin, text: "Géolocalisation des services" },
                { icon: Shield, text: "Sécurisé et fiable" },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#f8812f]" />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Télécharger sur</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="group inline-flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Disponible sur</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white">15K+</div>
                <div className="text-white/70 text-sm">Téléchargements</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white">4.8</div>
                <div className="text-white/70 text-sm">Note moyenne</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-white/70 text-sm">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative max-w-[240px]">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#f8812f]/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

              {/* Phone Image/Mockup */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="bg-white/10 backdrop-blur-lg rounded-[2rem] p-2.5 shadow-2xl border border-white/20">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[1.5rem] overflow-hidden w-[220px] h-[420px]">
                    {/* Phone Notch */}
                    <div className="h-4 bg-black rounded-b-2xl mx-auto w-24" />

                    {/* App Screenshot Placeholder */}
                    <div className="p-3.5 h-full bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 bg-[#f8812f] rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-white" />
                        </div>
                        <Bell className="w-4 h-4 text-gray-400" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-1">Bienvenue</h3>
                      <p className="text-gray-600 text-xs mb-3">Votre commune à portée de main</p>

                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-white rounded-lg p-2.5 shadow-md">
                            <div className="flex items-center gap-2">
                              <div className="w-9 h-9 bg-[#1d8595]/10 rounded-lg flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="h-2 bg-gray-300 rounded w-3/4 mb-1" />
                                <div className="h-1.5 bg-gray-200 rounded w-1/2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
