'use client';

import { useEffect, useState, useCallback } from 'react';
import { MailOpen, Mail } from 'lucide-react';
import { useInfiniteScroll } from '@/fsd_shared/hooks/useInfiniteScroll';

export interface CeremonyItem {
  id: number;
  title: string;
  subtitle: string;
  isRead: boolean;
}

interface ListBoxProps {
  data: CeremonyItem[];
}

export const ListBox = ({ data }: ListBoxProps) => {
  const [items, setItems] = useState<CeremonyItem[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const loadMore = useCallback(() => {
    const nextItems = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    setItems(prev => [...prev, ...nextItems]);
    setPage(prev => prev + 1);
  }, [page, data]);

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
  });

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="bg-gray-100 p-4 max-h-[400px] overflow-y-auto rounded-lg">
      {items.map(item => (
        <div
          key={item.id}
          className="bg-white rounded-xl p-4 mb-4 shadow flex items-center gap-4"
        >
          <div className="text-gray-600">
            {item.isRead ? <MailOpen size={32} /> : <Mail size={32} />}
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-800">{item.title}</div>
            <div className="text-sm text-gray-500">{item.subtitle}</div>
          </div>
        </div>
      ))}
      <div ref={targetRef} className="h-10" />
    </div>
  );
};
