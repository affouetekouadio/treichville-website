import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useListingSearch } from '@/hooks/use-listing-search';

type MediaItem = {
  id: number;
  title?: string | null;
  collection?: string | null;
  file_type?: string | null;
  mime_type?: string | null;
  size?: number | null;
  url?: string;
};

type ListingFilters = {
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  per_page?: number;
};

type ListingPaginationMeta = {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
};

type MediaPageProps = {
  media?: MediaItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const AdminMedia: FrontendPage<MediaPageProps> = ({ media = [], listing }) => {
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'created_at';
  const sortDirection = listing?.filters.direction ?? 'desc';
  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: media.length,
    last_page: 1,
  };
  const baseParams = useMemo(
    () => ({
      search,
      sort: sortValue,
      direction: sortDirection,
      per_page: pagination.per_page,
    }),
    [pagination.per_page, search, sortDirection, sortValue]
  );
  useListingSearch(baseUrl, baseParams);

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Médias" />

      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">Fichiers</p>
        <h1 className="text-2xl font-bold text-gray-900">Médias & PDF</h1>
        <p className="text-sm text-gray-600">
          Liste des fichiers envoyés (PDF du journal, images des pages).
        </p>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'created_at', label: 'Date creation' },
          { value: 'title', label: 'Titre' },
          { value: 'collection', label: 'Collection' },
          { value: 'size', label: 'Taille' },
        ]}
        onSearchChange={setSearch}
        onSearchSubmit={() => listingVisit(baseUrl, { ...baseParams, page: 1 })}
        onPerPageChange={(value) => listingVisit(baseUrl, { ...baseParams, per_page: value, page: 1 })}
        onExport={(format) => listingExport(baseUrl, baseParams, format)}
        onSortChange={(value, direction) => listingVisit(baseUrl, { ...baseParams, sort: value, direction })}
      />

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Collection</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Taille</th>
                <th className="px-4 py-3">Lien</th>
              </tr>
            </thead>
            <tbody>
              {media.length ? (
                media.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.title || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.collection || 'default'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.file_type || item.mime_type || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.size ? `${(item.size / 1024).toFixed(1)} Ko` : '—'}
                    </td>
                    <td className="px-4 py-3 text-blue-600">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer" className="underline">
                          Ouvrir
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Aucun fichier pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ListingPagination
        page={pagination.page}
        lastPage={pagination.last_page}
        total={pagination.total}
        onPageChange={(page) => listingVisit(baseUrl, { ...baseParams, page })}
      />
    </div>
  );
};

AdminMedia.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminMedia;
