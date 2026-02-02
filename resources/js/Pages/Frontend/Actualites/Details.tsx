import React from "react";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import type { Actualite } from "@/types/content";
import { actualiteDetailUrl } from "@/utils";
import PageBanner from "@/components/Frontend/PageBanner";

type ActualiteDetailsProps = {
  actualite: Actualite;
  autres_actualites?: Actualite[];
};

const ActualiteDetails: FrontendPage<ActualiteDetailsProps> = ({
  actualite,
  autres_actualites = [],
}) => {
  const detailContent =
    actualite.contenu && actualite.contenu.trim().length > 0
      ? actualite.contenu
      : `<p>${actualite.description}</p>`;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageBanner title="Actualités" variant="compact" />

      <section className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux actualités
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge className="bg-[#f8812f] text-white border-0">
            {actualite.categorie}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <time>{format(new Date(actualite.date_publication), "d MMMM yyyy", { locale: fr })}</time>
          </div>
        </div>
        <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">
          {actualite.titre}
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">{actualite.description}</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            {actualite.image_url ? (
              <img
                src={actualite.image_url}
                alt={actualite.titre}
                className="h-72 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center rounded-lg bg-white text-gray-400">
                <Tag className="h-8 w-8" />
              </div>
            )}
          </div>
          <div
            className="rich-content mt-6"
            dangerouslySetInnerHTML={{ __html: detailContent }}
          />
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres actualités</h3>
            {autres_actualites.length > 0 ? (
              <div className="space-y-4">
                {autres_actualites.map((actu) => (
                  <Link
                    key={actu.id}
                    href={actu.slug ? actualiteDetailUrl(actu.slug) : "/actualites"}
                    className="flex gap-3 group"
                  >
                    <div className="h-16 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {actu.image_url ? (
                        <img
                          src={actu.image_url}
                          alt={actu.titre}
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
                        {actu.titre}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(actu.date_publication), "d MMMM yyyy", { locale: fr })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aucune autre actualité disponible.</p>
            )}
          </div>

          <div className="rounded-2xl bg-[#fff7ef] border border-[#f8d8b6] p-6">
            <h3 className="text-base font-semibold text-[#8a4b1f] mb-3">En bref</h3>
            <div className="space-y-3 text-sm text-[#8a4b1f]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(actualite.date_publication), "d MMMM yyyy", { locale: fr })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{actualite.categorie}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

ActualiteDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ActualiteDetails;
