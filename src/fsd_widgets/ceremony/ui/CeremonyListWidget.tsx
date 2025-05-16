'use client';

import { useState } from 'react';
import { ListBox, CeremonyItem } from '@/fsd_shared/ui/ListBox';

const tabs = [
  { label: '등록 완료', value: 'ACCEPT' },
  { label: '등록 거부', value: 'REJECT' },
  { label: '등록 대기 중', value: 'AWAIT' },
];

const mockData: CeremonyItem[] = Array.from({ length: 30 }).map((_, idx) => ({
  id: idx,
  title: `홍길동(${17 + idx}) - 결혼`,
  subtitle: '2025.03.10. ~ 2025.03.11.',
  isRead: idx % 2 === 0,
}));

export const CeremonyListWidget = () => {
  const [activeTab, setActiveTab] = useState('ACCEPT');

  const filteredData = mockData;

  return (
    <div className="w-full max-w-3xl">
      <div className="flex space-x-6 border-b mb-6 text-lg font-medium">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-2 ${
              activeTab === tab.value
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        <ListBox data={filteredData} />
      </div>
    </div>
  );
};
