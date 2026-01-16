type ListingToolbarProps = {
  search: string;
  perPage: number;
  perPageOptions?: number[];
  sort?: {
    value: string;
    direction: 'asc' | 'desc';
  };
  sortOptions?: Array<{ value: string; label: string }>;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onPerPageChange: (value: number) => void;
  onExport: (format: 'csv' | 'xls') => void;
  onSortChange?: (value: string, direction: 'asc' | 'desc') => void;
};

const defaultPerPageOptions = [10, 15, 25, 50, 100];

export default function ListingToolbar({
  search,
  perPage,
  perPageOptions = defaultPerPageOptions,
  sort,
  sortOptions,
  onSearchChange,
  onSearchSubmit,
  onPerPageChange,
  onExport,
  onSortChange,
}: ListingToolbarProps) {
  const canSort = Boolean(sortOptions?.length && onSortChange);
  const currentSort = sort?.value ?? sortOptions?.[0]?.value ?? '';
  const currentDirection = sort?.direction ?? 'asc';

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <form
        className="flex flex-1 items-center gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher..."
          className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          Rechercher
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        {canSort && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Trier</span>
            <select
              value={currentSort}
              onChange={(event) => onSortChange?.(event.target.value, currentDirection)}
              className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              {sortOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={currentDirection}
              onChange={(event) => onSortChange?.(currentSort, event.target.value as 'asc' | 'desc')}
              className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Par page</span>
          <select
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
            className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onExport('csv')}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => onExport('xls')}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            Export XLS
          </button>
        </div>
      </div>
    </div>
  );
}
