<?php

namespace App\Support\Listing;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ListingQuery
{
    private Request $request;
    private Builder $query;
    private array $options;
    private ?string $searchTerm;
    private string $sortColumn;
    private string $sortDirection;
    private int $perPage;

    public function __construct(Request $request, Builder $query, array $options = [])
    {
        $this->request = $request;
        $this->query = $query;
        $this->options = $options;
        $this->searchTerm = $this->resolveSearch();
        [$this->sortColumn, $this->sortDirection] = $this->resolveSort();
        $this->perPage = $this->resolvePerPage();
    }

    public static function make(Request $request, Builder $query, array $options = []): self
    {
        return new self($request, $query, $options);
    }

    public function paginate(): LengthAwarePaginator
    {
        return $this->filteredQuery()
            ->paginate($this->perPage)
            ->withQueryString();
    }

    public function exportIfRequested(): ?StreamedResponse
    {
        $exportParam = $this->options['export']['param'] ?? 'export';
        $format = strtolower((string) $this->request->query($exportParam, ''));
        if ($format === '') {
            return null;
        }

        $allowedFormats = $this->options['export']['formats'] ?? ['csv', 'xls'];
        if (!in_array($format, $allowedFormats, true)) {
            return null;
        }

        $columns = $this->options['export']['columns'] ?? [];
        if ($columns === []) {
            return null;
        }

        $filename = $this->options['export']['filename'] ?? 'export';
        $rows = $this->filteredQuery()->get(array_keys($columns));

        return ListingExporter::stream($format, $filename, $rows, $columns);
    }

    public function filters(): array
    {
        return [
            'search' => $this->searchTerm ?? '',
            'sort' => $this->sortColumn,
            'direction' => $this->sortDirection,
            'per_page' => $this->perPage,
        ];
    }

    public function paginationMeta(LengthAwarePaginator $paginator): array
    {
        return [
            'page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'last_page' => $paginator->lastPage(),
        ];
    }

    private function filteredQuery(): Builder
    {
        $query = clone $this->query;

        if ($this->searchTerm !== null && $this->searchTerm !== '') {
            $columns = $this->options['search']['columns'] ?? [];
            if ($columns !== []) {
                $term = '%'.$this->searchTerm.'%';
                $query->where(function (Builder $builder) use ($columns, $term) {
                    foreach ($columns as $column) {
                        $builder->orWhere($column, 'like', $term);
                    }
                });
            }
        }

        $query->orderBy($this->sortColumn, $this->sortDirection);

        return $query;
    }

    private function resolveSearch(): ?string
    {
        $param = $this->options['search']['param'] ?? 'search';
        $value = trim((string) $this->request->query($param, ''));

        return $value === '' ? null : $value;
    }

    /**
     * @return array{0: string, 1: string}
     */
    private function resolveSort(): array
    {
        $sortParam = $this->options['sort']['param'] ?? 'sort';
        $directionParam = $this->options['sort']['direction_param'] ?? 'direction';
        $allowed = $this->options['sort']['allowed'] ?? [];
        $default = $this->options['sort']['default'] ?? ['created_at', 'desc'];

        $sort = (string) $this->request->query($sortParam, $default[0]);
        $direction = strtolower((string) $this->request->query($directionParam, $default[1]));

        if ($allowed !== [] && !in_array($sort, $allowed, true)) {
            $sort = $default[0];
        }

        if (!in_array($direction, ['asc', 'desc'], true)) {
            $direction = $default[1];
        }

        return [$sort, $direction];
    }

    private function resolvePerPage(): int
    {
        $param = $this->options['pagination']['param'] ?? 'per_page';
        $default = (int) ($this->options['pagination']['default'] ?? 15);
        $max = (int) ($this->options['pagination']['max'] ?? 100);
        $value = (int) $this->request->query($param, $default);

        if ($value <= 0) {
            $value = $default;
        }

        return min($value, $max);
    }
}
