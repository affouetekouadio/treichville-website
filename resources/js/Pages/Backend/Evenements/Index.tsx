import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/Admin/RichTextEditor';

type EvenementItem = {
  id: number;
  titre: string;
  categorie?: string | null;
  category_id?: number | null;
  status?: string | null;
  date_debut?: string | null;
  lieu?: string | null;
};

type Category = {
  id: number;
  name: string;
  type: 'actualite' | 'evenement';
};

const AdminEvenements: FrontendPage = () => {
  const [items, setItems] = useState<EvenementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    titre: '',
    categorie: '',
    category_id: '',
    status: 'published',
    date_debut: '',
    lieu: '',
    description: '',
    contenu: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/admin/api/evenements');
        const json = await res.json();
        setItems(json.data || []);

        const resCat = await fetch('/admin/api/categories?type=evenement');
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

      const res = await fetch('/admin/api/evenements', {
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
      setForm({ titre: '', categorie: '', category_id: '', status: 'published', date_debut: '', lieu: '', description: '', contenu: '' });
      setImageFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error(error);
      alert("Impossible de créer l'événement. Vérifie les champs obligatoires.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Événements" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Contenu</p>
          <h1 className="text-2xl font-bold text-gray-900">Événements</h1>
          <p className="text-sm text-gray-600">
            Liste des événements à jour. Ajouter/éditer à connecter ensuite.
          </p>
        </div>
        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#f8812f] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          Nouvel événement
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Lieu</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Statut</th>
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
                    <td className="px-4 py-3 font-medium text-gray-900">{item.titre}</td>
                    <td className="px-4 py-3 text-gray-700">{item.categorie || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.lieu || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.date_debut ? new Date(item.date_debut).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.status || 'draft'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Aucun événement pour le moment.
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
                <p className="text-xs uppercase tracking-wide text-gray-500">Nouvel événement</p>
                <h2 className="text-lg font-semibold text-gray-900">Créer un événement</h2>
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
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                  placeholder="Titre de l’événement"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Catégorie</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value, categorie: '' })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                  >
                    <option value="">Sélectionner</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Catégories limitées au type Événement.</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date de début</label>
                  <input
                    type="datetime-local"
                    value={form.date_debut}
                    onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Lieu</label>
                  <input
                    value={form.lieu}
                    onChange={(e) => setForm({ ...form, lieu: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                    placeholder="Ex: Esplanade de la mairie"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Statut</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                  >
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description courte</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                  placeholder="Résumé affiché sur la carte"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contenu détaillé (CKEditor)</label>
                <RichTextEditor
                  value={form.contenu}
                  onChange={(val) => setForm({ ...form, contenu: val })}
                  placeholder="Programme, intervenants, détails pratiques..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Image principale</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setImageFile(file);
                    setPreviewUrl(file ? URL.createObjectURL(file) : '');
                  }}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
                />
                {previewUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <img src={previewUrl} alt="Prévisualisation" className="h-40 w-full object-cover" />
                  </div>
                )}
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
                  className="rounded-lg bg-[#f8812f] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
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

AdminEvenements.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminEvenements;
