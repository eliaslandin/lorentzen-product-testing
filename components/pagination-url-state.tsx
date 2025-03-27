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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={"#"} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={"#"} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
