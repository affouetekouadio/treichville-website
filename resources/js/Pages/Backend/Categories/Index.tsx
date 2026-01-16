import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useListingSearch } from '@/hooks/use-listing-search';

type CategoryItem = {
  id: number;
  name: string;
  type: 'actualite' | 'evenement';
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

type CategoriesPageProps = {
  categories?: CategoryItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const AdminCategories: FrontendPage<CategoriesPageProps> = ({
  categories = [],
  listing,
}) => {
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'name';
  const sortDirection = listing?.filters.direction ?? 'asc';
  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: categories.length,
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

  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'actualite',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch('/admin/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
        credentials: 'same-origin',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur création catégorie');
      await res.json();
      setOpenForm(false);
      setForm({ name: '', type: 'actualite' });
      listingVisit(baseUrl, { ...baseParams, page: 1 });
    } catch (error) {
      console.error(error);
      alert("Impossible de créer la catégorie.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Catégories" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Classification</p>
          <h1 className="text-2xl font-bold text-gray-900">Catégories</h1>
          <p className="text-sm text-gray-600">
            Gérez les catégories pour les actualités et les événements.
          </p>
        </div>
        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Nouvelle catégorie
        </button>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'name', label: 'Nom' },
          { value: 'type', label: 'Type' },
          { value: 'created_at', label: 'Date creation' },
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
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {categories.length ? (
                categories.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.type === 'actualite' ? 'Actualité' : 'Événement'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-6 text-center text-gray-500">
                    Aucune catégorie pour le moment.
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

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Nouvelle catégorie</p>
                <h2 className="text-lg font-semibold text-gray-900">Ajouter</h2>
              </div>
              <button
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                onClick={() => setOpenForm(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4 px-6 py-5" onSubmit={handleCreate}>
              <div>
                <label className="text-sm font-medium text-gray-700">Nom *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Ex: Institutionnel, Culture..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as CategoryItem['type'] })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  <option value="actualite">Actualité</option>
                  <option value="evenement">Événement</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  onClick={() => setOpenForm(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

AdminCategories.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminCategories;
