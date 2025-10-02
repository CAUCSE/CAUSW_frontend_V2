'use server';

/**
 * Management.tsx
 * - "환경설정"-"관리" 이하
 * - 유저 리스트 및 내부 네비게이션 바 포함
 */
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { MESSAGES } from '@/shared';

const ExcelExportButton = dynamic(
  () => import('./buttons').then((mod) => mod.ExcelExportButton),
  {
    ssr: false,
  },
);
const PaginationButtons = dynamic(
  () => import('@/shared').then((mod) => mod.PaginationButtons),
  {
    ssr: false,
  },
);
const Line = dynamic(() => import('@/shared').then((mod) => mod.Line), {
  ssr: false,
});
const Header = dynamic(() => import('@/shared').then((mod) => mod.Header), {
  ssr: false,
});

interface Prop {
  state: string | undefined;
  title: string;
  firstNavigation: {
    name: string;
    state: string;
    router: string;
    exportType?: Setting.ExportType;
  };
  navigation?: {
    name: string;
    state: string;
    router: string;
    exportType?: Setting.ExportType;
  }[];
  data: { userName: string; studentId: string; id: string }[];
  circleId?: string;
  totalPages?: number;
  currentPage?: number;
}

export const ManagementPanel = ({
  state,
  title,
  firstNavigation,
  navigation,
  data,
  circleId,
  totalPages,
  currentPage,
}: Prop) => {
  const isFirstNavigation = !state
    ? true
    : navigation
      ? navigation.findIndex((elemenent) => elemenent.state === state) === -1
      : false;

  const exportType = isFirstNavigation
    ? firstNavigation.exportType
    : navigation?.find((element) => element.state === state)?.exportType;

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <Link href="/setting" className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <Header bold big>
          {title}
        </Header>
        <div className="mt-4 flex flex-row justify-end gap-4 sm:mt-0">
          {title === MESSAGES.MANAGEMENT.PAYERS && (
            <Link
              href="/setting/management/payer/add"
              className="bg-focus flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black text-lg text-white"
            >
              납부자 추가
            </Link>
          )}
          {title === MESSAGES.MANAGEMENT.ATTENDANCE && (
            <div className="flex h-10 w-48 items-center justify-center rounded-2xl border-2 border-black text-lg">
              재학 인증 일괄 요청
            </div>
          )}
          {exportType ? (
            <ExcelExportButton exportType={exportType} id={circleId} />
          ) : null}
        </div>
      </div>

      <div className="scrollbar-hide mt-3 mb-[-18px] w-full overflow-x-auto md:mb-0">
        <div
          className={`flex ${navigation && navigation.length > 5 ? 'mb-5 w-[1000px] justify-between' : navigation && navigation.length > 2 ? 'mb-5 w-[600px] justify-between' : 'mb-5 w-full justify-evenly'} flex-row md:mb-1 md:justify-evenly lg:w-full`}
        >
          <Link
            href={firstNavigation.state}
            className={`${isFirstNavigation ? 'border-b-focus border-b-4' : ''} h-8 text-xl`}
          >
            {firstNavigation.name}
          </Link>
          {navigation
            ? navigation.map((element) => (
                <Link
                  key={element.state}
                  href={element.state}
                  className={`${state === element.state ? 'border-b-focus border-b-4' : ''} h-8 text-xl`}
                >
                  {element.name}
                </Link>
              ))
            : null}
        </div>
      </div>
      <Line />
      <div className="mt-6 ml-2 flex flex-col">
        {data.map((element) => (
          <Link
            href={
              (isFirstNavigation
                ? firstNavigation.router
                : navigation!.find((element) => element.state === state)
                    ?.router) +
              '/' +
              element.id
            }
            className="mb-3 text-lg"
            key={element.userName}
          >
            {state === 'admission' || state === 'reject' ? (
              <>{element.userName}</>
            ) : (
              <>{element.userName}</>
            )}
          </Link>
        ))}
      </div>
      {!!totalPages && !!currentPage && totalPages > 0 && currentPage > 0 && (
        <PaginationButtons
          key={currentPage}
          totalPages={totalPages}
          currentPage={currentPage}
          baseUrl={`/setting/management/user/${state}`}
        />
      )}
    </div>
  );
};
