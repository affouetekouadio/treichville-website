import React from "react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const ActualiteDetails: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Détail de l'actualité</h1>
        <p className="text-gray-600">
          Le contenu détaillé de cette actualité sera affiché ici une fois les données disponibles.
        </p>
      </div>
    </div>
  );
};

ActualiteDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ActualiteDetails;
