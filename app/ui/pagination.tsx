'use client'

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";

export default function Pagination({ total, page, pageSize }: { total: number; page: number; pageSize: number }) {
  const totalPages = Math.ceil(total / pageSize);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";

  if (totalPages <= 1) {
    return null;
  }

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", p.toString());
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    return `?${params.toString()}`;
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={buildHref(page - 1)} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={buildHref(i + 1)}
              isActive={page === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={buildHref(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  );
}