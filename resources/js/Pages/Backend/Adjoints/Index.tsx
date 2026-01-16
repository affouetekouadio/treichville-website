import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { useState, useEffect, FormEvent, useRef } from 'react';
import { Users, Plus, Edit, Trash2, GripVertical, Eye, X, Upload } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';

interface AdjointItem {
  id: number;
  nom: string;
  role: string;
  photo: string | null;
  photo_url: string | null;
  focus: string | null;
  icon: string | null;
  ordre: number;
  actif: boolean;
  created_at: string;
}

const iconsList = [
  { value: 'Users', label: 'Utilisateurs' },
  { value: 'Landmark', label: 'Monument' },
  { value: 'MapPin', label: 'Carte' },
  { value: 'Award', label: 'Récompense' },
  { value: 'Heart', label: 'Cœur' },
  { value: 'Briefcase', label: 'Valise' },
  { value: 'Target', label: 'Cible' },
  { value: 'FileText', label: 'Document' },
];

const AdjointsIndex: FrontendPage = () => {
  const { addNotification } = useNotification();
  const [adjoints, setAdjoints] = useState<AdjointItem[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState({
    nom: '',
    role: '',
    focus: '',
    icon: 'Users',
    actif: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAdjoints();
  }, []);

  const fetchAdjoints = async () => {
    try {
      const response = await fetch('/admin/api/adjoints');
      const data = await response.json();
      setAdjoints(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des adjoints:', error);
      addNotification('error', 'Erreur lors du chargement des adjoints');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      nom: '',
      role: '',
      focus: '',
      icon: 'Users',
      actif: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setEditingId(null);
  };

  const handleEdit = (adjoint: AdjointItem) => {
    setForm({
      nom: adjoint.nom,
      role: adjoint.role,
      focus: adjoint.focus || '',
      icon: adjoint.icon || 'Users',
      actif: adjoint.actif,
    });
    // Reset the file input state so we only upload when a new file is chosen.
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImagePreview(adjoint.photo_url);
    setEditingId(adjoint.id);
    setOpenForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormErrors({});

    try {
      const formData = new FormData();
      formData.append('nom', form.nom);
      formData.append('role', form.role);
      formData.append('focus', form.focus || '');
      formData.append('icon', form.icon);
      formData.append('actif', form.actif ? '1' : '0');

      if (imageFile) {
        formData.append('photo', imageFile);
      }

      if (editingId) {
        formData.append('_method', 'PUT');
      }

      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const url = editingId ? `/admin/api/adjoints/${editingId}` : '/admin/api/adjoints';

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
        if (errorData?.errors) {
          setFormErrors(errorData.errors);
        }
        throw new Error(errorData.message || 'Erreur de sauvegarde');
      }

      const data = await response.json();
      addNotification('success', data.message || (editingId ? 'Adjoint modifié' : 'Adjoint créé'));

      setOpenForm(false);
      resetForm();
      fetchAdjoints();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder l\'adjoint');
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
      const response = await fetch(`/admin/api/adjoints/${deleteConfirm.id}`, {
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
      addNotification('success', data.message || 'Adjoint supprimé');

      setDeleteConfirm({ open: false, id: null });
      fetchAdjoints();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer l\'adjoint');
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

    const newAdjoints = [...adjoints];
    const dragIndex = newAdjoints.findIndex((a) => a.id === draggingId);
    const dropIndex = newAdjoints.findIndex((a) => a.id === targetId);

    const [removed] = newAdjoints.splice(dragIndex, 1);
    newAdjoints.splice(dropIndex, 0, removed);

    // Mettre à jour les ordres
    const updatedAdjoints = newAdjoints.map((adjoint, index) => ({
      ...adjoint,
      ordre: index + 1,
    }));

    setAdjoints(updatedAdjoints);
    setDraggingId(null);

    // Envoyer au backend
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const orders = updatedAdjoints.map((a) => ({ id: a.id, ordre: a.ordre }));

      const response = await fetch('/admin/api/adjoints/update-order', {
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
      fetchAdjoints(); // Recharger en cas d'erreur
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <Head title="Adjoints au maire" />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Chargement des adjoints...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4">
        <Head title="Adjoints au maire" />
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Users className="h-5 w-5 text-[#f8812f]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Adjoints au maire</h1>
              <p className="text-sm text-gray-500">Gestion des adjoints au maire (ordre modifiable par glisser-déposer)</p>
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
            Nouvel adjoint
          </button>
        </div>

        {/* Liste des adjoints */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {adjoints.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto h-12 w-12 text-[#03800a]" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Aucun adjoint</h3>
              <p className="mt-2 text-sm text-gray-500">Commencez par ajouter un adjoint au maire</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {adjoints.map((adjoint) => (
                <div
                  key={adjoint.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, adjoint.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, adjoint.id)}
                  className={`flex items-center gap-4 p-4 transition-colors ${
                    draggingId === adjoint.id ? 'opacity-50' : 'hover:bg-gray-50'
                  } ${!adjoint.actif ? 'bg-gray-50' : ''}`}
                >
                  {/* Drag handle */}
                  <div className="cursor-move text-gray-400 hover:text-[#03800a]">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {/* Photo */}
                  <div className="flex-shrink-0">
                    {adjoint.photo_url ? (
                      <button
                        onClick={() =>
                          setImageModal({
                            open: true,
                            url: adjoint.photo_url!,
                            title: adjoint.nom,
                          })
                        }
                        className="relative group"
                      >
                        <img
                          src={adjoint.photo_url}
                          alt={adjoint.nom}
                          className="h-16 w-16 rounded-lg object-cover ring-2 ring-gray-200 group-hover:ring-[#f8812f] transition-all"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                      </button>
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Users className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">{adjoint.nom}</h3>
                      {!adjoint.actif && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                          Inactif
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{adjoint.role}</p>
                    {adjoint.focus && (
                      <p className="text-xs text-gray-500 mt-1">{adjoint.focus}</p>
                    )}
                  </div>

                  {/* Ordre */}
                  <div className="text-center">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-[#03800a]">
                      {adjoint.ordre}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(adjoint)}
                      className="rounded p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Éditer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(adjoint.id)}
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
      </div>

      {/* Modal formulaire */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {editingId ? 'Modifier' : 'Nouvel'} adjoint
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Modifier l\'adjoint' : 'Ajouter un adjoint'}
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
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Ex: Jean Dupont"
                />
                {formErrors.nom?.[0] && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.nom[0]}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Rôle *</label>
                  <input
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Ex: 4ème adjoint"
                />
                {formErrors.role?.[0] && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.role[0]}</p>
                )}
              </div>
            </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Domaine d'action (optionnel)</label>
                <input
                  value={form.focus}
                  onChange={(e) => setForm({ ...form, focus: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Ex: Vie citoyenne & proximité"
                />
                <p className="mt-1 text-xs text-gray-500">Peut être laissé vide</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Icône</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  {iconsList.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Photo</label>
                {imagePreview && (
                  <div className="mt-2 mb-3">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="h-32 w-32 rounded-lg object-cover border-2 border-orange-200"
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
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">Format image, max 4 Mo</p>
                {formErrors.photo?.[0] && (
                  <p className="mt-2 text-xs text-red-600">{formErrors.photo[0]}</p>
                )}
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
        title="Supprimer cet adjoint ?"
        message="Cette action est irréversible. L'adjoint sera définitivement supprimé."
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

AdjointsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdjointsIndex;
