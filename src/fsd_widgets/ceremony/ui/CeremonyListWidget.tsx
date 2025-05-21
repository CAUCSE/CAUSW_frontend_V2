'use client';

import { useState, useEffect } from 'react';
import { CommonTabs } from '@/fsd_shared/ui/CommonTabs';
import { Item, ListBox } from '@/fsd_shared/ui/ListBox';
import { useCeremonyListQuery } from '@/fsd_entities/notification/hooks/useCeremonyListQuery';
import { InfiniteData } from '@tanstack/react-query';

const tabItems = [
  { label: '등록 완료', key: 'ACCEPT' },
  { label: '등록 거부', key: 'REJECT' },
  { label: '등록 대기 중', key: 'AWAIT' },
];

export const CeremonyListWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ceremonyState = tabItems[activeTab].key;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useCeremonyListQuery(ceremonyState);

  useEffect(() => {
    refetch();
  }, [ceremonyState, refetch]);

  const infiniteData = data as InfiniteData<Notification.NotificationResponse> | undefined;

  const items: Item[] = infiniteData?.pages
    ? infiniteData.pages.flatMap(page =>
      page.content.map(item => ({
        id: item.notificationLogId,
        title: item.title,
        body: item.body,
        isRead: true,
      }))
    )
    : [];

  return (
    <div className="w-full max-w-3xl">
      <CommonTabs
        tabItems={tabItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
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
