import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type MediaItem = {
  id: number;
  title?: string | null;
  collection?: string | null;
  file_type?: string | null;
  mime_type?: string | null;
  size?: number | null;
  url?: string;
};

const AdminMedia: FrontendPage = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/admin/api/media');
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

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Médias" />

      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">Fichiers</p>
        <h1 className="text-2xl font-bold text-gray-900">Médias & PDF</h1>
        <p className="text-sm text-gray-600">
          Liste des fichiers envoyés (PDF du journal, images des pages).
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Collection</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Taille</th>
                <th className="px-4 py-3">Lien</th>
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
                    <td className="px-4 py-3 font-medium text-gray-900">{item.title || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.collection || 'default'}</td>
                    <td className="px-4 py-3 text-gray-700">{item.file_type || item.mime_type || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.size ? `${(item.size / 1024).toFixed(1)} Ko` : '—'}
                    </td>
                    <td className="px-4 py-3 text-blue-600">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer" className="underline">
                          Ouvrir
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Aucun fichier pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

AdminMedia.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminMedia;
