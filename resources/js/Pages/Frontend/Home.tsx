import React from "react";
import { usePage } from "@inertiajs/react";
import HeroSection from "@/components/Frontend/Home/HeroSection";
import FlashInfoSection, { type FlashInfo } from "@/components/Frontend/Home/FlashInfoSection";
import QuickServicesSection from "@/components/Frontend/Home/QuickServicesSection";
import AboutSection from "@/components/Frontend/Home/AboutSection";
import IdentitySection from "@/components/Frontend/Home/IdentitySection";
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

type HomeSlide = {
  id: number;
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  image: string | null;
  cta: string;
  cta_link?: string | null;
};

type HomeProps = {
  services?: Service[];
  homeContent?: {
    welcome?: {
      background_image?: string | null;
      image?: string | null;
    };
    identity?: {
      title?: string | null;
      content?: string | null;
      cta_text?: string | null;
      cta_link?: string | null;
    };
    stats?: {
      background_image?: string | null;
    };
  };
  homeSlides?: HomeSlide[];
  homeActualites?: Actualite[];
  homeEvenements?: Evenement[];
  homeDirections?: Array<{
    id: number;
    nom: string;
    slug?: string | null;
    short_description?: string | null;
    icon?: string | null;
    ordre?: number | null;
  }>;
  homeAdjoints?: {
    id: number;
    nom: string;
    role: string;
    photo_url: string | null;
    ordre: number;
  }[];
  flashInfos?: FlashInfo[];
};

const Home: FrontendPage = () => {
  const { props } = usePage<HomeProps>();
  const services = props.services ?? [];
  const actualites = (props.homeActualites ?? FALLBACK_ACTUALITES);
  const evenements = props.homeEvenements ?? [];
  const adjoints = props.homeAdjoints ?? [];
  const directions = props.homeDirections ?? [];
  const flashInfos = props.flashInfos ?? [];

  return (
    <div>
      <HeroSection slides={props.homeSlides} />
      <QuickServicesSection directions={directions} />
      <FlashInfoSection flashInfos={flashInfos} />
      <AboutSection
        backgroundImage={props.homeContent?.welcome?.background_image}
        mayorImage={props.homeContent?.welcome?.image}
      />
      <IdentitySection
        title={props.homeContent?.identity?.title}
        content={props.homeContent?.identity?.content}
        ctaText={props.homeContent?.identity?.cta_text}
        ctaLink={props.homeContent?.identity?.cta_link}
      />
      <TeamSection adjoints={adjoints} />
      <ServicesSection services={services} />
      <CityStatsSection backgroundImage={props.homeContent?.stats?.background_image} />
      <ActualitesSection actualites={actualites} />
      <EvenementsSection evenements={evenements} />
    </div>
  );
};

Home.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Home;
