'use client';

import { useState, useMemo } from 'react';
import {
  ContactCard,
  useSearchContactsQuery,
  SearchBar,
} from '@/fsd_entities/contact';
import { useInfiniteScroll } from '@/fsd_shared/hooks/useInfiniteScroll';
import { Loader2 } from 'lucide-react';
import { useDebounce } from '@/fsd_shared';

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

  const contacts = useMemo(() => {
    const flatContacts = data?.pages.flatMap((page) => page.content) ?? [];
    return flatContacts.sort((a, b) => {
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
  }, [data]);

  return (
    <div className="flex flex-col gap-3">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex flex-col divide-y divide-gray-200">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
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
  );
};
