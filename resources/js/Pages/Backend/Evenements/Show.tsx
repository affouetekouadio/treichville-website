import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Image as ImageIcon, MapPin, Ticket } from 'lucide-react';

type EvenementShowProps = {
  evenement: {
    id: number;
    titre: string;
    slug?: string | null;
    description?: string | null;
    contenu?: string | null;
    categorie?: string | null;
    category?: { name: string } | null;
    status?: string | null;
    date_debut?: string | null;
    date_fin?: string | null;
    lieu?: string | null;
    gratuit?: boolean | null;
    image_url?: string | null;
  };
};

const AdminEvenementShow: FrontendPage<EvenementShowProps> = ({ evenement }) => {
  const statusLabel = evenement.status === 'published' ? 'Publié' : 'Brouillon';
  const statusClass =
    evenement.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  const detailContent =
    evenement.contenu && evenement.contenu.trim().length > 0
      ? evenement.contenu
      : evenement.description
      ? `<p>${evenement.description}</p>`
      : '<p>Aucun contenu disponible.</p>';
  const startDate = evenement.date_debut ? new Date(evenement.date_debut) : null;
  const endDate = evenement.date_fin ? new Date(evenement.date_fin) : null;

  return (
    <>
      <Head title={`Événement - ${evenement.titre}`} />
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Link href="/admin/evenements" className="inline-flex items-center gap-2 hover:text-gray-700">
                <ArrowLeft className="h-4 w-4" />
                Retour aux événements
              </Link>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                {statusLabel}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{evenement.titre}</h1>
            <p className="mt-2 text-sm text-gray-600">{evenement.description}</p>
          </div>
          <Link
            href={`/admin/evenements`}
            className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
          >
            Retour
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              {evenement.image_url ? (
                <img
                  src={evenement.image_url}
                  alt={evenement.titre}
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
                  <Calendar className="h-4 w-4 text-[#f8812f]" />
                  <span>
                    {startDate ? startDate.toLocaleDateString() : 'Date non renseignée'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#f8812f]" />
                  <span>
                    {startDate ? startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                    {endDate
                      ? ` - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                      : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#f8812f]" />
                  <span>{evenement.lieu || 'Non renseigné'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-[#f8812f]" />
                  <span>{evenement.gratuit ? 'Gratuit' : 'Payant'}</span>
                </div>
                {evenement.slug && (
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    Slug: {evenement.slug}
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

AdminEvenementShow.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminEvenementShow;
