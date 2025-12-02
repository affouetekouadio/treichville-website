import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { Menu, X, Building2, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ApplifeCTA from "@/components/Frontend/ApplifeCTA";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { url } = usePage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [url]);

  const menuItems = [
    { 
      label: "Vie citoyenne", 
      path: "VieCitoyenne",
      submenu: [
        { label: "Message du Maire", path: "MessageMaire" },
        { label: "Le Maire et le Conseil", path: "ConseilMunicipal" },
        { label: "Dernières actus", path: "Actualites" }
      ]
    },
    { 
      label: "Notre histoire", 
      path: "Histoire",
      submenu: [
        { label: "Présentation et Historique", path: "Histoire" },
        { label: "Patrimoine et Monuments", path: "Patrimoine" }
      ]
    },
    { 
      label: "Services", 
      path: "Services",
      submenu: [
        { label: "Organigrammes et services", path: "Services" },
        { label: "État civil", path: "EtatCivil" },
        { label: "Fiscalité et urbanisme", path: "Fiscalite" }
      ]
    },
    { 
      label: "Que faire à Treichville?", 
      path: "QueFaire",
      submenu: [
        { label: "Events et expos", path: "Evenements" },
        { label: "Parcs et Piscines", path: "ParcsPiscines" }
      ]
    },
    { label: "Nos Contacts", path: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary-orange: #f8812f;
          --primary-teal: #1d8595;
          --dark-bg: #1F2937;
          --light-gray: #F3F4F6;
        }
      `}</style>

      {/* Top Bar */}
      <div className="bg-[var(--dark-bg)] text-white text-sm py-3 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:contact@treichville.ci" className="flex items-center gap-2 hover:text-[var(--primary-orange)] transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@treichville.ci</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Lun - Ven 7h30 - 16h30</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[var(--primary-orange)] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-[var(--primary-orange)] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-[var(--primary-orange)] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <nav className="bg-[var(--primary-orange)] relative">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href={createPageUrl("Home")} className="flex items-center group z-10">
                <img
                  src="/images/logo/logo-t-1.png"
                  alt="Treichville - Commune d'Abidjan"
                  className="h-16 w-auto transform group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-1">
                {menuItems.map((item) => (
                  <div 
                    key={item.path} 
                    className="relative group"
                  >
                    <Link
                      href={createPageUrl(item.path)}
                      className="px-4 py-4 text-white font-medium hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center gap-1"
                    >
                      {item.label}
                      {item.submenu && <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />}
                    </Link>
                    
                    {item.submenu && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white rounded-lg shadow-xl py-2 min-w-[220px] border border-gray-100">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.path}
                              href={createPageUrl(sub.path)}
                              className="block px-4 py-3 text-gray-700 hover:bg-[#1d8595] hover:text-white transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Side - Desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <a
                  href="#"
                  className="px-5 py-2.5 bg-[var(--primary-teal)] text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-semibold shadow-lg"
                >
                  Applife
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors z-50"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg"
              >
                <div className="px-6 py-4 space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.path}>
                      <Link
                        href={createPageUrl(item.path)}
                        className="block px-4 py-3 text-gray-800 font-medium hover:bg-[var(--light-gray)] rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 space-y-1">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.path}
                              href={createPageUrl(sub.path)}
                              className="block px-4 py-2 text-gray-600 text-sm hover:bg-[var(--light-gray)] rounded-lg transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <a
                      href="#"
                      className="block px-4 py-3 bg-[var(--primary-teal)] text-white text-center rounded-lg font-semibold"
                    >
                      Applife
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Applife CTA */}
      <ApplifeCTA />

      {/* Footer */}
      <footer className="bg-[var(--dark-bg)] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--primary-orange)] rounded-lg flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="text-xl font-bold">Treichville</div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Commune dynamique d'Abidjan, au service de ses citoyens.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[var(--primary-orange)] rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[var(--primary-orange)] rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[var(--primary-orange)] rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href={createPageUrl("EtatCivil")} className="hover:text-[var(--primary-orange)] transition-colors">État civil</Link></li>
                <li><Link href={createPageUrl("Fiscalite")} className="hover:text-[var(--primary-orange)] transition-colors">Fiscalité et urbanisme</Link></li>
                <li><Link href={createPageUrl("Services")} className="hover:text-[var(--primary-orange)] transition-colors">Organigrammes</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Liens rapides</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href={createPageUrl("Histoire")} className="hover:text-[var(--primary-orange)] transition-colors">Notre histoire</Link></li>
                <li><Link href={createPageUrl("Actualites")} className="hover:text-[var(--primary-orange)] transition-colors">Actualités</Link></li>
                <li><Link href={createPageUrl("Evenements")} className="hover:text-[var(--primary-orange)] transition-colors">Événements</Link></li>
                <li><Link href={createPageUrl("Contact")} className="hover:text-[var(--primary-orange)] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--primary-orange)] mt-1 flex-shrink-0" />
                  <span>Mairie de Treichville<br />Abidjan, Côte d'Ivoire</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--primary-orange)] flex-shrink-0" />
                  <span>+225 27 21 24 XX XX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[var(--primary-orange)] flex-shrink-0" />
                  <span>contact@treichville.ci</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Mairie de Treichville. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}