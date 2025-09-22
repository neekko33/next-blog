'use client'

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Pagination({ total, page, pageSize, onPageChange }: { total: number; page: number; pageSize: number, onPageChange: (page: number) => void }) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationRoot>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={() => (page - 1) >= 1 ? onPageChange(page - 1) : undefined} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => onPageChange(i + 1)}
              isActive={page === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={() => (page + 1) <= totalPages ? onPageChange(page + 1) : undefined} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  );
}
