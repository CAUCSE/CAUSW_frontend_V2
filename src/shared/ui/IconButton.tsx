import { Icon } from './icon';

export const IconButton = ({ iconName, callback }: { iconName: any; callback: any }) => (
  <button
    className="flex h-6 w-8 items-center justify-center rounded-3xl border border-black sm:h-8 sm:w-10"
    type="button"
    onClick={callback}
  >
    <Icon iconName={iconName} />
  </button>
);
