import { ReactNode } from 'react';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';
import {
  MdBuild,
  MdCardTravel,
  MdDeliveryDining,
  MdFeedback,
  MdNewspaper,
  MdTagFaces,
  MdVolumeUp,
  MdWysiwyg,
} from 'react-icons/md';

import { formatDateToYyyyMmDd } from '@/utils/format';

import { EmptyBoard } from './EmptyBoard';

const boardStyles: Record<string, { icon: ReactNode }> = {
  '서비스 공지': {
    icon: <MdBuild className="h-6 w-6 rounded-sm bg-[#F8F0E2] p-1 text-[#97845D] lg:h-8 lg:w-8" />,
  },
  '소프트웨어학부 학부 공지': {
    icon: <MdNewspaper className="h-6 w-6 rounded-sm bg-[#E8F9E1] p-1 text-[#759962] lg:h-8 lg:w-8" />,
  },
  '학생회 공지 게시판': {
    icon: <MdVolumeUp className="h-6 w-6 rounded-sm bg-[#FDE7ED] p-1 text-[#E55992] lg:h-8 lg:w-8" />,
  },
  // '딜리버드' 인데 ESLint가 '딜리버드'를 인식하지 못하는 경우가 있음
  '딜리버드 게시판': {
    icon: <MdDeliveryDining className="h-6 w-6 rounded-sm bg-[#F9E6E1] p-1 text-[#E17051] lg:h-8 lg:w-8" />,
  },
  '건의/오류 제보 게시판': {
    icon: <MdFeedback className="h-6 w-6 rounded-sm bg-[#F6EEFC] p-1 text-[#BC61E2] lg:h-8 lg:w-8" />,
  },
  '자유 게시판': {
    icon: <MdWysiwyg className="h-6 w-6 rounded-sm bg-[#E1F4F9] p-1 text-[#568389] lg:h-8 lg:w-8" />,
  },
  '크자회 공지 게시판': {
    icon: <MdCardTravel className="h-6 w-6 rounded-sm bg-[#DBF4F8] p-1 text-[#7AB6C1] lg:h-8 lg:w-8" />,
  },
  '크자회 소통 게시판': {
    icon: <MdTagFaces className="h-6 w-6 rounded-sm bg-[#DDEAD6] p-1 text-[#5E9B4D] lg:h-8 lg:w-8" />,
  },
  // 기본값
  default: {
    icon: <MdWysiwyg className="h-6 w-6 rounded-sm bg-[#E1F4F9] p-1 text-[#568389] lg:h-8 lg:w-8" />,
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
            <div className="h-6 w-6 lg:h-8 lg:w-8">{style.icon}</div>
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
                  {content.displayWriterNickname
                    ? content.displayWriterNickname
                    : content.isAnonymous
                      ? '익명'
                      : content.writerNickname}{' '}
                  ・ {formatDateToYyyyMmDd(content.createdAt)}
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
