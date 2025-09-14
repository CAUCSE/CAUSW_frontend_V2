'use client';

import { useState } from 'react';

import { AdminCeremonyList, CeremonyTabs } from '@/widgets/ceremony';
import { useCeremonyListQuery } from '@/entities/notification';

import { tabItems } from '../config';

export const CeremonyListWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ceremonyState = tabItems[activeTab].key;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCeremonyListQuery(ceremonyState);

  const items: Ceremony.CeremonyItem[] = (data ?? []).map((item) => ({
    id: item.id,
    writer: item.writer,
    category: item.category,
    date: item.date,
    description: item.description,
    createdAt: item.createdAt,
  }));

  return (
    <div className="w-full">
      <CeremonyTabs
        tabItems={tabItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="mt-4">
        <AdminCeremonyList
          list={items}
          firstNavigation={{ router: '/ceremony' }}
          state={ceremonyState}
          context="my"
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
