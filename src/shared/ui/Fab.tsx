import Link from 'next/link';

import { Plus } from 'lucide-react';

interface FabProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export const Fab = ({ href, icon = <Plus />, label }: FabProps) => {
  const fabStyles =
    'group fixed right-6 bottom-24 xl:right-80 xl:bottom-10 h-16 w-16 xl:h-24 xl:w-24 ' +
    'rounded-[50px] bg-[#7AB6C1] text-white text-3xl font-normal shadow-lg ' +
    'transition-all duration-200 ease-out will-change-transform ' +
    ' hover:shadow-xl hover:bg-[#6AA3AD] active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7AB6C1] ' +
    'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

  return (
    <Link href={href} aria-label={label}>
      <button type="button" title={label} className={fabStyles}>
        <span
          aria-hidden
          className="flex items-center justify-center duration-200 group-hover:scale-110"
        >
          {icon}
        </span>
      </button>
    </Link>
  );
};
