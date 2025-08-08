import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { EmptyBoard } from './EmptyBoard';
import { formatDateToYyyyMmDd } from '@/utils/format';

const boardStyles: Record<string, { icon: string }> = {
  '서비스 공지': {
    icon: '/icons/service_notice.svg',
  },
  '소프트웨어학부 학부 공지': {
    icon: '/icons/sw_notice.svg',
  },
  '학생회 공지 게시판': {
    icon: '/icons/alumni_notice.svg',
  },
  // '딜리버드' 인데 ESLint가 '딜리버드'를 인식하지 못하는 경우가 있음
  '딜리버드 게시판': {
    icon: '/icons/deliver_notice.svg',
  },
  '건의/오류 제보 게시판': {
    icon: '/icons/error_notice.svg',
  },
  '자유 게시판': {
    icon: '/icons/free_post.svg',
  },
  '크자회 공지 게시판': {
    icon: '/icons/cssaa_notice.svg',
  },
  '크자회 소통 게시판': {
    icon: '/icons/cssaa_post.svg',
  },
  // 기본값
  default: {
    icon: '/icons/free_post.svg',
  },
};

export const Board = ({ boardId, boardName, contents }: Board.BoardResponseDto) => {
  const style = boardStyles[boardName] ?? boardStyles.default;
  return (
    <div className="block w-full">
      <div className="min-h-[193.58px] rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
        {/* 헤더 */}
        <Link href={`/board/${boardId}`} className="flex items-center justify-between border-b-2 border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 lg:h-8 lg:w-8">
              <Image src={style.icon} alt="icon" width={37} height={37} className="h-full w-full object-contain" />
            </div>
            <h2 className="text-sm font-semibold">{boardName}</h2>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 lg:h-6 lg:w-6" />
        </Link>

        {/* 게시글 미리보기 */}
        <div className="mt-2 flex flex-col gap-2">
          {contents.length > 0 ? (
            contents.map((content) => (
              <Link
                href={`/board/${boardId}/${content.contentId}`}
                key={content.contentId}
                className="flex flex-col rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700"
              >
                <span className="truncate">{content.title}</span>
                <div className="text-xs text-gray-400">
                  {content.isAnonymous ? '익명' : content.writerNickname} ・{' '}
                  {formatDateToYyyyMmDd(content.createdAt)}
                </div>
              </Link>
            ))
          ) : (
            <EmptyBoard />
          )}
        </div>
      </div>
    </div>
  );
};
