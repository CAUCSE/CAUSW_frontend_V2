import Link from 'next/link';

import MenuIcon from '../../../../public/icons/menu.svg';
import AddIcon from '../../../../public/icons/plus_icon.svg';
import SettingIcon from '../../../../public/icons/setting.svg';

interface HeaderProps {
  name: string;
  state: string;
}
export const OccasionNotificationHeader = ({ name, state }: HeaderProps) => {
  return (
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
  );
};
