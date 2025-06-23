'use server';

import Link from 'next/link';

import { Header, Line, PaginationButtons } from '@/fsd_shared';

import { ExcelExportButton } from './buttons';

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

export const Management = ({
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
      {exportType ? <ExcelExportButton exportType={exportType} id={circleId} /> : null}
      <Header bold big>
        {title}
      </Header>
      <div className="scrollbar-hide mb-[-18px] h-[86px] w-full overflow-x-auto md:mb-0 md:h-[70px]">
        <div
          className={`mt-8 flex ${navigation && navigation.length > 5 ? 'mb-1 w-[1000px] justify-between' : navigation && navigation.length > 2 ? 'mb-1 w-[600px] justify-between' : 'mb-5 w-full justify-evenly'} flex-row md:mb-1 md:justify-evenly lg:w-full`}
        >
          <Link
            href={firstNavigation.state}
            className={`${isFirstNavigation ? 'border-b-focus border-b-4' : ''} h-18 text-xl`}
          >
            {firstNavigation.name}
          </Link>
          {navigation
            ? navigation.map((element) => (
                <Link
                  key={element.state}
                  href={element.state}
                  className={`${state === element.state ? 'border-b-focus border-b-4' : ''} h-18 text-xl`}
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
                : navigation!.find((element) => element.state === state)?.router) +
              '/' +
              element.id
            }
            className="mb-3 text-lg"
            key={element.userName}
          >
            {state === 'admission' || state === 'reject' ? (
              <>{element.userName}</>
            ) : (
              <>
                {element.userName}({element.studentId})
              </>
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
