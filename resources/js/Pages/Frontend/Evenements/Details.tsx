import React from "react";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, MapPin, Tag, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import type { Evenement } from "@/types/content";
import { evenementDetailUrl } from "@/utils";
import PageBanner from "@/components/Frontend/PageBanner";

type EvenementDetailsProps = {
  evenement: Evenement;
  autres_evenements?: Evenement[];
};

const EvenementDetails: FrontendPage<EvenementDetailsProps> = ({
  evenement,
  autres_evenements = [],
}) => {
  const startDate = new Date(evenement.date_debut);
  const endDate = evenement.date_fin ? new Date(evenement.date_fin) : null;
  const detailContent =
    evenement.contenu && evenement.contenu.trim().length > 0
      ? evenement.contenu
      : `<p>${evenement.description}</p>`;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageBanner title="Événements" variant="compact" />

      <section className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/evenements"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux événements
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge className="bg-[#f8812f] text-white border-0">{evenement.categorie}</Badge>
          {evenement.gratuit && (
            <Badge className="bg-green-500 text-white border-0">Gratuit</Badge>
          )}
        </div>
        <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">
          {evenement.titre}
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">{evenement.description}</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="space-y-6">
          <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              {evenement.image_url ? (
                <img
                  src={evenement.image_url}
                  alt={evenement.titre}
                  className="h-72 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center rounded-lg bg-white text-gray-400">
                  <Tag className="h-8 w-8" />
                </div>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <Calendar className="w-5 h-5 text-[#f8812f]" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-900">
                    {format(startDate, "d MMMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <Clock className="w-5 h-5 text-[#f8812f]" />
                <div>
                  <p className="text-sm text-gray-500">Horaire</p>
                  <p className="font-semibold text-gray-900">
                    {format(startDate, "HH:mm")}
                    {endDate ? ` - ${format(endDate, "HH:mm")}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <MapPin className="w-5 h-5 text-[#f8812f]" />
                <div>
                  <p className="text-sm text-gray-500">Lieu</p>
                  <p className="font-semibold text-gray-900">{evenement.lieu}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <Ticket className="w-5 h-5 text-[#f8812f]" />
                <div>
                  <p className="text-sm text-gray-500">Accès</p>
                  <p className="font-semibold text-gray-900">
                    {evenement.gratuit ? "Gratuit" : "Payant"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
            <div
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: detailContent }}
            />
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres événements</h3>
            {autres_evenements.length > 0 ? (
              <div className="space-y-4">
                {autres_evenements.map((evt) => (
                  <Link
                    key={evt.id}
                    href={evt.slug ? evenementDetailUrl(evt.slug) : "/evenements"}
                    className="flex gap-3 group"
                  >
                    <div className="h-16 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {evt.image_url ? (
                        <img
                          src={evt.image_url}
                          alt={evt.titre}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <Tag className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#f8812f] line-clamp-2">
                        {evt.titre}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(evt.date_debut), "d MMMM yyyy", { locale: fr })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aucun autre événement disponible.</p>
            )}
          </div>

          <div className="rounded-2xl bg-[#f1f7ff] border border-[#c8dcff] p-6">
            <h3 className="text-base font-semibold text-[#1e3a8a] mb-3">Infos utiles</h3>
            <div className="space-y-3 text-sm text-[#1e3a8a]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(startDate, "d MMMM yyyy", { locale: fr })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{evenement.lieu}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

EvenementDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default EvenementDetails;
