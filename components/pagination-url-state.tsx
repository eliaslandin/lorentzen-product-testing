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
  if (lastPage === 1) {
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
                ...(currentPage > 1 && {
                  [queryKey]: currentPage - 1,
                }),
              },
            }}
            className={
              currentPage > 1 ? "" : "pointer-events-none text-muted-foreground"
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={{
              pathname,
              query: { ...newParams, [queryKey]: currentPage + 1 },
            }}
            className={
              currentPage >= lastPage
                ? "pointer-events-none text-muted-foreground"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
