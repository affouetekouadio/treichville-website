import React from "react";
import { usePage } from "@inertiajs/react";
import HeroSection from "@/components/Frontend/Home/HeroSection";
import FlashInfoSection from "@/components/Frontend/Home/FlashInfoSection";
import QuickServicesSection from "@/components/Frontend/Home/QuickServicesSection";
import AboutSection from "@/components/Frontend/Home/AboutSection";
import TeamSection from "@/components/Frontend/Home/TeamSection";
import ServicesSection from "@/components/Frontend/Home/ServicesSection";
import ActualitesSection from "@/components/Frontend/Home/ActualitesSection";
import EvenementsSection from "@/components/Frontend/Home/EvenementsSection";
import CityStatsSection from "@/components/Frontend/Home/CityStatsSection";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import type { Service, Actualite, Evenement } from "@/types/content";

const FALLBACK_ACTUALITES: Actualite[] = [
  {
    id: 1,
    titre: "Réhabilitation du marché de Belleville",
    description: "Modernisation des infrastructures et amélioration des conditions pour les commerçants.",
    categorie: "Travaux",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    date_publication: "2024-08-10",
  },
  {
    id: 2,
    titre: "Nettoyage citoyen des berges lagunaires",
    description: "Appel aux bénévoles pour une opération propreté ce week-end.",
    categorie: "Environnement",
    image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    date_publication: "2024-08-12",
  },
  {
    id: 3,
    titre: "Forum emploi jeunes à la mairie",
    description: "Rencontrez les entreprises locales et découvrez les offres de formation.",
    categorie: "Social",
    image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    date_publication: "2024-08-14",
  },
];

const FALLBACK_EVENEMENTS: Evenement[] = [
  {
    id: 1,
    titre: "Festival des saveurs de Treichville",
    description: "Découverte de la gastronomie locale, concerts live et animations familiales.",
    categorie: "Culture",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    date_debut: "2025-09-05T10:00:00Z",
    date_fin: "2025-09-05T18:00:00Z",
    lieu: "Esplanade de la mairie",
    gratuit: true,
  },
  {
    id: 2,
    titre: "Course lagunaire solidaire",
    description: "Parcours 5 km et 10 km le long des berges pour soutenir les associations locales.",
    categorie: "Sport",
    image_url: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1600&q=80",
    date_debut: "2025-09-12T07:30:00Z",
    date_fin: "2025-09-12T11:00:00Z",
    lieu: "Berges lagunaires",
    gratuit: true,
  },
  {
    id: 3,
    titre: "Nuit de la culture urbaine",
    description: "Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune.",
    categorie: "Événement",
    // image_url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    image_url: "/images/nuit-culture-urbaine.jpg",
    date_debut: "2025-09-20T18:00:00Z",
    date_fin: "2025-09-21T00:00:00Z",
    lieu: "Centre culturel de Treichville",
    gratuit: false,
  },
];

type HomeProps = {
  services?: Service[];
  homeActualites?: Actualite[];
  homeEvenements?: Evenement[];
};

const Home: FrontendPage = () => {
  const { props } = usePage<HomeProps>();
  const services = props.services ?? [];
  const actualites = (props.homeActualites ?? FALLBACK_ACTUALITES);
  const evenements = (props.homeEvenements ?? FALLBACK_EVENEMENTS);

  return (
    <div>
      <HeroSection />
      <QuickServicesSection />
      <FlashInfoSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection services={services} />
      <CityStatsSection />
      <ActualitesSection actualites={actualites} />
      <EvenementsSection evenements={evenements} />
    </div>
  );
};

Home.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Home;
