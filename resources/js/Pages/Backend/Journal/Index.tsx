import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { FileText, Image as ImageIcon, Plus, Trash2, X, Edit } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type JournalEditionItem = {
  id: number;
  title: string;
  description?: string | null;
  file_url?: string | null;
  cover_image_url?: string | null;
  file_size?: number | null;
  file_size_label?: string | null;
  published_at?: string | null;
  ordre?: number | null;
  actif: boolean;
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

type JournalPageProps = {
  editions?: JournalEditionItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const AdminJournal: FrontendPage<JournalPageProps> = ({ editions = [], listing }) => {
  const { addNotification } = useNotification();
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'published_at';
  const sortDirection = listing?.filters.direction ?? 'desc';

  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: editions.length,
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
    title: '',
    description: '',
    published_at: '',
    ordre: '0',
    actif: true,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      published_at: '',
      ordre: '0',
      actif: true,
    });
    setPdfFile(null);
    setCoverFile(null);
    setCoverPreview(null);
    setEditingId(null);
  };

  const handleEdit = (item: JournalEditionItem) => {
    setForm({
      title: item.title ?? '',
      description: item.description ?? '',
      published_at: item.published_at ?? '',
      ordre: String(item.ordre ?? 0),
      actif: item.actif,
    });
    setCoverPreview(item.cover_image_url ?? null);
    setEditingId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const fd = new FormData();

      Object.entries(form).forEach(([key, val]) => {
        if (key === 'actif') {
          fd.append(key, val ? '1' : '0');
        } else {
          fd.append(key, val ?? '');
        }
      });

      if (pdfFile) fd.append('file', pdfFile);
      if (coverFile) fd.append('cover_image', coverFile);

      const url = editingId ? `/admin/api/journal/${editingId}` : '/admin/api/journal';
      if (editingId) {
        fd.append('_method', 'PUT');
      }

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
      addNotification('success', json.message || (editingId ? 'Édition mise à jour' : 'Édition créée'));

      setOpenForm(false);
      resetForm();
      listingVisit(baseUrl, { ...baseParams, page: 1 });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch(`/admin/api/journal/${deleteConfirm.id}`, {
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
      addNotification('success', json.message || 'Édition supprimée');

      setDeleteConfirm({ open: false, id: null });
      listingVisit(baseUrl, baseParams);
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Journal municipal" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Communication</p>
          <h1 className="text-2xl font-bold text-gray-900">Journal municipal</h1>
          <p className="text-sm text-gray-600">
            Gérer les éditions PDF affichées sur le site.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setOpenForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#03800a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166e7b]"
        >
          <Plus className="h-4 w-4" />
          Nouvelle édition
        </button>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'published_at', label: 'Date' },
          { value: 'title', label: 'Titre' },
          { value: 'created_at', label: 'Création' },
          { value: 'ordre', label: 'Ordre' },
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
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Ordre</th>
                <th className="px-4 py-3">Taille</th>
                <th className="px-4 py-3">Actif</th>
                <th className="px-4 py-3">Fichier</th>
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {editions.length ? (
                editions.map((edition) => (
                  <tr key={edition.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{edition.title}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {edition.published_at
                        ? new Date(edition.published_at).toLocaleDateString('fr-FR')
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{edition.ordre ?? 0}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {edition.file_size_label || (edition.file_size ? `${edition.file_size} o` : '—')}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{edition.actif ? 'Oui' : 'Non'}</td>
                    <td className="px-4 py-3">
                      {edition.file_url ? (
                        <a
                          href={edition.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          PDF
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {edition.cover_image_url ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-gray-700 hover:underline"
                          onClick={() =>
                            setImageModal({
                              open: true,
                              url: edition.cover_image_url || '',
                              title: edition.title,
                            })
                          }
                        >
                          <ImageIcon className="h-4 w-4" />
                          Voir
                        </button>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(edition)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Éditer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ open: true, id: edition.id })}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
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
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                    Aucune édition pour le moment.
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
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Édition du journal</p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Éditer l’édition' : 'Nouvelle édition'}
                </h2>
              </div>
              <button
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                onClick={() => setOpenForm(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Titre *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="Titre de l'édition"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={form.published_at}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Résumé de l'édition"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">PDF *</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    required={!editingId}
                    onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                  <p className="mt-1 text-xs text-gray-500">PDF, max 20 Mo.</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cover</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setCoverFile(file);
                      setCoverPreview(file ? URL.createObjectURL(file) : null);
                    }}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                  {coverPreview && (
                    <button
                      type="button"
                      onClick={() =>
                        setImageModal({
                          open: true,
                          url: coverPreview,
                          title: 'Aperçu cover',
                        })
                      }
                      className="mt-2 inline-flex items-center gap-2 text-xs text-[#03800a] hover:underline"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Aperçu cover
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ordre</label>
                  <input
                    type="number"
                    min={0}
                    value={form.ordre}
                    onChange={(e) => setForm({ ...form, ordre: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mt-6">
                  <input
                    type="checkbox"
                    checked={form.actif}
                    onChange={(e) => setForm({ ...form, actif: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-[#03800a] focus:ring-[#03800a]"
                  />
                  Actif
                </label>
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
        title="Supprimer cette édition ?"
        message="Cette action est irréversible. L'édition sera définitivement supprimée."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      <ImagePreviewModal
        open={imageModal.open}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
        imageUrl={imageModal.url}
        title={imageModal.title}
      />
    </div>
  );
};

AdminJournal.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminJournal;
