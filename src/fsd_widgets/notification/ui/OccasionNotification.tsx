import Link from 'next/link';

import { Line } from '@/entities';

interface OccasionNotificationProps {
  name: string;
  state: string;
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

export const OccasionNotification = ({ name, state, firstNavigation, navigation, data }: OccasionNotificationProps) => {
  return (
    <div>
      <div className="mb-[-18px] h-[86px] w-full overflow-x-auto scrollbar-hide md:mb-0 md:h-[70px]">
        <div
          className={`mb-5 mt-8 flex w-full flex-row items-end justify-center gap-12 px-4 md:mb-1 md:justify-center lg:w-full`}
        >
          <Link href={`setting/notification/${state}`} className={`h-18 text-xl`}>
            {name}
          </Link>
        </div>
        {state === 'occasion' && <div>dddsdfsdd</div>}
      </div>
      <Line />
      <div className="ml-2 mt-6 flex flex-col">
        {data.map(element => (
          <Link
            href={`/setting/notification/${state}/` + element.occasionId}
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
