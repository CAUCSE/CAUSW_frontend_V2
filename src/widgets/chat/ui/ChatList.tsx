'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import { FullLine } from '@/shared/ui';

import { ChatListItem } from './ChatListItem';

export const chatDummyData: Chat.ChatItem[] = [
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
  {
    id: '11',
    title: '게시글제목',
    profileImage: '/images/post_default_thumbnail.png',
    preview: '마지막채팅내역',
    unreadCount: 2,
    time: '3:12',
  },
  {
    id: '12',
    title: '게시글제목2',
    profileImage: '/images/puang_profile.svg',
    preview: '마지막채팅내용',
    unreadCount: 0,
    time: '11:45',
  },
  {
    id: '31',
    title: '[김재학]에게 쪽지',
    profileImage: '/images/puang_profile.svg',
    preview: '마지막 채팅내용',
    unreadCount: 5,
    time: '10:32',
  },
  {
    id: '41',
    title: '게시글 제목',
    profileImage: '/images/puang_profile.svg',
    preview: '야왜안읽어1!!!!!!!!',
    unreadCount: 1,
    time: '17:00',
  },
  {
    id: '52',
    title: '프론트엔드 개발자 모임',
    profileImage: '/images/puang_profile.svg',
    preview: '안녕하세요! 프론트엔드 개발자 모임입니다.',
    unreadCount: 0,
    time: '3일 전',
  },
];
//채팅 api 연결 + 무한 스크롤 + ui 통일
export const ChatList = () => {
  const router = useRouter();

  return (
    <>
      <div className="sticky top-0 z-20 flex h-18 w-full items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-[#F8F8F8] px-4">
        <button onClick={() => router.back()}>
          <ChevronLeft className="size-10 text-gray-700" />
        </button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">쪽지함</div>
        <div className="w-6" />
      </div>

      <div className="flex w-full flex-col items-center overflow-x-hidden">
        <FullLine />
        {chatDummyData.map((chat) => (
          <ChatListItem key={chat.id} chatData={chat} />
        ))}
      </div>
    </>
  );
};
