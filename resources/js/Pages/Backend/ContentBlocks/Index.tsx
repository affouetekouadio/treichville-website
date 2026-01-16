import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, Image, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type ContentBlockItem = {
  id: number;
  page: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url?: string | null;
  background_image_url?: string | null;
  cta_text: string | null;
  cta_link: string | null;
  ordre: number;
  actif: boolean;
};

const pageSuggestions = [
  'home',
  'message-maire',
  'conseil-municipal',
];

const sectionSuggestions = [
  'welcome',
  'stats',
  'intro',
];

const AdminContentBlocks: FrontendPage = () => {
  const { addNotification } = useNotification();
  const [items, setItems] = useState<ContentBlockItem[]>([]);
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
    page: '',
    section_key: '',
    title: '',
    content: '',
    cta_text: '',
    cta_link: '',
    ordre: '0',
    actif: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      const res = await fetch('/admin/api/content-blocks');
      const json = await res.json();
      setItems(json.data || []);
    } catch (error) {
      console.error(error);
      addNotification('error', 'Impossible de charger les blocs');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      page: '',
      section_key: '',
      title: '',
      content: '',
      cta_text: '',
      cta_link: '',
      ordre: '0',
      actif: true,
    });
    setImageFile(null);
    setBackgroundFile(null);
    setImagePreview(null);
    setBackgroundPreview(null);
    setEditingId(null);
  };

  const handleEdit = (item: ContentBlockItem) => {
    setForm({
      page: item.page,
      section_key: item.section_key,
      title: item.title || '',
      content: item.content || '',
      cta_text: item.cta_text || '',
      cta_link: item.cta_link || '',
      ordre: String(item.ordre ?? 0),
      actif: item.actif,
    });
    setImagePreview(item.image_url || null);
    setBackgroundPreview(item.background_image_url || null);
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
      if (backgroundFile) fd.append('background_image', backgroundFile);

      const url = editingId
        ? `/admin/api/content-blocks/${editingId}`
        : '/admin/api/content-blocks';

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
      addNotification('success', json.message || (editingId ? 'Bloc modifié' : 'Bloc créé'));

      await loadBlocks();
      setOpenForm(false);
      resetForm();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder le bloc');
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
      const res = await fetch(`/admin/api/content-blocks/${deleteConfirm.id}`, {
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
      addNotification('success', json.message || 'Bloc supprimé');

      await loadBlocks();
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer le bloc');
    } finally {
      setDeleting(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'background'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'image') {
        setImageFile(file);
        setImagePreview(reader.result as string);
      } else {
        setBackgroundFile(file);
        setBackgroundPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Blocs de contenu" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Apparence</p>
          <h1 className="text-2xl font-bold text-gray-900">Blocs de contenu</h1>
          <p className="text-sm text-gray-600">
            Gérer les images et contenus dynamiques par section.
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
          Nouveau bloc
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Page</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Ordre</th>
                <th className="px-4 py-3">Actif</th>
                <th className="px-4 py-3">Images</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : items.length ? (
                items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.page}</td>
                    <td className="px-4 py-3 text-gray-700">{item.section_key}</td>
                    <td className="px-4 py-3 text-gray-700">{item.title || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.ordre}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.actif ? 'Oui' : 'Non'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.image_url && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                            onClick={() =>
                              setImageModal({
                                open: true,
                                url: item.image_url || '',
                                title: `${item.page} / ${item.section_key} (image)`,
                              })
                            }
                          >
                            <Image className="h-3.5 w-3.5" />
                            Image
                          </button>
                        )}
                        {item.background_image_url && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                            onClick={() =>
                              setImageModal({
                                open: true,
                                url: item.background_image_url || '',
                                title: `${item.page} / ${item.section_key} (fond)`,
                              })
                            }
                          >
                            <Image className="h-3.5 w-3.5" />
                            Fond
                          </button>
                        )}
                        {!item.image_url && !item.background_image_url && '—'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Éditer
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Aucun bloc pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Bloc de contenu</p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Éditer le bloc' : 'Nouveau bloc'}
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
                  <label className="text-sm font-medium text-gray-700">Page *</label>
                  <input
                    required
                    value={form.page}
                    onChange={(e) => setForm({ ...form, page: e.target.value })}
                    list="page-suggestions"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="home, message-maire..."
                  />
                  <datalist id="page-suggestions">
                    {pageSuggestions.map((page) => (
                      <option key={page} value={page} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Section *</label>
                  <input
                    required
                    value={form.section_key}
                    onChange={(e) => setForm({ ...form, section_key: e.target.value })}
                    list="section-suggestions"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="welcome, stats, intro..."
                  />
                  <datalist id="section-suggestions">
                    {sectionSuggestions.map((section) => (
                      <option key={section} value={section} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Titre</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="Titre (optionnel)"
                  />
                </div>
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
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Contenu</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  placeholder="Texte ou description"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">CTA (texte)</label>
                  <input
                    value={form.cta_text}
                    onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="Ex: Découvrir"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">CTA (lien)</label>
                  <input
                    value={form.cta_link}
                    onChange={(e) => setForm({ ...form, cta_link: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                    placeholder="/services ou #services"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Image principale</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'image')}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() =>
                        setImageModal({
                          open: true,
                          url: imagePreview,
                          title: 'Apercu image',
                        })
                      }
                      className="mt-2 inline-flex items-center gap-2 text-xs text-[#03800a] hover:underline"
                    >
                      <Image className="h-4 w-4" />
                      Apercu image
                    </button>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Image de fond</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'background')}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-[#03800a]/20"
                  />
                  {backgroundPreview && (
                    <button
                      type="button"
                      onClick={() =>
                        setImageModal({
                          open: true,
                          url: backgroundPreview,
                          title: 'Apercu fond',
                        })
                      }
                      className="mt-2 inline-flex items-center gap-2 text-xs text-[#03800a] hover:underline"
                    >
                      <Image className="h-4 w-4" />
                      Apercu fond
                    </button>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.actif}
                  onChange={(e) => setForm({ ...form, actif: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-[#03800a] focus:ring-[#03800a]"
                />
                Actif
              </label>

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
        title="Supprimer ce bloc ?"
        message="Cette action est irreversible. Le bloc sera definitivement supprime."
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

AdminContentBlocks.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminContentBlocks;
