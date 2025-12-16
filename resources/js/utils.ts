const PAGE_ROUTES: Record<string, string> = {
  Home: "/",
  VieCitoyenne: "/vie-citoyenne",
  MessageMaire: "/vie-citoyenne/message-du-maire",
  ConseilMunicipal: "/vie-citoyenne/conseil-municipal",
  QueFaire: "/que-faire",
  Histoire: "/histoire",
  Patrimoine: "/patrimoine",
  Actualites: "/actualites",
  ActualiteDetails: "/actualites/details",
  Evenements: "/evenements",
  EvenementDetails: "/evenements/details",
  Services: "/services",
  ServiceDetails: "/services/details",
  EtatCivil: "/etat-civil",
  Fiscalite: "/fiscalite-urbanisme",
  ParcsPiscines: "/parcs-piscines",
  Communication: "/communication",
  Journal: "/communication/journal",
  Radio: "/communication/radio",
  Video: "/communication/video",
  Contact: "/contact",
};

export function createPageUrl(pageKey: string): string {
  return PAGE_ROUTES[pageKey] ?? `/${pageKey.toLowerCase()}`;
}
