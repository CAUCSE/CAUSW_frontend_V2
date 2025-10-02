'use client';

import { useShallow } from 'zustand/react/shallow';

import CheckedIcon from '../../../../../public/icons/checked_icon.svg';
import NotCheckedIcon from '../../../../../public/icons/not_checked_icon.svg';
import { useBoardCreationStore } from '../../model';

export const AllowAlumniToggle = () => {
  const { isAlumni, setIsAlumni } = useBoardCreationStore(
    useShallow((state) => ({
      isAlumni: state.isAlumni,
      setIsAlumni: state.setIsAlumni,
    })),
  );

  const toggleAllowAlumni = () => {
    setIsAlumni(!isAlumni);
  };

  return (
    <div className="ml-2 flex items-center space-x-4 pt-4">
      <p className="text-base md:text-lg">크자회 허용 여부</p>
      <span onClick={toggleAllowAlumni} className="cursor-pointer">
        {isAlumni ? (
          <CheckedIcon width={18} height={18} />
        ) : (
          <NotCheckedIcon width={18} height={18} />
        )}
      </span>
    </div>
  );
};
