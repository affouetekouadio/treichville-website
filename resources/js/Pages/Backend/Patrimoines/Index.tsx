import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Edit, Eye, Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import RichTextEditor from '@/components/Admin/RichTextEditor';
import { useListingSearch } from '@/hooks/use-listing-search';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type PatrimoineItem = {
  id: number;
  titre: string;
  description?: string | null;
  contenu?: string | null;
  lieu?: string | null;
  status?: string | null;
  published_at?: string | null;
  image_path?: string | null;
  image_url?: string | null;
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

type PatrimoinesPageProps = {
  patrimoines?: PatrimoineItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const AdminPatrimoines: FrontendPage<PatrimoinesPageProps> = ({
  patrimoines = [],
  listing,
}) => {
  const { addNotification } = useNotification();
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'created_at';
  const sortDirection = listing?.filters.direction ?? 'desc';
  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: patrimoines.length,
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [imageModal, setImageModal] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: '',
    title: '',
  });
  const [form, setForm] = useState({
    titre: '',
    lieu: '',
    status: 'published',
    published_at: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => {
    setForm({
      titre: '',
      lieu: '',
      status: 'published',
      published_at: '',
      description: '',
    });
    setImageFile(null);
    setEditingId(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val ?? ''));
      if (imageFile) fd.append('image', imageFile);

      if (editingId) {
        fd.append('_method', 'PUT');
      }

      const url = editingId ? `/admin/api/patrimoines/${editingId}` : '/admin/api/patrimoines';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: fd,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur de sauvegarde');
      }

      const json = await res.json();
      addNotification('success', json.message || (editingId ? 'Patrimoine modifié' : 'Patrimoine créé'));

      setOpenForm(false);
      resetForm();
      listingVisit(baseUrl, { ...baseParams, page: 1 });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : "Impossible de sauvegarder le patrimoine");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: PatrimoineItem) => {
    setForm({
      titre: item.titre,
      lieu: item.lieu || '',
      status: item.status || 'draft',
      published_at: item.published_at ? item.published_at.split('T')[0] : '',
      description: item.description || '',
    });
    setEditingId(item.id);
    setOpenForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch(`/admin/api/patrimoines/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur de suppression');
      }

      addNotification('success', 'Patrimoine supprimé');
      setDeleteConfirm({ open: false, id: null });
      listingVisit(baseUrl, { ...baseParams, page: pagination.page });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer');
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenImage = (url?: string | null, title?: string | null) => {
    if (!url) return;
    setImageModal({
      open: true,
      url,
      title: title || 'Image',
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Patrimoines" />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Patrimoines</h1>
          <p className="text-sm text-gray-500">Monuments, lieux emblématiques et repères institutionnels.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setOpenForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#03800a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166e7b]"
        >
          <Plus className="h-4 w-4" />
          Nouveau patrimoine
        </button>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'created_at', label: 'Date création' },
          { value: 'published_at', label: 'Date publication' },
          { value: 'titre', label: 'Titre' },
          { value: 'status', label: 'Statut' },
        ]}
        onSearchChange={(value) => setSearch(value)}
        onSearchSubmit={() => listingVisit(baseUrl, { ...baseParams, page: 1 })}
        onPerPageChange={(value) => listingVisit(baseUrl, { ...baseParams, per_page: value, page: 1 })}
        onSortChange={(value, direction) => listingVisit(baseUrl, { ...baseParams, sort: value, direction, page: 1 })}
        onExport={(format) => listingExport(baseUrl, { ...baseParams, export: format })}
      />

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-gray-100">
          {patrimoines.length ? (
            patrimoines.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => handleOpenImage(item.image_url, item.titre)}
                    className="h-20 w-28 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                  >
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.titre} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    )}
                  </button>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{item.titre}</p>
                    {item.lieu && <p className="text-xs text-gray-500">{item.lieu}</p>}
                    <p className="text-xs text-gray-500">
                      {item.status === 'published' ? 'Publié' : 'Brouillon'}
                      {item.published_at ? ` • ${item.published_at}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.image_url && (
                    <button
                      type="button"
                      onClick={() => handleOpenImage(item.image_url, item.titre)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(item.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-gray-500">Aucun patrimoine enregistré.</div>
          )}
        </div>
      </div>

      <ListingPagination
        currentPage={pagination.page}
        lastPage={pagination.last_page}
        onPageChange={(page) => listingVisit(baseUrl, { ...baseParams, page })}
      />

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Modifier le patrimoine' : 'Nouveau patrimoine'}
              </h2>
              <button
                type="button"
                onClick={() => setOpenForm(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Titre</label>
                  <input
                    value={form.titre}
                    onChange={(e) => setForm({ ...form, titre: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="Titre du patrimoine"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Lieu</label>
                  <input
                    value={form.lieu}
                    onChange={(e) => setForm({ ...form, lieu: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="Ex: Treichville, Abidjan"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date de publication</label>
                  <input
                    type="date"
                    value={form.published_at}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Statut</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  >
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description (CKEditor)</label>
                <RichTextEditor
                  value={form.description}
                  onChange={(val) => setForm({ ...form, description: val })}
                  placeholder="Texte descriptif du patrimoine"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Image principale</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                />
                <p className="mt-1 text-xs text-gray-500">Formats image, max 4 Mo.</p>
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
                  className="rounded-lg bg-[#03800a] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166e7b] disabled:opacity-60"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer ce patrimoine ?"
        message="Cette action est irréversible. Le patrimoine sera définitivement supprimé."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      <ImagePreviewModal
        open={imageModal.open}
        imageUrl={imageModal.url}
        title={imageModal.title}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
      />
    </div>
  );
};

AdminPatrimoines.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminPatrimoines;
