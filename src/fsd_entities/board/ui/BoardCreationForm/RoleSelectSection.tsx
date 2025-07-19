'use client';

import { roles, useAuthHandler } from '@/fsd_shared';

import CheckedIcon from '../../../../../public/icons/checked_icon.svg';
import NonCheckedIcon from '../../../../../public/icons/not_checked_icon.svg';
import { useSelectRole } from '../../model';

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckBox = ({ isChecked, onClick }: CheckBoxProps) => {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {isChecked ? <CheckedIcon width={18} height={18} /> : <NonCheckedIcon width={18} height={18} />}
    </span>
  );
};

export const RoleSelectSection = () => {
  const { hasAuth } = useAuthHandler();
  const { selectedRoleList, handleToggleAll, handleToggleRole } = useSelectRole();
  return (
    <div className="my-2">
      <h1 className="mb-2 text-2xl xl:mb-4 xl:text-2xl">게시글 작성 권한 명단</h1>
      {hasAuth ? (
        <div className="text-md bg-notice-board-role rounded-2xl p-4 xl:text-lg">
          <div className="mb-2 flex items-center space-x-3">
            <CheckBox isChecked={selectedRoleList.includes('ALL')} onClick={handleToggleAll} />
            <span>상관없음</span>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Object.entries(roles).map(([roleLabel, roleEnums]) => (
              <div key={roleLabel} className="flex items-center space-x-3">
                <CheckBox
                  isChecked={selectedRoleList.includes(roleEnums[0])}
                  onClick={() => handleToggleRole(roleEnums[0])}
                />
                <span>{roleLabel}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-normal-board-role rounded-2xl p-4">
          <div className="mb-2 flex items-center space-x-3">
            <CheckedIcon width={18} height={18} color="#808080" />
            <span>상관없음</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(roles).map(([roleLabel]) => (
              <div key={roleLabel} className="flex items-center space-x-3">
                <NonCheckedIcon width={18} height={18} color="#808080" />
                <span>{roleLabel}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
