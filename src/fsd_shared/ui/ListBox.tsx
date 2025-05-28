'use client';

import { useRouter } from 'next/navigation';

import { useNotificationStore } from '@/fsd_entities/notification';

import { useInfiniteScroll } from '@/fsd_shared/hooks/useInfiniteScroll';

import MailIcon from '../../../public/icons/envelope_icon.svg';
import MailOpendIcon from '../../../public/icons/envelope_open_icon.svg';

export interface ListBoxItem {
  id: string;
  title: string;
  body: string;
  isRead?: boolean;
  targetId?: string;
  notificationLogId?: string;
}

interface ListBoxProps {
  data: ListBoxItem[];
  alarm?: string; //general | ceremony
  loadMore?: () => void;
}

export const ListBox = ({ data, alarm, loadMore }: ListBoxProps) => {
  const router = useRouter();
  const markAsRead = useNotificationStore(state => state.markAsRead);

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: ([entry]) => {
      if (entry.isIntersecting && loadMore) {
        loadMore();
      }
    },
  });

  return (
    <div className="max-h-[400px] max-w-[560px] overflow-y-auto rounded-lg bg-[#D9D9D9] p-4">
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => {
          const targetLink =
            alarm === 'general'
              ? `/board/${item.id}/${item.targetId}`
              : item.targetId
                ? `/ceremony/${item.targetId}`
                : `/ceremony/${item.id}`;
          return (
            <div
              onClick={() => {
                if (!item.isRead) {
                  markAsRead(item.id);
                }
                router.push(targetLink);
              }}
              key={`item.id-${index}`}
              className="relative flex items-center gap-4 rounded-xl bg-[#F4F4F4] p-4 shadow"
            >
              {!item.isRead && (
                <span
                  style={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: 'red',
                  }}
                />
              )}

              <div className="text-gray-600">{item.isRead ? <MailOpendIcon size={32} /> : <MailIcon size={32} />}</div>
              <div className="text-left">
                <div className="font-medium text-[#212323]">{item.title}</div>
                <div className="text-sm text-[#212323]">{item.body}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={targetRef} className="invisible h-px" />
    </div>
  );
};
