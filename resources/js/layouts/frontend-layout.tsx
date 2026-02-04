import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { Menu, X, Building2, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ApplifeCTA from "@/components/Frontend/ApplifeCTA";
import ScrollToTop from "@/components/Frontend/ScrollToTop";
import NotificationContainer from "@/components/NotificationContainer";
import { NotificationProvider } from "@/contexts/NotificationContext";
import type { SharedData } from "@/types";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({});

  const { url, props } = usePage<SharedData>();
  const authUser = props.auth?.user;
  const isAdmin = authUser?.role === 'admin';

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

  const navDirections = (props as any).navDirections ?? [];

  const resolveSubPath = (sub: { path?: string; href?: string; externalUrl?: string }) => {
    if (sub.externalUrl) return sub.externalUrl;
    if (sub.href) return sub.href;
    if (sub.path) return createPageUrl(sub.path);
    return "#";
  };

  // Fonction pour vérifier si un menu est actif
  const isMenuActive = (path: string, submenu?: { label: string; path?: string; href?: string; externalUrl?: string }[]) => {
    const currentPath = url.toLowerCase();
    const menuPath = createPageUrl(path).toLowerCase();

    // Vérifier si c'est la page exacte
    if (currentPath === menuPath) return true;

    // Vérifier si c'est une page du sous-menu
    if (submenu) {
      return submenu.some(sub => {
        if (sub.externalUrl) return false;
        const subPath = resolveSubPath(sub).toLowerCase();
        return currentPath === subPath;
      });
    }

    return false;
  };

  const menuItems = [
    { 
      label: "Vie citoyenne", 
      path: "VieCitoyenne",
      submenu: [
        { label: "Message du Maire", path: "MessageMaire" },
        { label: "Le Maire et le Conseil", path: "ConseilMunicipal" },
        { label: "Actualités", path: "Actualites" }
      ]
    },
    { 
      label: "Notre histoire", 
      path: "Histoire",
      submenu: [
        { label: "Présentation et Historique", path: "Histoire" },
        { label: "Patrimoine et Monuments", path: "Patrimoine" },
        { label: "Annexes", path: "HistoireAnnexes" }
      ]
    },
    // { 
    //   label: "Services", 
    //   path: "Services",
    //   submenu: [
    //     { label: "Organigrammes et services", path: "Services" },
    //     { label: "État civil", path: "EtatCivil" },
    //     { label: "Fiscalité et urbanisme", path: "Fiscalite" }
    //   ]
    // },
    {
      label: "Directions", 
      path: "Directions",
      submenu: [
        // { label: "Organigrammes et services", path: "Services" },
        ...navDirections.map((direction: any) => ({
          label: direction.label,
          href: direction.path,
        })),
      ],
    },
    {
      label: "Communication",
      path: "Communication",
      submenu: [
        { label: "Journal", path: "Journal" },
        { label: "Radio", path: "RadioOfficiel", externalUrl: "https://radiotreichville.ci/" },
        { label: "Vidéo", path: "Video" },
      ],
    },
    { 
      label: "Que faire à Treichville?", 
      path: "QueFaire",
      submenu: [
        { label: "Evénements", path: "Evenements" },
        { label: "Endroit à découvrir", path: "ParcsPiscines" }
      ]
    },
    { label: "Nos Contacts", path: "Contact" }
  ];

  return (
    // Provider de notifications pour gérer tous les messages flash et notifications
    <NotificationProvider>
      <div className="min-h-screen bg-white">
        <style>{`
          :root {
            --primary-orange: #f8812f;
            --primary-teal: #03800a;
            --dark-bg: #1F2937;
            --light-gray: #F3F4F6;
          }
        `}</style>

      {/* Top Bar */}
      <div className="bg-[var(--primary-orange)] text-white text-sm py-3 border-b border-orange-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:contact@treichville.ci" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@treichville.ci</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Lun - Ven 7h30 - 16h30</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white/80 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <nav className="bg-white relative">
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
                {menuItems.map((item) => {
                  const isActive = isMenuActive(item.path, item.submenu);
                  return (
                    <div
                      key={item.path}
                      className="relative group"
                    >
                      {item.submenu ? (
                        <button
                          type="button"
                          className={`px-4 py-4 font-medium rounded-lg transition-all duration-300 flex items-center gap-1 ${
                            isActive
                              ? 'bg-[#03800a] text-white hover:bg-[#026707]'
                              : 'text-gray-800 hover:bg-[#f8812f] hover:text-white'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                      ) : (
                        <Link
                          href={createPageUrl(item.path)}
                          className={`px-3.5 py-3 font-medium rounded-lg transition-all duration-300 flex items-center gap-1 ${
                            item.label === 'Nos Contacts'
                              ? 'bg-[#03800a] text-white hover:bg-[#026707] shadow-lg'
                              : 'hover:bg-[#f8812f] hover:text-white'
                          } ${
                            isActive && item.label !== 'Nos Contacts'
                              ? 'bg-[#03800a] text-white hover:bg-[#026707]'
                            : item.label === 'Nos Contacts'
                              ? ''
                                : 'text-gray-800'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    
                    {item.submenu && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white rounded-lg shadow-xl py-2 min-w-[220px] border border-gray-100">
                          {item.submenu.map((sub) => {
                            const isExternal = Boolean((sub as any).externalUrl);
                            const subHref = resolveSubPath(sub as any);
                            const isSubActive = !isExternal && url.toLowerCase() === subHref.toLowerCase();
                            return (
                              <React.Fragment key={sub.href ?? sub.path ?? sub.label}>
                                {isExternal ? (
                                  <a
                                    href={subHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-3 transition-colors text-gray-700 hover:bg-[#026707] hover:text-white"
                                  >
                                    {sub.label}
                                  </a>
                                ) : (
                                  <Link
                                    href={subHref}
                                    className={`block px-4 py-3 transition-colors ${
                                      isSubActive
                                        ? 'bg-[#03800a] text-white font-semibold'
                                        : 'text-gray-700 hover:bg-[#026707] hover:text-white'
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>

              {/* Right Side - Desktop */}
              {isAdmin && (
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    href="/admin/dashboard"
                    className="px-5 py-2.5 bg-[var(--primary-orange)] text-white rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Dashboard
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-lg transition-colors z-50"
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
                  {menuItems.map((item) => {
                    const isActive = isMenuActive(item.path, item.submenu);
                    return (
                      <div key={item.path} className="border border-gray-100 rounded-xl overflow-hidden">
                        {item.submenu ? (
                          <button
                            onClick={() =>
                              setMobileOpen((prev) => ({ ...prev, [item.path]: !prev[item.path] }))
                            }
                            className={`w-full flex items-center justify-between px-4 py-3 font-semibold hover:bg-[var(--light-gray)] transition-colors ${
                              isActive
                                ? 'bg-[#03800a] text-white'
                                : 'text-gray-800'
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                mobileOpen[item.path] ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            href={createPageUrl(item.path)}
                            className={`block px-4 py-3 font-medium rounded-xl transition-colors ${
                              item.label === 'Nos Contacts'
                                ? 'bg-[var(--primary-teal)] text-white text-center shadow-lg'
                                : 'hover:bg-[var(--light-gray)]'
                            } ${
                              isActive && item.label !== 'Nos Contacts'
                                ? 'bg-[#03800a] text-white'
                                : item.label === 'Nos Contacts'
                                  ? ''
                                  : 'text-gray-800'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      {item.submenu && mobileOpen[item.path] && (
                        <div className="bg-gray-50 border-t border-gray-100">
                          {item.submenu.map((sub) => {
                            const isExternal = Boolean((sub as any).externalUrl);
                            const subHref = resolveSubPath(sub as any);
                            const isSubActive = !isExternal && url.toLowerCase() === subHref.toLowerCase();
                            return (
                              <React.Fragment key={sub.href ?? sub.path ?? sub.label}>
                                {isExternal ? (
                                  <a
                                    href={subHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-3 text-sm transition-colors text-gray-700 hover:bg-white"
                                  >
                                    {sub.label}
                                  </a>
                                ) : (
                                  <Link
                                    href={subHref}
                                    className={`block px-4 py-3 text-sm transition-colors ${
                                      isSubActive
                                        ? 'bg-[#03800a] text-white font-semibold'
                                        : 'text-gray-700 hover:bg-white'
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    );
                  })}
                  {isAdmin && (
                    <div className="pt-4 border-t border-gray-200">
                      <Link
                        href="/admin/dashboard"
                        className="block px-4 py-3 bg-[var(--primary-orange)] text-white text-center rounded-lg font-semibold shadow-lg"
                      >
                        Dashboard
                      </Link>
                    </div>
                  )}
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
      <footer className="bg-white text-gray-800 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logo/logo-t-1.png"
                  alt="Logo Treichville"
                  className="h-12 w-auto"
                />
                <div className="text-xl font-bold text-gray-900">Treichville</div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Commune dynamique d'Abidjan, au service de ses citoyens.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 border border-gray-200 hover:border-[var(--primary-orange)] hover:bg-[var(--primary-orange)] hover:text-white rounded-lg flex items-center justify-center transition-colors text-gray-600">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-gray-200 hover:border-[var(--primary-orange)] hover:bg-[var(--primary-orange)] hover:text-white rounded-lg flex items-center justify-center transition-colors text-gray-600">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-gray-200 hover:border-[var(--primary-orange)] hover:bg-[var(--primary-orange)] hover:text-white rounded-lg flex items-center justify-center transition-colors text-gray-600">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href={createPageUrl("EtatCivil")} className="hover:text-[var(--primary-orange)] transition-colors">État civil</Link></li>
                <li><Link href={createPageUrl("Fiscalite")} className="hover:text-[var(--primary-orange)] transition-colors">Fiscalité et urbanisme</Link></li>
                <li><Link href={createPageUrl("Services")} className="hover:text-[var(--primary-orange)] transition-colors">Organigrammes</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Liens rapides</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href={createPageUrl("Histoire")} className="hover:text-[var(--primary-orange)] transition-colors">Notre histoire</Link></li>
                <li><Link href={createPageUrl("Actualites")} className="hover:text-[var(--primary-orange)] transition-colors">Actualités</Link></li>
                <li><Link href={createPageUrl("Evenements")} className="hover:text-[var(--primary-orange)] transition-colors">Événements</Link></li>
                <li><Link href={createPageUrl("Contact")} className="hover:text-[var(--primary-orange)] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contact</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--primary-orange)] mt-1 flex-shrink-0" />
                  <span>District Autonome d’Abidjan – Mairie de Treichville</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--primary-orange)] flex-shrink-0" />
                  <span>+225 27-21-21-64-40</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--primary-orange)] flex-shrink-0" />
                  <span>+225 27-21-24-71-21</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--primary-orange)] flex-shrink-0" />
                  <span>+225 27-21-24-11-68</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[var(--primary-orange)] flex-shrink-0" />
                  <span>05 BP 926 ABIDJAN 05</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Mairie de Treichville. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Conteneur des notifications - affiche les messages flash et notifications */}
      <NotificationContainer />
    </div>
    </NotificationProvider>
  );
}
