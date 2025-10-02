'use client';

import { ROLE_CHECKBOX_GROUPS } from '@/shared/configs';

import { useAuthHandler } from '@/shared';

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
      {isChecked ? (
        <CheckedIcon width={18} height={18} />
      ) : (
        <NonCheckedIcon width={18} height={18} />
      )}
    </span>
  );
};

export const RoleSelectSection = () => {
  const { hasAuth } = useAuthHandler();
  const { selectedRoleList, handleToggleAll, handleToggleRole } =
    useSelectRole();

  return (
    <div className="my-2">
      <h1 className="mb-2 text-2xl xl:mb-4 xl:text-2xl">
        게시글 작성 권한 명단
      </h1>
      {hasAuth ? (
        <div className="text-md bg-notice-board-role rounded-2xl p-4 xl:text-lg">
          <div className="mb-2 flex items-center space-x-3">
            <CheckBox
              isChecked={selectedRoleList.includes('ALL')}
              onClick={handleToggleAll}
            />
            <span>상관없음</span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Object.entries(ROLE_CHECKBOX_GROUPS).map(([label, roles]) => (
              <div key={label} className="flex items-center space-x-3">
                <CheckBox
                  isChecked={roles.every((role) =>
                    selectedRoleList.includes(role),
                  )}
                  onClick={() => handleToggleRole(roles)}
                />
                <span>{label}</span>
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
            {Object.keys(ROLE_CHECKBOX_GROUPS).map((label) => (
              <div key={label} className="flex items-center space-x-3">
                <NonCheckedIcon width={18} height={18} color="#808080" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
