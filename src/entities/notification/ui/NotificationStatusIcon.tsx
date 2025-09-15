import NotificationUnreadIcon from '../../../../public/icons/envelope_icon.svg';
import NotificationReadIcon from '../../../../public/icons/envelope_open_icon.svg';

interface NotificationStatusIconProps {
  read: boolean;
}

export const NotificationStatusIcon = ({ read }: NotificationStatusIconProps) => {
  return read ? <NotificationReadIcon /> : <NotificationUnreadIcon />;
};
