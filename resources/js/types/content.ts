export type Actualite = {
  id: number | string;
  titre: string;
  slug?: string;
  description: string;
  contenu?: string;
  categorie: string;
  image_url?: string | null;
  date_publication: string;
};

export type Evenement = {
  id: number | string;
  titre: string;
  slug?: string;
  description: string;
  contenu?: string;
  categorie: string;
  image_url?: string | null;
  gratuit?: boolean;
  date_debut: string;
  date_fin?: string | null;
  lieu: string;
};

export type Service = {
  id: number | string;
  nom: string;
  slug?: string | null;
  description?: string | null;
  short_description?: string | null;
  contenu?: string | null;
  categorie?: string | null;
  icone?: string | null;
  icon?: string | null;
  lien_externe?: string | null;
  ordre?: number | null;
  responsable?: string | null;
  adresse?: string | null;
  contacts?: {
    type: string;
    valeur: string;
    label?: string | null;
  }[];
};

export type ContactPayload = {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
};
