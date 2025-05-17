'use client';

import { useCallback, useEffect, useState } from 'react';

import { Mail, MailOpen } from 'lucide-react';

import { useInfiniteScroll } from '@/fsd_shared/hooks/useInfiniteScroll';

import MailIcon from '../../../public/icons/envelope_icon.svg';
import MailOpendIcon from '../../../public/icons/envelope_open_icon.svg';

export interface CeremonyItem {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
}

interface ListBoxProps {
  data: CeremonyItem[];
}

export const ListBox = ({ data }: ListBoxProps) => {
  const [items, setItems] = useState<CeremonyItem[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  useEffect(() => {
    const nextItems = data.slice(0, itemsPerPage);
    setItems(nextItems);
    setPage(1);
  }, [data]);

  const loadMore = useCallback(() => {
    setPage(prevPage => {
      const nextItems = data.slice(prevPage * itemsPerPage, (prevPage + 1) * itemsPerPage);
      setItems(prevItems => [...prevItems, ...nextItems]);
      return prevPage + 1;
    });
  }, [data]);

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
    <div className="max-h-[400px] max-w-[560px] overflow-y-auto rounded-lg bg-[#D9D9D9] p-4">
      <div className="flex flex-col space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 rounded-xl bg-[#F4F4F4] p-4 shadow">
            <div className="text-gray-600">{item.isRead ? <MailOpendIcon size={32} /> : <MailIcon size={32} />}</div>
            <div className="text-left">
              <div className="font-medium text-[#212323]">{item.title}</div>
              <div className="text-sm text-[#212323]">{item.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div ref={targetRef} className="invisible h-px" />
    </div>
  );
};
