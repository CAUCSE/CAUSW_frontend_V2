'use client';

import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';

import { CeremonyState } from '@/fsd_entities/notification/api';
import { CeremonyResponse } from '@/fsd_entities/notification/config/types';
import { useCeremonyListQuery } from '@/fsd_entities/notification/hooks/queries/useCeremonyListQuery';

import { CommonTabs } from '@/fsd_shared/ui/CommonTabs';
import { ListBox, ListBoxItem } from '@/fsd_shared/ui/ListBox';

const tabItems: { label: string; key: CeremonyState }[] = [
  { label: '등록 완료', key: CeremonyState.ACCEPT },
  { label: '등록 거부', key: CeremonyState.REJECT },
  { label: '등록 대기 중', key: CeremonyState.AWAIT },
];

export const CeremonyListWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ceremonyState = tabItems[activeTab].key;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useCeremonyListQuery(ceremonyState);

  useEffect(() => {
    refetch();
  }, [ceremonyState, refetch]);

  const infiniteData = data as InfiniteData<CeremonyResponse> | undefined;

  const items: ListBoxItem[] = infiniteData?.pages
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
