'use client';

import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';

import { useCeremonyListQuery } from '@/fsd_entities/notification';

import { CommonTabs, ListBox } from '@/fsd_shared';

import { tabItems } from '../config';

export const CeremonyListWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ceremonyState = tabItems[activeTab].key;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useCeremonyListQuery(ceremonyState);

  useEffect(() => {
    refetch();
  }, [ceremonyState, refetch]);

  const infiniteData = data as InfiniteData<Ceremony.CeremonyResponse> | undefined;

  const items: Ceremony.ListBoxItem[] = infiniteData?.pages
    ? infiniteData.pages.flatMap((page) =>
        page.content.map((item) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          isRead: true,
        })),
      )
    : [];

  return (
    <div className="w-full max-w-3xl">
      <CommonTabs tabItems={tabItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        <ListBox
          data={items}
          loadMore={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      </div>
    </div>
  );
};
