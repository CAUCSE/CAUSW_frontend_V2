import Link from 'next/link';

import NotificationUnreadIcon from '../../../../public/icons/envelope_icon.svg';
import NotificationReadIcon from '../../../../public/icons/envelope_open_icon.svg';
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
const read = true;

const NotificationStatusIcon = ({ read }: { read: boolean }) =>
  read ? <NotificationReadIcon /> : <NotificationUnreadIcon />;
export const OccasionNotification = ({ name, state, firstNavigation, navigation, data }: OccasionNotificationProps) => {
  return (
    <div className="mt-8">
      <div className="mb-5 flex w-full justify-center border-b-[3px] border-[#BABABA] pb-2">
        {state === 'occasion' && <div className="flex-1" />}
        <div className="flex flex-1 justify-center text-2xl font-medium">
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

      <div className="flex flex-col gap-2 rounded-md bg-[#D9D9D9] px-8 py-3">
        {data.map(element => (
          <div className="rounded-md bg-white p-3" key={element.occasionId}>
            <Link
              href={`/setting/notification/${state}/` + element.occasionId}
              className="mb-3 text-lg"
              key={element.occasionId}
            >
              <div className="flex flex-row items-center gap-2">
                <NotificationStatusIcon read={read} />

                <div>
                  <div className="text-[22px] text-xl font-semibold">{element.occasionTitle}</div>
                  <div className="text-lg font-medium">{element.occasionTitle}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
