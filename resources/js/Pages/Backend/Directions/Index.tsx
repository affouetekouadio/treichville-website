import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useListingSearch } from '@/hooks/use-listing-search';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import RichTextEditor from '@/components/Admin/RichTextEditor';
import { Edit, Plus, Trash2, X } from 'lucide-react';

type DirectionItem = {
  id: number;
  nom: string;
  slug?: string | null;
  description?: string | null;
  short_description?: string | null;
  contenu?: string | null;
  icon?: string | null;
  responsable?: string | null;
  adresse?: string | null;
  ordre?: number | null;
  actif?: boolean;
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

type DirectionPageProps = {
  directions?: DirectionItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const iconOptions = [
  { value: '', label: 'Aucune' },
  { value: 'FileText', label: 'Document' },
  { value: 'Users', label: 'Utilisateurs' },
  { value: 'Building', label: 'Bâtiment' },
  { value: 'Home', label: 'Maison' },
  { value: 'Sprout', label: 'Nature' },
  { value: 'Heart', label: 'Social' },
  { value: 'Briefcase', label: 'Portefeuille' },
  { value: 'Coins', label: 'Finances' },
  { value: 'Calendar', label: 'Agenda' },
  { value: 'MapPin', label: 'Localisation' },
  { value: 'PhoneCall', label: 'Contacts' },
];

const AdminDirections: FrontendPage<DirectionPageProps> = ({ directions = [], listing }) => {
  const { addNotification } = useNotification();
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'ordre';
  const sortDirection = listing?.filters.direction ?? 'asc';

  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: directions.length,
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
  const [form, setForm] = useState({
    nom: '',
    short_description: '',
    contenu: '',
    icon: '',
    responsable: '',
    adresse: '',
    ordre: '0',
    actif: true,
  });

  const resetForm = () => {
    setForm({
      nom: '',
      short_description: '',
      contenu: '',
      icon: '',
      responsable: '',
      adresse: '',
      ordre: '0',
      actif: true,
    });
    setEditingId(null);
  };

  const handleEdit = (item: DirectionItem) => {
    setForm({
      nom: item.nom ?? '',
      short_description: item.short_description ?? item.description ?? '',
      contenu: item.contenu ?? '',
      icon: item.icon ?? '',
      responsable: item.responsable ?? '',
      adresse: item.adresse ?? '',
      ordre: String(item.ordre ?? 0),
      actif: item.actif ?? true,
    });
    setEditingId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const payload = {
        nom: form.nom,
        description: form.short_description,
        short_description: form.short_description,
        contenu: form.contenu,
        icon: form.icon || null,
        responsable: form.responsable || null,
        adresse: form.adresse || null,
        ordre: Number(form.ordre || 0),
        actif: form.actif ? 1 : 0,
      };

      const url = editingId ? `/admin/api/directions/${editingId}` : '/admin/api/directions';

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de sauvegarde');
      }

      const json = await response.json();
      addNotification('success', json.message || (editingId ? 'Direction mise à jour' : 'Direction créée'));

      setOpenForm(false);
      resetForm();
      listingVisit(baseUrl, { ...baseParams, page: 1 });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder la direction');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch(`/admin/api/directions/${deleteConfirm.id}`, {
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
      addNotification('success', json.message || 'Direction supprimée');
      setDeleteConfirm({ open: false, id: null });
      listingVisit(baseUrl, baseParams);
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer la direction');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Directions" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Organisation</p>
          <h1 className="text-2xl font-bold text-gray-900">Directions</h1>
          <p className="text-sm text-gray-600">
            Gérez les directions et leurs descriptions (courte + détaillée).
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setOpenForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#03800a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Nouvelle direction
        </button>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'ordre', label: 'Ordre' },
          { value: 'nom', label: 'Nom' },
          { value: 'created_at', label: 'Créé le' },
        ]}
        onSearchChange={setSearch}
        onSearchSubmit={() => listingVisit(baseUrl, { ...baseParams, page: 1 })}
        onPerPageChange={(value) => listingVisit(baseUrl, { ...baseParams, per_page: value, page: 1 })}
        onExport={(format) => listingExport(baseUrl, baseParams, format)}
        onSortChange={(value, direction) => listingVisit(baseUrl, { ...baseParams, sort: value, direction })}
      />

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Responsable</th>
                <th className="px-4 py-3">Ordre</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {directions.length ? (
                directions.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.nom}</td>
                    <td className="px-4 py-3 text-gray-700">{item.responsable ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.ordre ?? 0}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          item.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded p-2 text-blue-600 hover:bg-blue-50"
                          title="Éditer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ open: true, id: item.id })}
                          className="rounded p-2 text-red-600 hover:bg-red-50"
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
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Aucune direction pour le moment.
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
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {editingId ? 'Modifier' : 'Nouvelle'} direction
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Modifier la direction' : 'Ajouter une direction'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom *</label>
                  <input
                    required
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Ex: Direction des Affaires Administratives"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Responsable</label>
                  <input
                    value={form.responsable}
                    onChange={(e) => setForm({ ...form, responsable: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Nom et prénom"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description courte</label>
                <input
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Résumé court pour les cartes"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description détaillée</label>
                <RichTextEditor value={form.contenu} onChange={(val) => setForm({ ...form, contenu: val })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Icône</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Adresse</label>
                  <input
                    value={form.adresse}
                    onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Adresse ou localisation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ordre</label>
                  <input
                    type="number"
                    min="0"
                    value={form.ordre}
                    onChange={(e) => setForm({ ...form, ordre: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="actif"
                    checked={form.actif}
                    onChange={(e) => setForm({ ...form, actif: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-[#03800a] focus:ring-[#03800a]"
                  />
                  <label htmlFor="actif" className="text-sm font-medium text-gray-700">
                    Actif (visible sur le site)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    resetForm();
                  }}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#03800a] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:opacity-60"
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
        title="Supprimer cette direction ?"
        message="Cette action est irréversible. La direction sera définitivement supprimée."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};

AdminDirections.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminDirections;
