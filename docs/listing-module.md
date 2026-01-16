# Listing module (search, sort, pagination, export)

This module provides a reusable backend + frontend pattern for admin listings:
- Search across multiple columns
- Sort with allowed fields and directions
- Pagination with per-page controls
- Export to CSV or XLS (Excel-compatible HTML)

## Backend usage

Use `App\Support\Listing\ListingQuery` in a controller or route:
- Define searchable columns
- Define allowed sort fields and default order
- Set pagination defaults
- Define export columns and filename

Example flow (pseudo):
- Build ListingQuery
- If `export` is requested, return export response
- Otherwise paginate and return props: `contacts` + `listing.filters` + `listing.pagination`

Export format:
- `?export=csv` generates CSV
- `?export=xls` generates XLS (HTML table)

Files:
- `app/Support/Listing/ListingQuery.php`
- `app/Support/Listing/ListingExporter.php`

## Frontend usage

Use the shared utilities and components:
- `resources/js/lib/listing.ts` for query building and navigation
- `resources/js/hooks/use-listing-search.ts` for auto-search while typing
- `resources/js/components/listing/ListingToolbar.tsx` for search/per-page/export/sort
- `resources/js/components/listing/ListingPagination.tsx` for pagination

Expected props shape from backend:
- `listing.filters`: `search`, `sort`, `direction`, `per_page`
- `listing.pagination`: `page`, `per_page`, `total`, `last_page`

Suggested pattern:
- Keep `search` in local state
- Call `listingVisit()` for search, per-page, and pagination changes
- Call `listingExport()` for exports

## Notes

- CSV uses semicolon separator for French locales.
- XLS export is HTML table for Excel compatibility.
- Add custom columns or formatters by extending `ListingExporter::normalizeValue()`.
- For large datasets, consider chunked export or queued jobs.
