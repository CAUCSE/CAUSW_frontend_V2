'use client';

import { useShallow } from 'zustand/react/shallow';

import CheckedIcon from '../../../../../public/icons/checked_icon.svg';
import NotCheckedIcon from '../../../../../public/icons/not_checked_icon.svg';
import { useBoardCreationStore } from '../../model';

export const AllowAnonymousToggle = () => {
  const { allowAnonymous, setAllowAnonymous } = useBoardCreationStore(
    useShallow((state) => ({
      allowAnonymous: state.allowAnonymous,
      setAllowAnonymous: state.setAllowAnonymous,
    })),
  );

  const toggleAllowAnonymous = () => {
    setAllowAnonymous(!allowAnonymous);
  };

  return (
    <div className="ml-2 flex items-center space-x-4 pt-4">
      <p className="text-base md:text-lg">익명 허용 여부</p>
      <span onClick={toggleAllowAnonymous} className="cursor-pointer">
        {allowAnonymous ? (
          <CheckedIcon width={18} height={18} />
        ) : (
          <NotCheckedIcon width={18} height={18} />
        )}
      </span>
    </div>
  );
};
