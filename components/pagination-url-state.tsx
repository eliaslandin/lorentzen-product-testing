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
  pageSize,
  queryKey,
}: {
  itemCount: number | null;
  pageSize: number;
  queryKey: string;
}) => {
  if (!itemCount) {
    return;
  }

  const lastPage = Math.ceil(itemCount / pageSize);

  const pathname = usePathname();
  const readOnlyParams = useSearchParams();

  const currentPage = Number(readOnlyParams.get(queryKey)) || 1;
  const searchParams = new URLSearchParams(readOnlyParams);
  searchParams.delete(queryKey);
  const newParams = Object.fromEntries(searchParams);

  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        {lastPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname,
                query: {
                  ...newParams,
                  ...(currentPage > 2 && {
                    [queryKey]: currentPage - 1,
                  }),
                },
              }}
              replace
              size="sm"
              className={
                currentPage > 1 ? "" : "pointer-events-none text-secondary"
              }
            />
          </PaginationItem>
        )}

        <p className="w-full text-muted-foreground text-sm text-center">
          Visar {(currentPage - 1) * pageSize + 1}-
          {currentPage !== lastPage ? currentPage * pageSize : itemCount} av{" "}
          {itemCount}
        </p>

        {lastPage !== 1 && (
          <PaginationItem>
            <PaginationNext
              href={{
                pathname,
                query: { ...newParams, [queryKey]: currentPage + 1 },
              }}
              replace
              size="sm"
              className={
                currentPage >= lastPage
                  ? "pointer-events-none text-secondary"
                  : ""
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
