import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/Admin/RichTextEditor';

type ActualiteItem = {
  id: number;
  titre: string;
  categorie?: string | null;
  category_id?: number | null;
  status?: string | null;
  published_at?: string | null;
};

type Category = {
  id: number;
  name: string;
  type: 'actualite' | 'evenement';
};

const AdminActualites: FrontendPage = () => {
  const [items, setItems] = useState<ActualiteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/admin/api/actualites');
        const json = await res.json();
        setItems(json.data || []);

        const resCat = await fetch('/admin/api/categories?type=actualite');
        const jsonCat = await resCat.json();
        setCategories(jsonCat.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val ?? ''));
      if (imageFile) fd.append('image', imageFile);

      const res = await fetch('/admin/api/actualites', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: fd,
      });
      if (!res.ok) throw new Error('Erreur de création');
      const json = await res.json();
      setItems((prev) => [json.data, ...prev]);
      setOpenForm(false);
      setForm({ titre: '', categorie: '', category_id: '', status: 'published', published_at: '', description: '', contenu: '' });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert("Impossible de créer l'actualité. Vérifie les champs obligatoires.");
    } finally {
      setSaving(false);
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

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Publié le</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : items.length ? (
                items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.titre}</td>
                    <td className="px-4 py-3 text-gray-700">{item.categorie || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.status || 'draft'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    Aucune actualité pour le moment.
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
                <p className="text-xs uppercase tracking-wide text-gray-500">Nouvelle actualité</p>
                <h2 className="text-lg font-semibold text-gray-900">Créer un article</h2>
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
    </div>
  );
};

AdminActualites.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminActualites;
