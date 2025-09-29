'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, Filter, ChevronRight } from "lucide-react";

import {
  ContactCard,
  useSearchContactsQuery,
  ContactFilterSheet,
  FilterPills,
} from '@/entities/contact';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { SearchBar, useDebounce } from '@/shared';
import { Button } from '@/shadcn/components/ui/button';

export const ContactList = () => {
  const [filters, setFilters] = useState<Contact.ContactFilters>({});
  const debouncedFilters = useDebounce(filters, 500);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchContactsQuery(debouncedFilters);

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleSearchChange = (keyword: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, keyword }));
  };
  const contacts = useMemo(() => {
    const list = data?.pages.flatMap((page) => page.content) ?? [];
    return [...list].sort((a, b) => {
      const aHasInfo = !!(a.job || a.description);
      const bHasInfo = !!(b.job || b.description);

      if (aHasInfo === bHasInfo) return 0;
      return aHasInfo ? -1 : 1;
    });
  }, [data]);

  const myContactsFabStyles = `
    group fixed right-6 bottom-24 z-10 flex items-center justify-center
    xl:right-80 xl:bottom-10 shadow-lg
    transition-all duration-200 ease-out will-change-transform
    hover:-translate-y-0.5 hover:shadow-xl active:scale-95
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-[#7AB6C1] text-white
    rounded-lg
    px-5
    py-[12.5px]
    font-pretendard font-medium text-base
  `.trim();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4" />
          </Button>
          <SearchBar
            placeholder="이름, 직업, 경력으로 검색"
            value={filters.keyword ?? ''}
            onChange={handleSearchChange}
            bgColor="bg-white"
          />
        </div>
        <FilterPills filters={filters} onFilterChange={setFilters} />

        <div className="flex flex-col divide-y divide-gray-200">
          {contacts.length > 0 ? (
            contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
        <div ref={targetRef} className="flex h-10 items-center justify-center">
          {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-gray-400" />}
        </div>
      </div>
      <ContactFilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        initialFilters={filters}
        onApply={setFilters}
      />

      <Link href="/contacts/profile" className={`${myContactsFabStyles} bg-slate-600 text-white`}>
        <span className="transition-transform duration-200 group-hover:scale-105">내 동문수첩</span>
        <span className="ml-2 font-mono transition-transform duration-200 group-hover:translate-x-0.5">
          &gt;
        </span>
      </Link>
    </>
  );
};
