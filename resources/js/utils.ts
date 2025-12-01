const PAGE_ROUTES: Record<string, string> = {
  Home: "/",
  Actualites: "/actualites",
  Evenements: "/evenements",
  Services: "/services",
  Contact: "/contact",
};

export function createPageUrl(pageKey: string): string {
  return PAGE_ROUTES[pageKey] ?? `/${pageKey.toLowerCase()}`;
}

