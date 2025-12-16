import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type CategoryItem = {
  id: number;
  name: string;
  type: 'actualite' | 'evenement';
};

const AdminCategories: FrontendPage = () => {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'actualite',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/admin/api/categories');
        const json = await res.json();
        setItems(json.data || []);
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
      const res = await fetch('/admin/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
        credentials: 'same-origin',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur création catégorie');
      const json = await res.json();
      setItems((prev) => [json.data, ...prev]);
      setOpenForm(false);
      setForm({ name: '', type: 'actualite' });
    } catch (error) {
      console.error(error);
      alert("Impossible de créer la catégorie.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Catégories" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Classification</p>
          <h1 className="text-2xl font-bold text-gray-900">Catégories</h1>
          <p className="text-sm text-gray-600">
            Gérez les catégories pour les actualités et les événements.
          </p>
        </div>
        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Nouvelle catégorie
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : items.length ? (
                items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.type === 'actualite' ? 'Actualité' : 'Événement'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-6 text-center text-gray-500">
                    Aucune catégorie pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Nouvelle catégorie</p>
                <h2 className="text-lg font-semibold text-gray-900">Ajouter</h2>
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
                <label className="text-sm font-medium text-gray-700">Nom *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Ex: Institutionnel, Culture..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as CategoryItem['type'] })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  <option value="actualite">Actualité</option>
                  <option value="evenement">Événement</option>
                </select>
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
                  className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
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

AdminCategories.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminCategories;
