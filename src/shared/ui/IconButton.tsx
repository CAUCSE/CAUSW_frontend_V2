import { Icon } from './icon';

const iconPath = {
  like: '/like_icon.png',
  scrap: '/scrap_icon.png',
  comment: '/comment_icon.png',
  vote_active: '/vote_active_icon.png',
  vote_inactive: '/vote_inactive_icon.png',
  apply_active: '/apply_active_icon.png',
  apply_inactive: '/apply_inactive_icon.png',
  add: '/add_icon.png',
  alarm_active: '/alarm_active_icon.png',
  alarm_inactive: '/alarm_inactive_icon.png',
  search: '/search_icon.png',
  remove: '/remove_icon.png',
};

export const IconButton = ({
  iconName,
  callback,
}: {
  iconName: keyof typeof iconPath;
  callback: () => void;
}) => (
  <button
    className="flex h-6 w-8 items-center justify-center rounded-3xl border border-black sm:h-8 sm:w-10"
    type="button"
    onClick={callback}
  >
    <Icon iconName={iconName} />
  </button>
);
