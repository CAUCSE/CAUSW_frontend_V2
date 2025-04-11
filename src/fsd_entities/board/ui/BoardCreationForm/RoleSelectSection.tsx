'use client';

import { useShallow } from 'zustand/react/shallow';

import { roles } from '@/fsd_shared';
import { useUserStore } from '@/shared';

import CheckedIcon from '../../../../../public/icons/checked_icon.svg';
import NonCheckedIcon from '../../../../../public/icons/not_checked_icon.svg';
import { useBoardCreationStore } from '../../model';

export const RoleSelectSection = () => {
  const { selectedRoleList, setSelectedRoleList } = useBoardCreationStore(
    useShallow(state => ({
      selectedRoleList: state.selectedRoleList,
      setSelectedRoleList: state.setSelectedRoleList,
    })),
  );
  const userRoles = useUserStore(state => state.roles);
  const hasAuth =
    userRoles.includes('ADMIN') || userRoles.includes('PRESIDENT') || userRoles.includes('VICE_PRESIDENT');

  const handleToggleAll = () => {
    if (selectedRoleList.includes('ALL')) {
      setSelectedRoleList([]);
      return;
    }

    setSelectedRoleList(['ALL']);
  };

  const handleToggleRole = (role: User.Role) => {
    const newSelectedRoleList = selectedRoleList.filter(r => r !== 'ALL');
    if (newSelectedRoleList.includes(role)) {
      setSelectedRoleList(newSelectedRoleList.filter(r => r !== role));
      return;
    }
    if (selectedRoleList.length === 7) {
      handleToggleAll();
      return;
    }
    setSelectedRoleList([...newSelectedRoleList, role]);
  };

  return (
    <div className="my-2">
      <h1 className="mb-2 text-2xl xl:mb-4 xl:text-2xl">게시글 작성 권한 명단</h1>
      {hasAuth ? (
        <div className="text-md rounded-2xl bg-notice-board-role p-4 xl:text-lg">
          <div className="mb-2 flex items-center space-x-3">
            <span onClick={handleToggleAll} className="cursor-pointer">
              {selectedRoleList.includes('ALL') ? (
                <CheckedIcon width={18} height={18} />
              ) : (
                <NonCheckedIcon width={18} height={18} />
              )}
            </span>
            <span>상관없음</span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Object.entries(roles).map(([roleLabel, roleEnums]) => (
              <div key={roleLabel} className="flex items-center space-x-3">
                <span onClick={() => handleToggleRole(roleEnums[0])} className="cursor-pointer">
                  {selectedRoleList.includes(roleEnums[0]) ? (
                    <CheckedIcon width={18} height={18} />
                  ) : (
                    <NonCheckedIcon width={18} height={18} />
                  )}
                </span>
                <span>{roleLabel}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-normal-board-role p-4">
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
