type ListingPaginationProps = {
  page: number;
  lastPage: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function ListingPagination({
  page,
  lastPage,
  total,
  onPageChange,
}: ListingPaginationProps) {
  if (lastPage <= 1) {
    return null;
  }

  const start = Math.max(1, page - 2);
  const end = Math.min(lastPage, page + 2);
  const pages = [];
  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm text-gray-500">
        Total: {total} - Page {page} sur {lastPage}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Precedent
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`rounded-lg border px-3 py-2 text-sm ${
              p === page
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= lastPage}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
