'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { EllipsisVertical } from 'lucide-react';

import { FullLine } from '@/shared/ui';

import { useMoreBtnClick } from '@/shared';

export const ChatListItem = ({ chatData }: Chat.ChatItemProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  useMoreBtnClick(menuRef, () => setOpen(false));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = () => {
    router.push(`/chat/${chatData.id}`);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const UnreadBadge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="ml-2 h-[20px] min-w-[20px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-xs text-white">
        {count}
      </span>
    ) : null;

  return (
    <div className="w-full" onClick={handleItemClick}>
      <div className="flex items-center gap-3 px-1 py-4">
        <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
          <img src={chatData.profileImage} alt={`${chatData.title}의 프로필`} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{chatData.title}</h3>
            <span className="mr-[-4px] text-sm text-gray-400">{chatData.time}</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="max-w-[80%] truncate text-[15px] text-gray-700">{chatData.preview}</p>
            <UnreadBadge count={chatData.unreadCount} />
          </div>
        </div>

        <div className="relative mb-auto pt-1" ref={menuRef}>
          <button onClick={handleMenuToggle} className="text-gray-500 hover:text-black">
            <EllipsisVertical size={18} />
          </button>
          {open && (
            <div className="absolute top-full right-0 z-10 w-24 rounded-md border bg-white shadow-md">
              <button className="w-full px-4 py-4 text-sm hover:bg-gray-100">상단 고정</button>
              <button className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">삭제</button>
            </div>
          )}
        </div>
      </div>
      <FullLine />
    </div>
  );
};
