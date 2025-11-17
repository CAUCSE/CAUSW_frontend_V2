import clsx from 'clsx';

import { MESSAGES } from '@/shared';

export const CeremonySectionTitle = ({
  title,
  ceremonyContent,
}: Ceremony.CeremonySectionTitleProps) => {
  return (
    <div
      className={clsx(
        title === MESSAGES.CEREMONY.DETAIL_CONTENTS
          ? 'flex flex-col gap-y-2'
          : 'grid grid-cols-[auto_1fr] gap-x-2 md:block md:gap-y-2',
      )}
    >
      <h1 className="min-w-[120px] text-lg font-semibold md:text-2xl">
        {title}
      </h1>

      <p
        className={clsx(
          'text-xl font-medium break-all whitespace-pre-line text-[#888888] md:text-[#000000]',
          title === MESSAGES.CEREMONY.DETAIL_CONTENTS
            ? 'rounded-2xl border border-[#000000] p-6 md:border-[#d9d9d9]'
            : 'border-b border-[#000000] md:border-none',
        )}
      >
        {ceremonyContent}
      </p>
    </div>
  );
};
