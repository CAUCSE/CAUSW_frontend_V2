import { ReactNode } from 'react';

import clsx from 'clsx';

export const CardBox = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={clsx(className, 'rounded-[15px] bg-white shadow-[0_10px_10px_0px_rgba(72,72,72,0.25)]')}>
      {children}
    </div>
  );
};