'use client';

import { useState } from 'react';

import { useCeremonyListQuery } from '@/fsd_entities/notification';

import { ListBox } from '@/fsd_shared';

import { tabItems } from '../config';
import { CeremonyTabs } from '@/fsd_widgets/ceremony';

export const CeremonyListWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ceremonyState = tabItems[activeTab].key;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCeremonyListQuery(ceremonyState);

  const items: Ceremony.ListBoxItem[] = (data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
  }));

  return (
    <div className="w-full">
      <CeremonyTabs tabItems={tabItems} activeTab={activeTab} setActiveTab={setActiveTab} />
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
