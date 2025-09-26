'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, Filter } from 'lucide-react';

import {
  ContactCard,
  SearchBar,
  useSearchContactsQuery,
  ContactFilterSheet,
  FilterPills,
} from '@/entities/contact';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useDebounce } from '@/shared';
import { Button } from '@/shadcn/components/ui/button';

export const ContactList = () => {
  const [filters, setFilters] = useState<Contact.ContactFilters>({});
  const debouncedFilters = useDebounce(filters, 500); // 디바운스 시간을 500ms로 조정
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
    setFilters(prevFilters => ({ ...prevFilters, keyword }));
  };

  const contacts = useMemo(() => {
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data]);

  const myContactsFabStyles = `
    group fixed right-6 bottom-24 z-10 flex items-center justify-center
    xl:right-80 xl:bottom-10 shadow-lg
    transition-all duration-200 ease-out will-change-transform
    hover:-translate-y-0.5 hover:shadow-xl active:scale-95
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    bg-[#7AB6C1] hover:bg-[#6AA3AD] focus-visible:ring-[#7AB6C1] text-white font-bold
    rounded-lg
    px-4 py-3 text-sm
    sm:px-5 sm:py-3 sm:text-base
    xl:px-6 xl:py-4 xl:text-lg
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

      <Link href="/contacts/profile" className={myContactsFabStyles}>
        <span className="transition-transform duration-200 group-hover:scale-105">내 동문수첩</span>
        <span className="ml-2 font-mono transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
      </Link>
    </>
  );
};
