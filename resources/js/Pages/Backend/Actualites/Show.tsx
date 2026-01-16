import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Image as ImageIcon, Tag } from 'lucide-react';

type ActualiteShowProps = {
  actualite: {
    id: number;
    titre: string;
    slug?: string | null;
    description?: string | null;
    contenu?: string | null;
    categorie?: string | null;
    category?: { name: string } | null;
    status?: string | null;
    published_at?: string | null;
    created_at?: string | null;
    image_url?: string | null;
  };
};

const AdminActualiteShow: FrontendPage<ActualiteShowProps> = ({ actualite }) => {
  const statusLabel = actualite.status === 'published' ? 'Publié' : 'Brouillon';
  const statusClass =
    actualite.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  const detailContent =
    actualite.contenu && actualite.contenu.trim().length > 0
      ? actualite.contenu
      : actualite.description
      ? `<p>${actualite.description}</p>`
      : '<p>Aucun contenu disponible.</p>';

  return (
    <>
      <Head title={`Actualité - ${actualite.titre}`} />
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Link href="/admin/actualites" className="inline-flex items-center gap-2 hover:text-gray-700">
                <ArrowLeft className="h-4 w-4" />
                Retour aux actualités
              </Link>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                {statusLabel}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{actualite.titre}</h1>
            <p className="mt-2 text-sm text-gray-600">{actualite.description}</p>
          </div>
          <Link
            href={`/admin/actualites`}
            className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
          >
            Retour
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              {actualite.image_url ? (
                <img
                  src={actualite.image_url}
                  alt={actualite.titre}
                  className="h-64 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg bg-white text-gray-400">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}
            </div>

            <div
              className="prose max-w-none mt-6"
              dangerouslySetInnerHTML={{ __html: detailContent }}
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Informations
              </h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#f8812f]" />
                  <span>{actualite.category?.name || actualite.categorie || 'Non renseignée'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#f8812f]" />
                  <span>
                    {actualite.published_at
                      ? new Date(actualite.published_at).toLocaleDateString()
                      : 'Non publiée'}
                  </span>
                </div>
                {actualite.slug && (
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    Slug: {actualite.slug}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

AdminActualiteShow.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminActualiteShow;
