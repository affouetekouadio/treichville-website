export type Actualite = {
  id: number | string;
  titre: string;
  description: string;
  categorie: string;
  image_url?: string | null;
  date_publication: string;
};

export type Evenement = {
  id: number | string;
  titre: string;
  description: string;
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
  description?: string | null;
  categorie?: string | null;
  icone?: string | null;
  lien_externe?: string | null;
  ordre?: number | null;
};

export type ContactPayload = {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
};

