'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  ContactCard,
  useSearchContactsQuery,
  SearchBar,
} from '@/fsd_entities/contact';
import { useInfiniteScroll } from '@/fsd_shared/hooks/useInfiniteScroll';
import { Loader2 } from 'lucide-react';
import { useDebounce } from '@/fsd_shared';

const PullToRefreshContainer = dynamic(
  () => import('@/fsd_shared/ui/PullToRefreshContainer').then((mod) => mod.PullToRefreshContainer),
  { ssr: false },
);

export const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useSearchContactsQuery(debouncedSearchTerm);

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
      const aHasInfo = !!(a.job?.trim() || a.description?.trim());
      const bHasInfo = !!(b.job?.trim() || b.description?.trim());
      return Number(bHasInfo) - Number(aHasInfo);
    });
  }, [data]);

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <div className="flex flex-col gap-3">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <PullToRefreshContainer onRefresh={handleRefresh}>
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
      </PullToRefreshContainer>
    </div>
  );
};
