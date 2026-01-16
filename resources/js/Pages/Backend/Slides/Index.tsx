import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, X, Trash2, Edit, Image } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type SlideItem = {
  id: number;
  title: string | null;
  subtitle: string | null;
  highlight: string | null;
  description: string | null;
  image_path: string;
  image_url: string;
  cta_text: string | null;
  cta_link: string | null;
  ordre: number;
  actif: boolean;
};

const AdminSlides: FrontendPage = () => {
  const { addNotification } = useNotification();
  const [items, setItems] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [imageModal, setImageModal] = useState<{
    open: boolean;
    url: string;
    title: string;
  }>({
    open: false,
    url: '',
    title: '',
  });
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    highlight: '',
    description: '',
    cta_text: '',
    cta_link: '',
    ordre: '0',
    actif: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      const res = await fetch('/admin/api/slides');
      const json = await res.json();
      console.log('Slides loaded:', json.data);
      setItems(json.data || []);
    } catch (error) {
      console.error(error);
      addNotification('error', 'Impossible de charger les slides');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      subtitle: '',
      highlight: '',
      description: '',
      cta_text: '',
      cta_link: '',
      ordre: '0',
      actif: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleEdit = (item: SlideItem) => {
    setForm({
      title: item.title || '',
      subtitle: item.subtitle || '',
      highlight: item.highlight || '',
      description: item.description || '',
      cta_text: item.cta_text || '',
      cta_link: item.cta_link || '',
      ordre: String(item.ordre),
      actif: item.actif,
    });
    setImagePreview(item.image_url);
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

      if (imageFile) fd.append('image', imageFile);

      const url = editingId
        ? `/admin/api/slides/${editingId}`
        : '/admin/api/slides';

      const method = editingId ? 'POST' : 'POST';

      if (editingId) {
        fd.append('_method', 'PUT');
      }

      const res = await fetch(url, {
        method,
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
      addNotification('success', json.message || (editingId ? 'Slide modifié avec succès' : 'Slide créé avec succès'));

      await loadSlides();
      setOpenForm(false);
      resetForm();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder le slide');
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
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch(`/admin/api/slides/${deleteConfirm.id}`, {
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
      addNotification('success', json.message || 'Slide supprimé avec succès');

      await loadSlides();
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer le slide');
    } finally {
      setDeleting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Slides Carrousel" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Apparence</p>
          <h1 className="text-2xl font-bold text-gray-900">Slides du Carrousel</h1>
          <p className="text-sm text-gray-600">
            Gérer les slides affichés sur la page d'accueil.
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
          Nouveau slide
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Ordre</th>
                <th className="px-4 py-3">Actif</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : items.length ? (
                items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3">
                      {item.image_url ? (
                        <button
                          onClick={() =>
                            setImageModal({
                              open: true,
                              url: item.image_url,
                              title: item.title || 'Slide',
                            })
                          }
                          className="relative group cursor-pointer"
                          title="Cliquer pour agrandir"
                        >
                          <img
                            src={item.image_url}
                            alt={item.title || 'Slide'}
                            className="h-12 w-20 rounded object-cover bg-gray-100 transition-all group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2"
                            onError={(e) => {
                              console.error('Image failed to load:', item.image_url);
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="flex h-12 w-20 items-center justify-center rounded bg-red-50 text-xs text-red-600 p-1 text-center">Erreur</div>`;
                              }
                            }}
                          />
                          {/* Hover overlay */}
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
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{item.title || '—'}</div>
                      {item.subtitle && (
                        <div className="text-xs text-gray-500">{item.subtitle}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.ordre}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          item.actif
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
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
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Aucun slide pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {editingId ? 'Éditer le slide' : 'Nouveau slide'}
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Modifier un slide' : 'Créer un slide'}
                </h2>
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

            <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700">Titre</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Titre principal du slide"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Sous-titre</label>
                <input
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Sous-titre"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Texte en surbrillance (orange)</label>
                <input
                  value={form.highlight}
                  onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Texte mis en évidence"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Description du slide"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Texte du bouton</label>
                  <input
                    value={form.cta_text}
                    onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="Ex: Découvrir"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Lien du bouton</label>
                  <input
                    value={form.cta_link}
                    onChange={(e) => setForm({ ...form, cta_link: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="URL ou #section"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ordre d'affichage</label>
                  <input
                    type="number"
                    min="0"
                    value={form.ordre}
                    onChange={(e) => setForm({ ...form, ordre: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                  <p className="mt-1 text-xs text-gray-500">Plus petit = affiché en premier</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Statut</label>
                  <select
                    value={form.actif ? '1' : '0'}
                    onChange={(e) => setForm({ ...form, actif: e.target.value === '1' })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  >
                    <option value="1">Actif</option>
                    <option value="0">Inactif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Image {editingId ? '' : '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingId}
                  onChange={handleImageChange}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                />
                <p className="mt-1 text-xs text-gray-500">Formats image, max 4 Mo.</p>
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="h-40 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  onClick={() => {
                    setOpenForm(false);
                    resetForm();
                  }}
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
        title="Supprimer ce slide ?"
        message="Cette action est irréversible. Le slide sera définitivement supprimé."
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

AdminSlides.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminSlides;
