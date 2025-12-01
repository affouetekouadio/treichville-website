import React from "react";
import HeroSection from "@/components/Frontend/Home/HeroSection";
import QuickServicesSection from "@/components/Frontend/Home/QuickServicesSection";
import AboutSection from "@/components/Frontend/Home/AboutSection";
import ServicesSection from "@/components/Frontend/Home/ServicesSection";
import ActualitesSection from "@/components/Frontend/Home/ActualitesSection";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const Home: FrontendPage = () => {
  return (
    <div>
      <HeroSection />
      <QuickServicesSection />
      <AboutSection />
      <ServicesSection />
      <ActualitesSection />
    </div>
  );
};

Home.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Home;