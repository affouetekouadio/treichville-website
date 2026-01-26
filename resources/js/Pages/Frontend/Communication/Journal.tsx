import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Download, FileText } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";
import PageBanner from "@/components/Frontend/PageBanner";
import { usePage } from "@inertiajs/react";
import ListingPagination from "@/components/listing/ListingPagination";
import { listingVisit } from "@/lib/listing";

type JournalEdition = {
  id: number;
  title: string;
  description?: string | null;
  size?: string | null;
  url: string;
  download_url?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
};

type JournalProps = {
  editions?: JournalEdition[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  filters?: {
    search?: string;
    year?: string;
    month?: string;
  };
  available_years?: string[];
};

const Journal: FrontendPage = () => {
  const { props, url } = usePage<JournalProps>();
  const baseUrl = url.split("?")[0];
  const editions = props.editions ?? [];
  const filters = props.filters ?? {};
  const pagination = props.pagination ?? {
    page: 1,
    per_page: 12,
    total: editions.length,
    last_page: 1,
  };
  const availableYears = props.available_years ?? [];
  const [search, setSearch] = useState(filters.search ?? "");
  const [yearFilter, setYearFilter] = useState(filters.year ? filters.year : "all");
  const [monthFilter, setMonthFilter] = useState(filters.month ? filters.month : "all");
  const formatDate = (date?: string | null) => {
    if (!date) {
      return null;
    }

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return parsed.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    setSearch(filters.search ?? "");
    setYearFilter(filters.year ? filters.year : "all");
    setMonthFilter(filters.month ? filters.month : "all");
  }, [filters.month, filters.search, filters.year]);

  const applyFilters = () => {
    const normalizedYear = yearFilter === "all" ? "" : yearFilter;
    const normalizedMonth = monthFilter === "all" ? "" : monthFilter;
    listingVisit(baseUrl, {
      search: search.trim(),
      year: normalizedYear,
      month: normalizedMonth,
      page: 1,
      per_page: pagination.per_page,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="Journal municipal"
        variant="compact"
      />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-white border border-amber-100 text-amber-800 rounded-xl p-4 text-sm font-medium">
          Téléchargement direct : chaque édition est hébergée sur le site de la mairie et peut être consultée hors ligne.
        </div>

        <form
          className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm"
          onSubmit={(event) => {
            event.preventDefault();
            applyFilters();
          }}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Recherche
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Titre ou description"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Année
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
              >
                <option value="all">Toutes</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Mois
              </label>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#f8812f] focus:outline-none focus:ring-2 focus:ring-[#f8812f]/20"
              >
                <option value="all">Tous</option>
                <option value="01">Janvier</option>
                <option value="02">Février</option>
                <option value="03">Mars</option>
                <option value="04">Avril</option>
                <option value="05">Mai</option>
                <option value="06">Juin</option>
                <option value="07">Juillet</option>
                <option value="08">Août</option>
                <option value="09">Septembre</option>
                <option value="10">Octobre</option>
                <option value="11">Novembre</option>
                <option value="12">Décembre</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f8812f] px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              Appliquer
            </button>
          </div>
        </form>

        <div className="grid gap-6 md:grid-cols-3">
          {editions.map((edition, idx) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col"
            >
              {edition.cover_image ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={edition.cover_image}
                    alt={edition.title}
                    className="h-36 w-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#f8812f]/15 text-[#f8812f] flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
              )}
              <h2 className="text-lg font-bold text-gray-900 mb-2">{edition.title}</h2>
              {edition.published_at && (
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 text-[#f8812f]" />
                  <span>Publié le {formatDate(edition.published_at) ?? edition.published_at}</span>
                </div>
              )}
              <p className="text-sm text-gray-500 mb-2">{edition.size || 'PDF'}</p>
              {edition.description && (
                <p className="text-sm text-gray-600 mb-4">{edition.description}</p>
              )}
              <div className="mt-auto grid gap-3">
                <a
                  href={edition.url}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#f8812f] text-[#f8812f] font-semibold hover:bg-[#f8812f]/10 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText className="w-4 h-4" />
                  Lire en ligne
                </a>
                <a
                  href={edition.download_url || edition.url}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f8812f] text-white font-semibold hover:bg-orange-600 transition-colors"
                  download
                >
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </a>
              </div>
            </motion.div>
          ))}
          {!editions.length && (
            <div className="md:col-span-3 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
              Aucune édition ne correspond à vos critères.
            </div>
          )}
        </div>

        <ListingPagination
          page={pagination.page}
          lastPage={pagination.last_page}
          total={pagination.total}
          onPageChange={(page) =>
            listingVisit(baseUrl, {
              search: search.trim(),
              year: yearFilter === "all" ? "" : yearFilter,
              month: monthFilter === "all" ? "" : monthFilter,
              page,
              per_page: pagination.per_page,
            })
          }
        />
      </div>
    </div>
  );
};

Journal.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default Journal;
