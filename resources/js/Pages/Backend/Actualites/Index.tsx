import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus, X, Trash2, Edit, Eye, Image as ImageIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import RichTextEditor from '@/components/Admin/RichTextEditor';
import { useListingSearch } from '@/hooks/use-listing-search';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type ActualiteItem = {
  id: number;
  titre: string;
  categorie?: string | null;
  category_id?: number | null;
  category?: { name: string } | null;
  description?: string | null;
  contenu?: string | null;
  status?: string | null;
  published_at?: string | null;
  image_path?: string | null;
  image_url?: string | null;
};

type Category = {
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

type ActualitesPageProps = {
  actualites?: ActualiteItem[];
  categories?: Category[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const AdminActualites: FrontendPage<ActualitesPageProps> = ({
  actualites = [],
  categories = [],
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
    total: actualites.length,
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
    categorie: '',
    category_id: '',
    status: 'published',
    published_at: '',
    description: '',
    contenu: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => {
    setForm({
      titre: '',
      categorie: '',
      category_id: '',
      status: 'published',
      published_at: '',
      description: '',
      contenu: '',
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

      const url = editingId ? `/admin/api/actualites/${editingId}` : '/admin/api/actualites';

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
      addNotification('success', json.message || (editingId ? 'Actualité modifiée' : 'Actualité créée'));

      setOpenForm(false);
      resetForm();
      listingVisit(baseUrl, { ...baseParams, page: 1 });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : "Impossible de sauvegarder l'actualité");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: ActualiteItem) => {
    setForm({
      titre: item.titre,
      categorie: item.categorie || '',
      category_id: String(item.category_id || ''),
      status: item.status || 'draft',
      published_at: item.published_at ? item.published_at.split('T')[0] : '',
      description: item.description || '',
      contenu: item.contenu || '',
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
      const res = await fetch(`/admin/api/actualites/${deleteConfirm.id}`, {
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

      const json = await res.json();
      addNotification('success', json.message || 'Actualité supprimée');

      setDeleteConfirm({ open: false, id: null });
      listingVisit(baseUrl, baseParams);
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : "Impossible de supprimer l'actualité");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Actualités" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Contenu</p>
          <h1 className="text-2xl font-bold text-gray-900">Actualités</h1>
          <p className="text-sm text-gray-600">
            Liste des articles déjà saisis. Ajouter/éditer à connecter ensuite.
          </p>
        </div>
        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#03800a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166e7b]"
        >
          <Plus className="h-4 w-4" />
          Nouvelle actualité
        </button>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'created_at', label: 'Date creation' },
          { value: 'published_at', label: 'Date publication' },
          { value: 'titre', label: 'Titre' },
          { value: 'status', label: 'Statut' },
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
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Publié le</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {actualites.length ? (
                actualites.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3">
                      {item.image_url ? (
                        <button
                          onClick={() =>
                            setImageModal({
                              open: true,
                              url: item.image_url!,
                              title: item.titre,
                            })
                          }
                          className="relative group cursor-pointer"
                          title="Cliquer pour agrandir"
                        >
                          <img
                            src={item.image_url}
                            alt={item.titre}
                            className="h-12 w-20 rounded object-cover bg-gray-100 transition-all group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                            <svg
                              className="h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </button>
                      ) : (
                        <div className="flex h-12 w-20 items-center justify-center rounded bg-gray-100">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.titre}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.category?.name || item.categorie || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          item.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/actualites/${item.id}`}
                          className="rounded p-1 text-gray-600 hover:bg-gray-100"
                          title="Voir le détail"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded p-1 text-blue-600 hover:bg-blue-50"
                          title="Éditer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="rounded p-1 text-red-600 hover:bg-red-50"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Aucune actualité pour le moment.
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Nouvelle actualité</p>
                <h2 className="text-lg font-semibold text-gray-900">Créer un article</h2>
              </div>
              <button
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4 px-6 py-5" onSubmit={handleCreate}>
              <div>
                <label className="text-sm font-medium text-gray-700">Titre *</label>
                <input
                  required
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Titre de l’article"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Catégorie</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value, categorie: '' })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  >
                    <option value="">Sélectionner</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Catégories limitées au type Actualité.</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Publié le</label>
                  <input
                    type="date"
                    value={form.published_at}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                </div>
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
              <div>
                <label className="text-sm font-medium text-gray-700">Description courte</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Résumé affiché sur la carte"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contenu (CKEditor)</label>
                <RichTextEditor
                  value={form.contenu}
                  onChange={(val) => setForm({ ...form, contenu: val })}
                  placeholder="Saisir l’article complet"
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

      {/* Confirmation de suppression */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer cette actualité ?"
        message="Cette action est irréversible. L'actualité sera définitivement supprimée."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Prévisualisation de l'image */}
      <ImagePreviewModal
        open={imageModal.open}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
        imageUrl={imageModal.url}
        title={imageModal.title}
      />
    </div>
  );
};

AdminActualites.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminActualites;
