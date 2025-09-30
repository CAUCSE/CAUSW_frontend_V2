"use client";
import { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MdEmail, MdPermIdentity, MdTagFaces, MdVolumeUp } from 'react-icons/md';

import { Banner, getGraduateHomePosts } from '@/entities/home';
import { useGraduateHomePostsQuery } from '@/entities/home/model';
import { ErrorFallback, LoadingComponent } from '@/shared';

export const GraduateHomePage = ({ events }: { events: Home.GetEventsResponseDto }) => {
  const { data: homePosts, isLoading, isError } = useGraduateHomePostsQuery();

  if (isLoading) return <LoadingComponent />;

  if (!homePosts || isError) {
    throw new Error('Error');
  }

  // 크자회 공지 게시판
  const noticeBoard = homePosts.find((b) => b.board.name.includes('크자회 공지 게시판'));
  // 크자회 소통 게시판
  const talkBoard = homePosts.find((b) => b.board.name.includes('크자회 소통 게시판'));

  const noticePosts = noticeBoard?.posts?.content?.slice(0, 4) ?? [];
  const talkPosts = talkBoard?.posts?.content?.slice(0, 4) ?? [];

  const noticeBoardId = noticeBoard?.board.id ?? '';
  const talkBoardId = talkBoard?.board.id ?? '';

  // 📌 API 응답 기반 동적 boards 배열
  const boards = [
    {
      name: '공지 게시판',
      icon: <MdVolumeUp className="h-16 w-16 object-contain text-[#E55992] lg:h-16 lg:w-16" />,
      href: `/board/${noticeBoardId}`,
    },
    {
      name: '소통 게시판',
      icon: <MdTagFaces className="h-16 w-16 object-contain text-[#5E9B4D] lg:h-16 lg:w-16" />,
      href: `/board/${talkBoardId}`,
    },
    {
      name: '동문수첩',
      icon: <MdPermIdentity className="h-16 w-16 object-contain text-[#568389] lg:h-16 lg:w-16" />,
      href: '/contacts',
    },
    {
      name: '경조사 신청',
      icon: <MdEmail className="h-16 w-16 object-contain text-[#C1A979] lg:h-16 lg:w-16" />,
      href: '/ceremony/create',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-6 rounded-4xl bg-white px-4 py-4">
      {/* 상단 배너 */}
      <div className="w-full bg-white">
        {events && (
          <Banner
            images={events.count > 0 ? events.events.map((e) => e.image) : ['/images/puang-proud.png']}
            urls={events.count > 0 ? events.events.map((e) => e.url) : ['/home']}
            loop={events.count > 0}
          />
        )}
      </div>

      {/* 공통 콘텐츠: PC는 좌우, 모바일은 세로 */}
      <div className="flex w-full flex-col items-center gap-6 sm:grid sm:grid-cols-2 sm:rounded-md 2xl:gap-20 2xl:rounded-xl">
        {/* 바로가기 메뉴 */}
        <div className="text-lg font-bold sm:text-xl 2xl:rounded-2xl 2xl:bg-gray-50 2xl:p-4">
          <div className="grid grid-cols-2 gap-5 2xl:p-8">
            {boards.map((board) => (
              <Link
                key={board.name}
                href={board.href}
                className="relative aspect-square w-full rounded-2xl bg-white pt-6 pr-6 pl-4 shadow-[0_0px_4px_rgba(0,0,0,0.5)] hover:shadow-md md:rounded-4xl lg:p-10"
              >
                <span className="text-2xl leading-tight font-medium break-keep whitespace-normal text-black sm:text-2xl md:text-2xl 2xl:text-3xl">
                  {board.name}
                </span>

                {typeof board.icon === 'string' ? (
                  <Image
                    src={board.icon}
                    alt="icon"
                    width={64}
                    height={64}
                    className="absolute right-2 bottom-2 h-16 w-16 object-contain lg:right-6 lg:bottom-6 lg:h-16 lg:w-16"
                  />
                ) : (
                  <div className="absolute right-2 bottom-2 text-gray-600 lg:right-6 lg:bottom-6">{board.icon}</div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* 최신 공지 + 소통글 */}
        <div className="flex w-full flex-col gap-6">
          <NoticeSection
            boardId={noticeBoardId}
            title="최신 공지글"
            items={noticePosts}
            icon={<MdVolumeUp className="h-8 w-8 text-[#E55992]" />}
          />
          <NoticeSection
            boardId={talkBoardId}
            title="최신 소통글"
            items={talkPosts}
            icon={<MdTagFaces className="h-8 w-8 text-[#5E9B4D]" />}
          />
        </div>
      </div>
    </div>
  );
}

function NoticeSection({
  boardId,
  title,
  items,
  icon,
}: {
  boardId: string;
  title: string;
  items: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  icon: ReactNode;
}) {
  return (
    <div>
      <Link
        href={`/board/${boardId}`}
        className="flex items-center gap-[15px] border-b bg-gray-100 px-4 py-[13px] text-xl font-bold"
      >
        {icon}
        <span>{title}</span>
      </Link>
      <div className="overflow-hidden border-t border-gray-200">
        {items.length > 0 ? (
          items.map((post) => (
            <Link
              href={`/board/${boardId}/${post.id}`}
              key={post.id}
              className="flex items-center justify-between gap-10 border-b px-4 py-3 text-lg hover:bg-gray-50 lg:gap-24"
            >
              <div className="truncate font-medium sm:w-4xl">{post.title}</div>
              <div className="flex shrink-0 items-center gap-2 text-base text-gray-500">
                <span>
                  {new Date(post.createdAt).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="overflow-hidden border-t border-gray-200">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-4 py-3 text-lg text-gray-400">
                게시글이 없습니다.
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
