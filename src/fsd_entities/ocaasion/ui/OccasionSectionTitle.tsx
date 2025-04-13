import { MESSAGES } from '@/fsd_shared';
import clsx from 'clsx';

export const OccasionSectionTitle = ({ title, occasionContent }: OccasionSectionTitleProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
    
<p className={clsx(title === MESSAGES.OCCASION.DETAIL_CONTENTS && 'rounded-2xl border border-[#d9d9d9] p-6', 'whitespace-pre-line break-keep text-xl font-medium')}>
        {occasionContent}
      </p>
    </div>
  );
};
