import Link from 'next/link';

import MenuIcon from '../../../../public/icons/menu.svg';
import AddIcon from '../../../../public/icons/plus_icon.svg';
import SettingIcon from '../../../../public/icons/setting.svg';

export const NotificationActionButtons = () => {
  return (
    <div className="flex flex-1 flex-row items-center justify-end gap-x-1">
      <Link href={`ceremony/create`}>
        <AddIcon />
      </Link>
      <Link href={`ceremony/list`}>
        <MenuIcon />
      </Link>
      <Link href={`ceremony/my`}>
        <SettingIcon />
      </Link>
    </div>
  );
};
