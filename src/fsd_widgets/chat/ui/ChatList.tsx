'use client';

import { useEffect, useRef, useState } from 'react';

import { EllipsisVertical } from 'lucide-react';

import { FullLine } from '@/fsd_shared/ui';

export interface ChatItem {
  id: string;
  title: string;
  profileImage: string;
  preview: string;
  unreadCount: number;
  time: string;
}

export const chatDummyData: ChatItem[] = [
  {
    id: '1',
    title: '게시글제목',
    profileImage: '/images/post_default_thumbnail.png',
    preview: '마지막채팅내역',
    unreadCount: 2,
    time: '3:12',
  },
  {
    id: '2',
    title: '게시글제목2',
    profileImage: '/images/puang_profile.svg',
    preview: '마지막채팅내용',
    unreadCount: 0,
    time: '11:45',
  },
  {
    id: '3',
    title: '[김재학]에게 쪽지',
    profileImage: '/images/puang_profile.svg',
    preview: '마지막 채팅내용',
    unreadCount: 5,
    time: '10:32',
  },
  {
    id: '4',
    title: '게시글 제목',
    profileImage: '/images/puang_profile.svg',
    preview: '야왜안읽어1!!!!!!!!',
    unreadCount: 1,
    time: '17:00',
  },
  {
    id: '5',
    title: '프론트엔드 개발자 모임',
    profileImage: '/images/puang_profile.svg',
    preview: '안녕하세요! 프론트엔드 개발자 모임입니다.',
    unreadCount: 0,
    time: '3일 전',
  },
];
//채팅 api 연결 + 무한 스크롤 + ui 통일
export const ChatList = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <div className="p-6 text-2xl font-semibold">쪽지함</div>
      <div className="flex flex-col items-center">
        <FullLine />
        {chatDummyData.map((chat) => (
          <div key={chat.id} className="w-full">
            <div className="bg-#F8F8F8 flex items-center gap-3 px-1 py-4">
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <img src={chat.profileImage} alt={`${chat.title}의 프로필`} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{chat.title}</h3>
                  <span className="mr-[-4px] text-sm text-gray-400">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="max-w-[220px] truncate text-[15px] text-gray-700">{chat.preview}</p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 h-[20px] min-w-[20px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-xs text-white">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative mb-auto pt-1" ref={openMenuId === chat.id ? menuRef : null}>
                <button onClick={() => toggleMenu(chat.id)} className="text-gray-500 hover:text-black">
                  <EllipsisVertical size={18} />
                </button>

                {openMenuId === chat.id && (
                  <div className="absolute top-full right-0 z-10 w-28 rounded-md border bg-white shadow-md">
                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100">상단 고정</button>
                    <button className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">삭제</button>
                  </div>
                )}
              </div>
            </div>
            <FullLine />
          </div>
        ))}
      </div>
    </>
  );
};
