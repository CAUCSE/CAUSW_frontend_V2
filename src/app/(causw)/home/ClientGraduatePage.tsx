'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Banner } from '@/entities/home';

const boards = [
  { name: '크자회 공지 게시판', icon: '/homeicons/크자회_공지_게시판.svg', href: '/notice' }, // 크자회 공지 게시판 경로 수정 예정
  { name: '소통 게시판', icon: '/homeicons/크자회_소통_게시판.svg', href: '/talk' }, // 소통 게시판 경로 수정 예정
  { name: '동문수첩', icon: '/homeicons/동문수첩.svg', href: '/directory' }, // 동문수첩 경로 수정 예정
  { name: '경조사', icon: '/homeicons/경조사.svg', href: '/ceremony/create' },
];

const notices = [
  { title: '최신 공지글의 제목', author: '관리자', date: '05.27' },
  { title: '최신 공지글의 제목이 좀길어도 이건 데스크탑이니까 그냥 여기까진...', author: '관리자', date: '05.27' },
  { title: '최신 공지글의 제목', author: '관리자', date: '05.27' },
  { title: '최신 공지글의 제목', author: '관리자', date: '05.27' },
];

const talks = [
  { title: '최신 소통글의 제목', author: '관리자', date: '05.27' },
  { title: '최신 글의 제목이 좀길어도 이건 데스크탑이니까 그냥 여기까진...', author: '관리자', date: '05.27' },
  { title: '최신 글의 제목', author: '관리자', date: '05.27' },
  { title: '최신 글의 제목', author: '관리자', date: '05.27' },
];

export default function GraduateHomePage({ events }) {
  return (
    <div className="flex w-full flex-col justify-center gap-4 bg-white px-4 py-4 2xl:h-full 2xl:rounded-4xl">
      {/* 상단 배너 */}
      <div className="w-full bg-white p-4">
        {events && (
          <Banner
            images={events.count > 0 ? events.events.map((e) => e.image) : ['/images/puang-proud.png']}
            urls={events.count > 0 ? events.events.map((e) => e.url) : ['/home']}
            loop={events.count > 0}
          />
        )}
      </div>

      {/* 공통 콘텐츠: PC는 좌우, 모바일은 세로 */}
      <div className="flex w-full flex-col items-center gap-6 p-4 sm:grid sm:grid-cols-2 sm:rounded-md 2xl:gap-20 2xl:rounded-xl">
        {/* 바로가기 메뉴 */}
        <div className="mb-4 text-lg font-bold sm:text-xl 2xl:rounded-2xl 2xl:bg-gray-50 2xl:p-4">
          <div className="grid grid-cols-2 gap-5 2xl:p-8">
            {boards.map((board) => (
              <Link
                key={board.name}
                href={board.href}
                className="relative aspect-square w-full rounded-2xl bg-white p-6 shadow-sm hover:shadow-md md:rounded-4xl"
              >
                <span className="text-sm leading-tight font-semibold break-keep whitespace-normal text-black sm:text-base md:text-lg 2xl:text-xl">
                  {board.name}
                </span>
                <Image
                  src={board.icon}
                  alt="icon"
                  width={40}
                  height={40}
                  className="absolute right-4 bottom-4 h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-14 md:w-14 2xl:h-20 2xl:w-20"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* 최신 공지 + 소통글 */}
        <div className="flex w-full flex-col gap-6">
          <NoticeSection title="최신 공지글" items={notices} icon="/homeicons/크자회_공지_게시판.svg" />
          <NoticeSection title="최신 소통글" items={talks} icon="/homeicons/크자회_소통_게시판.svg" />
        </div>
      </div>
    </div>
  );
}

function NoticeSection({ title, items, icon }: { title: string; items: any[]; icon: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 border-b bg-gray-100 px-4 py-2 text-sm font-bold sm:text-base">
        <Image src={icon} alt="icon" width={20} height={20} />
        <span>{title}</span>
      </div>
      <div className="overflow-hidden border-t border-gray-200">
        {items.map((post, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b px-4 py-3 text-sm hover:bg-gray-50 sm:text-base"
          >
            <div className="w-3/5 truncate font-medium sm:w-4xl">{post.title}</div>
            <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
