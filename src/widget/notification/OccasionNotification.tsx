import Link from 'next/link';

import { Header, Line } from '@/entities';

interface OccasionNotificationProps {
  state: string | undefined;
  title: string;
  firstNavigation: {
    name: string;
    state: string;
    router: string;
  };
  navigation?: {
    name: string;
    state: string;
    router: string;
  }[];
  data: { occasionTitle: string; occasionId: string }[];
}

export const OccasionNotification = ({
  state,
  title,
  firstNavigation,
  navigation,
  data,
}: OccasionNotificationProps) => {
  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation) {
    isFirstNavigation = navigation.findIndex((element) => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <Link href="/setting" className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <Header bold big>
        {title}
      </Header>
      <div className="scrollbar-hide mb-[-18px] h-[86px] w-full overflow-x-auto md:mb-0 md:h-[70px]">
        <div
          className={`mt-8 flex justify-start gap-12 px-4 ${navigation && navigation.length > 5 ? 'mb-1 w-[1000px] justify-between' : navigation && navigation.length > 2 ? 'mb-1 w-[600px] justify-between' : 'mb-5 w-full justify-start'} flex-row md:mb-1 md:justify-start lg:w-full`}
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
              element.occasionId
            }
            className="mb-3 text-lg"
            key={element.occasionId}
          >
            {element.occasionTitle}
          </Link>
        ))}
      </div>
    </div>
  );
};
