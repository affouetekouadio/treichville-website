import { useEffect, useRef } from 'react';
import { listingVisit, type ListingQueryParams } from '@/lib/listing';

export function useListingSearch(
  url: string,
  params: ListingQueryParams,
  delayMs = 400
): void {
  const isFirst = useRef(true);
  const latestParams = useRef(params);

  useEffect(() => {
    latestParams.current = params;
  }, [params]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      listingVisit(url, { ...latestParams.current, page: 1 });
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [url, params.search, delayMs]);
}
