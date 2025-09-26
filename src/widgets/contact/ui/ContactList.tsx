'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import { ContactCard, SearchBar, useSearchContactsQuery } from '@/entities/contact';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

import { useDebounce } from '@/shared';

export const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchContactsQuery(debouncedSearchTerm);

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

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

  const contacts = useMemo(() => {
    const flatContacts = data?.pages.flatMap((page) => page.content) ?? [];
    if (debouncedSearchTerm) {
      return flatContacts;
    }
    return [...flatContacts].sort((a, b) => {
      const aHasInfo = (a.job && a.job.trim() !== '') || (a.description && a.description.trim() !== '');
      const bHasInfo = (b.job && b.job.trim() !== '') || (b.description && b.description.trim() !== '');
      if (aHasInfo && !bHasInfo) {
        return -1;
      }
      if (!aHasInfo && bHasInfo) {
        return 1;
      }
      return 0;
    });
  }, [data, debouncedSearchTerm]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex flex-col divide-y divide-gray-200">
          {contacts.length > 0 ? (
            contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-500">검색 결과가 없습니다.</div>
          )}
        </div>
        <div ref={targetRef} className="flex h-10 items-center justify-center">
          {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-gray-400" />}
        </div>
      </div>

      <Link href="/contacts/profile" className={myContactsFabStyles}>
        <span className="transition-transform duration-200 group-hover:scale-105">내 동문수첩</span>
        <span className="ml-2 font-mono transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
      </Link>
    </>
  );
};
