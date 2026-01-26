import { router } from '@inertiajs/react';

export type ListingQueryParams = {
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
  category?: string | number;
  year?: string | number;
  month?: string | number;
  export?: 'csv' | 'xls';
};

export function buildListingQuery(params: ListingQueryParams): Record<string, string> {
  const query: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    query[key] = String(value);
  });

  return query;
}

export function listingVisit(url: string, params: ListingQueryParams): void {
  router.get(url, buildListingQuery(params), {
    preserveState: true,
    replace: true,
  });
}

export function listingExport(url: string, params: ListingQueryParams, format: 'csv' | 'xls'): void {
  const query = new URLSearchParams(buildListingQuery({ ...params, export: format }));
  window.location.href = `${url}?${query.toString()}`;
}
