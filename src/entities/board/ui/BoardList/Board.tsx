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

import { formatDateToYyyyMmDd } from '@/shared';

import { EmptyBoard } from './EmptyBoard';

const sectionStyles =
  'h-[235.13px] rounded-xl bg-white p-4 shadow-sm transition-all duration-200 ease-out ' +
  'hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0';

const underlineStyles =
  'relative px-1 py-1 bg-no-repeat bg-left-bottom ' +
  'bg-gradient-to-r from-gray-400 to-gray-400 bg-[length:0%_2px] ' +
  'transition-[background-size,color] duration-200 ease-out ' +
  'hover:bg-[length:100%_2px] hover:text-gray-800 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ' +
  'motion-reduce:transition-none';

const itemStyles =
  'rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 ' +
  'transition-all duration-150 ease-out hover:bg-white hover:shadow-sm hover:-translate-y-0.5 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

const boardStyles: Record<string, { icon: ReactNode }> = {
  '서비스 공지': {
    icon: <MdBuild className="h-9 w-9 rounded-sm bg-[#F8F0E2] p-1 text-[#97845D]" />,
  },
  '소프트웨어학부 학부 공지': {
    icon: <MdNewspaper className="h-9 w-9 rounded-sm bg-[#E8F9E1] p-1 text-[#759962]" />,
  },
  '학생회 공지 게시판': {
    icon: <MdVolumeUp className="h-9 w-9 rounded-sm bg-[#FDE7ED] p-1 text-[#E55992]" />,
  },
  '딜리버드 게시판': {
    icon: <MdDeliveryDining className="h-9 w-9 rounded-sm bg-[#F9E6E1] p-1 text-[#E17051]" />,
  },
  '건의/오류 제보 게시판': {
    icon: <MdFeedback className="h-9 w-9 rounded-sm bg-[#F6EEFC] p-1 text-[#BC61E2]" />,
  },
  '자유 게시판': {
    icon: <MdWysiwyg className="h-9 w-9 rounded-sm bg-[#E1F4F9] p-1 text-[#568389]" />,
  },
  '크자회 공지 게시판': {
    icon: <MdCardTravel className="h-9 w-9 rounded-sm bg-[#DBF4F8] p-1 text-[#7AB6C1]" />,
  },
  '크자회 소통 게시판': {
    icon: <MdTagFaces className="h-9 w-9 rounded-sm bg-[#DDEAD6] p-1 text-[#5E9B4D]" />,
  },
  default: {
    icon: <MdWysiwyg className="h-9 w-9 rounded-sm bg-[#E1F4F9] p-1 text-[#568389]" />,
  },
};

export const Board = ({ boardId, boardName, contents }: Board.BoardResponseDto) => {
  const style = boardStyles[boardName] ?? boardStyles.default;

  return (
    <div className="block w-full">
      <div className={sectionStyles}>
        <Link
          href={`/board/${boardId}`}
          className="group flex items-center justify-between border-b-2 border-gray-200 pb-2"
        >
          <div className="flex items-center gap-2">
            <div className="h-9 w-9">{style.icon}</div>
            <h2 className={`text-2xl font-semibold text-gray-700 ${underlineStyles}`}>{boardName}</h2>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 lg:h-6 lg:w-6" />
        </Link>

        <div className="mt-2 flex flex-col gap-2">
          {contents.length > 0 ? (
            contents.map((content) => (
              <Link
                href={`/board/${boardId}/${content.contentId}`}
                key={content.contentId}
                className={itemStyles}
                title={content.title}
              >
                <span className="block w-full truncate text-xl font-medium">{content.title}</span>
                <div className="text-base text-gray-400">
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
