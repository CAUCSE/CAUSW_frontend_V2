import Link from 'next/link';

import MenuIcon from '../../../../public/icons/menu.svg';
import AddIcon from '../../../../public/icons/plus_icon.svg';
import SettingIcon from '../../../../public/icons/setting.svg';

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
    <div className="mt-8">
      <div className="flex w-full justify-center border-b-[3px] border-[#BABABA] pb-2">
        <div className="flex-1" />
        <div className="flex flex-1 justify-center">
          <Link href={`setting/notification/${state}`} className="h-18 text-xl">
            {name}
          </Link>
        </div>
        {state === 'occasion' && (
          <div className="flex flex-1 flex-row items-center justify-end gap-x-1">
            <Link href={`setting/notification/${state}`}>
              <AddIcon />
            </Link>
            <Link href={`setting/notification/${state}`}>
              <MenuIcon />
            </Link>
            <Link href={`setting/notification/${state}`}>
              <SettingIcon />
            </Link>
          </div>
        )}
      </div>

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
