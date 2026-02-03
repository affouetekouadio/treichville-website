const PAGE_ROUTES: Record<string, string> = {
  Home: "/",
  VieCitoyenne: "/vie-citoyenne",
  MessageMaire: "/vie-citoyenne/message-du-maire",
  ConseilMunicipal: "/vie-citoyenne/conseil-municipal",
  QueFaire: "/que-faire",
  Histoire: "/histoire",
  HistoireAnnexes: "/histoire/annexes",
  Patrimoine: "/patrimoine",
  Actualites: "/actualites",
  ActualiteDetails: "/actualites",
  Evenements: "/evenements",
  EvenementDetails: "/evenements",
  Services: "/services",
  ServiceDetails: "/services",
  EtatCivil: "/etat-civil",
  Fiscalite: "/fiscalite-urbanisme",
  ParcsPiscines: "/endroits-a-decouvrir",
  Communication: "/communication",
  Journal: "/communication/journal",
  Radio: "/communication/radio",
  Video: "/communication/video",
  Contact: "/contact",
};

export function createPageUrl(pageKey: string): string {
  return PAGE_ROUTES[pageKey] ?? `/${pageKey.toLowerCase()}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function actualiteDetailUrl(slug: string): string {
  return `/actualites/${slug}`;
}

export function evenementDetailUrl(slug: string): string {
  return `/evenements/${slug}`;
}

export function serviceDetailUrl(slug: string): string {
  return `/services/${slug}`;
}
