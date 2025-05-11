import Link from 'next/link';

import { Header, Line } from '@/fsd_shared';

interface OccasionNotificationProps {
  state: string | undefined;
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

export const OccasionNotification = ({ state, firstNavigation, navigation, data }: OccasionNotificationProps) => {
  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation) {
    isFirstNavigation = navigation.findIndex(element => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }

  return (
    <div>
      <div className="mb-[-18px] h-[86px] w-full overflow-x-auto scrollbar-hide md:mb-0 md:h-[70px]">
        <div
          className={`mt-8 flex justify-start gap-12 px-4 ${navigation && navigation.length > 5 ? 'mb-1 w-[1000px] justify-between' : navigation && navigation.length > 2 ? 'mb-1 w-[600px] justify-between' : 'mb-5 w-full justify-start'} flex-row md:mb-1 md:justify-start lg:w-full`}
        >
          <Link
            href={firstNavigation.state}
            className={`${isFirstNavigation ? 'border-b-4 border-b-focus' : ''} h-18 text-xl`}
          >
            {firstNavigation.name}
          </Link>
          {navigation
            ? navigation.map(element => (
                <Link
                  key={element.state}
                  href={element.state}
                  className={`${state === element.state ? 'border-b-4 border-b-focus' : ''} h-18 text-xl`}
                >
                  {element.name}
                </Link>
              ))
            : null}
        </div>
      </div>
      <Line />
      <div className="ml-2 mt-6 flex flex-col">
        {data.map(element => (
          <Link
            href={
              (isFirstNavigation
                ? firstNavigation.router
                : navigation!.find(element => element.state === state)?.router) +
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
