import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { useMemo, useState, useEffect, FormEvent } from 'react';
import { MapPin, Plus, Edit, Trash2, GripVertical, Eye, X, Upload, Trees, Waves } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import ListingToolbar from '@/components/listing/ListingToolbar';
import ListingPagination from '@/components/listing/ListingPagination';
import { listingExport, listingVisit } from '@/lib/listing';
import { useListingSearch } from '@/hooks/use-listing-search';

interface LieuItem {
  id: number;
  type: string;
  nom: string;
  description: string;
  image: string | null;
  image_url: string | null;
  horaires: string | null;
  acces: string;
  equipements: string[] | null;
  ordre: number;
  actif: boolean;
  created_at: string;
}

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

type LieuxPageProps = {
  lieux?: LieuItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const LieuxIndex: FrontendPage<LieuxPageProps> = ({ lieux = [], listing }) => {
  const { addNotification } = useNotification();
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [lieuxState, setLieuxState] = useState<LieuItem[]>(lieux);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [imageModal, setImageModal] = useState({
    open: false,
    url: '',
    title: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'Parc',
    nom: '',
    description: '',
    horaires: '',
    acces: 'Gratuit',
    equipements: [''],
    actif: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'ordre';
  const sortDirection = listing?.filters.direction ?? 'asc';

  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: lieux.length,
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

  useEffect(() => {
    setLieuxState(lieux);
  }, [lieux]);

  const resetForm = () => {
    setForm({
      type: 'Parc',
      nom: '',
      description: '',
      horaires: '',
      acces: 'Gratuit',
      equipements: [''],
      actif: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleEdit = (lieu: LieuItem) => {
    setForm({
      type: lieu.type,
      nom: lieu.nom,
      description: lieu.description,
      horaires: lieu.horaires || '',
      acces: lieu.acces,
      equipements: lieu.equipements && lieu.equipements.length > 0 ? lieu.equipements : [''],
      actif: lieu.actif,
    });
    setImageFile(null);
    setImagePreview(lieu.image_url);
    setEditingId(lieu.id);
    setOpenForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('nom', form.nom);
      formData.append('description', form.description);
      formData.append('horaires', form.horaires || '');
      formData.append('acces', form.acces);
      formData.append('actif', form.actif ? '1' : '0');

      // Ajouter les équipements
      const equipementsFiltered = form.equipements.filter(eq => eq.trim() !== '');
      equipementsFiltered.forEach((eq, index) => {
        formData.append(`equipements[${index}]`, eq);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingId) {
        formData.append('_method', 'PUT');
      }

      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const url = editingId ? `/admin/api/lieux/${editingId}` : '/admin/api/lieux';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de sauvegarde');
      }

      const data = await response.json();
      addNotification('success', data.message || (editingId ? 'Lieu modifié' : 'Lieu créé'));
      setOpenForm(false);
      resetForm();
      listingVisit(baseUrl, { ...baseParams, page: 1 });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder le lieu');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const response = await fetch(`/admin/api/lieux/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de suppression');
      }

      const data = await response.json();
      addNotification('success', data.message || 'Lieu supprimé');
      setDeleteConfirm({ open: false, id: null });
      listingVisit(baseUrl, baseParams);
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer le lieu');
    } finally {
      setDeleting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addEquipement = () => {
    setForm({ ...form, equipements: [...form.equipements, ''] });
  };

  const removeEquipement = (index: number) => {
    const newEquipements = form.equipements.filter((_, i) => i !== index);
    setForm({ ...form, equipements: newEquipements.length > 0 ? newEquipements : [''] });
  };

  const updateEquipement = (index: number, value: string) => {
    const newEquipements = [...form.equipements];
    newEquipements[index] = value;
    setForm({ ...form, equipements: newEquipements });
  };

  // Drag & Drop pour l'ordre
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetId: number) => {
    e.preventDefault();

    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      return;
    }

    const newLieux = [...lieuxState];
    const dragIndex = newLieux.findIndex((l) => l.id === draggingId);
    const dropIndex = newLieux.findIndex((l) => l.id === targetId);

    const [removed] = newLieux.splice(dragIndex, 1);
    newLieux.splice(dropIndex, 0, removed);

    // Mettre à jour les ordres
    const orderSlots = newLieux.map((lieu) => lieu.ordre).sort((a, b) => a - b);
    const updatedLieux = newLieux.map((lieu, index) => ({
      ...lieu,
      ordre: orderSlots[index] ?? lieu.ordre,
    }));

    setLieuxState(updatedLieux);
    setDraggingId(null);

    // Envoyer au backend
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const orders = updatedLieux.map((l) => ({ id: l.id, ordre: l.ordre }));

      const response = await fetch('/admin/api/lieux/update-order', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'ordre');
      }

      addNotification('success', 'Ordre mis à jour');
    } catch (error) {
      console.error(error);
      addNotification('error', 'Erreur lors de la mise à jour de l\'ordre');
      listingVisit(baseUrl, baseParams);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4">
        <Head title="Endroits à découvrir" />
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Endroits à découvrir</h1>
              <p className="text-sm text-gray-500">Gestion des parcs et piscines (ordre modifiable par glisser-déposer)</p>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setOpenForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#f8812f] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nouveau lieu
          </button>
        </div>

        <ListingToolbar
          search={search}
          perPage={pagination.per_page}
          sort={{ value: sortValue, direction: sortDirection }}
          sortOptions={[
            { value: 'ordre', label: 'Ordre' },
            { value: 'nom', label: 'Nom' },
            { value: 'type', label: 'Type' },
            { value: 'created_at', label: 'Créé le' },
          ]}
          onSearchChange={setSearch}
          onSearchSubmit={() => listingVisit(baseUrl, { ...baseParams, page: 1 })}
          onPerPageChange={(value) => listingVisit(baseUrl, { ...baseParams, per_page: value, page: 1 })}
          onExport={(format) => listingExport(baseUrl, baseParams, format)}
          onSortChange={(value, direction) => listingVisit(baseUrl, { ...baseParams, sort: value, direction })}
        />

        {/* Liste des lieux */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {lieuxState.length === 0 ? (
            <div className="p-12 text-center">
              <MapPin className="mx-auto h-12 w-12 text-[#03800a]" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Aucun lieu</h3>
              <p className="mt-2 text-sm text-gray-500">Commencez par ajouter un parc ou une piscine</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {lieuxState.map((lieu) => (
                <div
                  key={lieu.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lieu.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, lieu.id)}
                  className={`flex items-center gap-4 p-4 transition-colors ${
                    draggingId === lieu.id ? 'opacity-50' : 'hover:bg-gray-50'
                  } ${!lieu.actif ? 'bg-gray-50' : ''}`}
                >
                  {/* Drag handle */}
                  <div className="cursor-move text-gray-400 hover:text-[#03800a]">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0">
                    {lieu.image_url ? (
                      <button
                        onClick={() =>
                          setImageModal({
                            open: true,
                            url: lieu.image_url!,
                            title: lieu.nom,
                          })
                        }
                        className="relative group"
                      >
                        <img
                          src={lieu.image_url}
                          alt={lieu.nom}
                          className="h-16 w-16 rounded-lg object-cover ring-2 ring-gray-200 group-hover:ring-[#f8812f] transition-all"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                      </button>
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Type badge */}
                  <div className="flex-shrink-0">
                    {lieu.type === 'Parc' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        <Trees className="h-3 w-3" />
                        Parc
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        <Waves className="h-3 w-3" />
                        Piscine
                      </span>
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">{lieu.nom}</h3>
                      {!lieu.actif && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                          Inactif
                        </span>
                      )}
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        lieu.acces === 'Gratuit' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {lieu.acces}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">{lieu.description}</p>
                  </div>

                  {/* Ordre */}
                  <div className="text-center">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {lieu.ordre}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(lieu)}
                      className="rounded p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Éditer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(lieu.id)}
                      className="rounded p-2 text-red-600 hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ListingPagination
          page={pagination.page}
          lastPage={pagination.last_page}
          total={pagination.total}
          onPageChange={(page) => listingVisit(baseUrl, { ...baseParams, page })}
        />
      </div>

      {/* Modal formulaire */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 overflow-y-auto py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {editingId ? 'Modifier' : 'Nouveau'} lieu
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Modifier le lieu' : 'Ajouter un lieu'}
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
                  <label className="text-sm font-medium text-gray-700">Type *</label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="Parc">Parc</option>
                    <option value="Piscine">Piscine</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Accès *</label>
                  <select
                    required
                    value={form.acces}
                    onChange={(e) => setForm({ ...form, acces: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="Gratuit">Gratuit</option>
                    <option value="Payant">Payant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Nom *</label>
                <input
                  required
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Ex: Jardin Public de Treichville"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Décrivez le lieu..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Horaires (optionnel)</label>
                <input
                  value={form.horaires}
                  onChange={(e) => setForm({ ...form, horaires: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Ex: 6h00 - 18h00"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Équipements (optionnel)</label>
                {form.equipements.map((eq, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      value={eq}
                      onChange={(e) => updateEquipement(index, e.target.value)}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="Ex: Aires de jeux"
                    />
                    {form.equipements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEquipement(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEquipement}
                  className="mt-1 text-sm text-[#03800a] hover:text-green-700 font-medium"
                >
                  + Ajouter un équipement
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Photo</label>
                {imagePreview && (
                  <div className="mt-2 mb-3">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="h-32 w-full rounded-lg object-cover border-2 border-orange-200"
                    />
                  </div>
                )}
                <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 hover:border-[#f8812f] hover:bg-orange-50 transition-colors">
                  <Upload className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Choisir une photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">Format image, max 10 Mo</p>
              </div>

              <div className="flex items-center gap-3">
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

      {/* Confirmation de suppression */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer ce lieu ?"
        message="Cette action est irréversible. Le lieu sera définitivement supprimé."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Modal aperçu photo */}
      <ImagePreviewModal
        open={imageModal.open}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
        imageUrl={imageModal.url}
        title={imageModal.title}
      />
    </>
  );
};

LieuxIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

export default LieuxIndex;
