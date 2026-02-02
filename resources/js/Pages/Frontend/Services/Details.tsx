import React from "react";
import { Link } from "@inertiajs/react";
import {
  FileText,
  Users,
  Building,
  Home,
  Sprout,
  Heart,
  Briefcase,
  Coins,
  MapPin,
  PhoneCall,
  Mail,
  ArrowLeft,
} from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import type { Service as DirectionRecord } from "@/types/content";
import PageBanner from "@/components/Frontend/PageBanner";
import { serviceDetailUrl } from "@/utils";

const iconMap = {
  FileText,
  Users,
  Building,
  Home,
  Sprout,
  Heart,
  Briefcase,
  Coins,
  MapPin,
  PhoneCall,
};

type DirectionDetailsProps = {
  direction: DirectionRecord;
  autres_directions?: Array<Pick<DirectionRecord, "id" | "nom" | "slug" | "short_description" | "icon">>;
};

const contactIconMap = {
  email: Mail,
  telephone: PhoneCall,
  fax: PhoneCall,
  whatsapp: PhoneCall,
};

const ServicesDetails: FrontendPage<DirectionDetailsProps> = ({
  direction,
  autres_directions = [],
}) => {
  const detailContent =
    direction.contenu && direction.contenu.trim().length > 0
      ? direction.contenu
      : `<p>${direction.short_description ?? direction.description ?? ""}</p>`;

  const iconKey = ((direction.icone ?? direction.icon) as keyof typeof iconMap) ?? "FileText";
  const Icon = iconMap[iconKey] || FileText;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageBanner title={direction.nom} variant="compact" />

      <section className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux directions
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
            <Icon className="h-4 w-4" />
            Direction
          </span>
          {direction.responsable && (
            <span className="text-sm text-gray-500">
              Responsable : <strong className="text-gray-800">{direction.responsable}</strong>
            </span>
          )}
        </div>
        {direction.short_description && (
          <p className="mt-3 text-lg text-gray-600 max-w-3xl">{direction.short_description}</p>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8">
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Icon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Direction</p>
              <p className="text-lg font-semibold text-gray-900">{direction.nom}</p>
            </div>
          </div>

          <div
            className="rich-content mt-6"
            dangerouslySetInnerHTML={{ __html: detailContent }}
          />
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts & accès</h3>
            <div className="space-y-3 text-sm text-gray-600">
              {direction.adresse && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>{direction.adresse}</span>
                </div>
              )}
              {direction.contacts && direction.contacts.length > 0 ? (
                direction.contacts.map((contact, index) => {
                  const ContactIcon =
                    contactIconMap[contact.type as keyof typeof contactIconMap] || PhoneCall;
                  return (
                    <div key={`${contact.type}-${index}`} className="flex items-start gap-3">
                      <ContactIcon className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800">{contact.label ?? contact.type}</p>
                        <p className="text-gray-600">{contact.valeur}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">Aucun contact renseigné.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres directions</h3>
            {autres_directions.length > 0 ? (
              <div className="space-y-4">
                {autres_directions.map((item) => {
                  const OtherIcon = item.icon && iconMap[item.icon as keyof typeof iconMap]
                    ? iconMap[item.icon as keyof typeof iconMap]
                    : FileText;
                  return (
                    <Link
                      key={item.id}
                      href={item.slug ? serviceDetailUrl(item.slug) : "/services"}
                      className="flex gap-3 group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <OtherIcon className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-[#f8812f] line-clamp-2">
                          {item.nom}
                        </p>
                        {item.short_description && (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {item.short_description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aucune autre direction disponible.</p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
};

ServicesDetails.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default ServicesDetails;
