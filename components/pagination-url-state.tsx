"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const PaginationUrlState = ({
  itemCount,
  queryKey,
}: {
  itemCount: number | null;
  queryKey: string;
}) => {
  if (!itemCount) {
    return;
  }

  const pathname = usePathname();
  const readOnlyParams = useSearchParams();

  const currentPage = Number(readOnlyParams.get(queryKey)) || 1;
  const searchParams = new URLSearchParams(readOnlyParams);
  searchParams.delete(queryKey);
  const newParams = Object.fromEntries(searchParams);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname,
              query: {
                ...newParams,
                ...(currentPage - 1 > 1 && {
                  [queryKey]: currentPage - 1 > 1 && currentPage - 1,
                }),
              },
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={{
              pathname,
              query: { ...newParams, [queryKey]: currentPage + 1 },
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
