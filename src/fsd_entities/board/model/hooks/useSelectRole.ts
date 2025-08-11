'use client';

import { useShallow } from 'zustand/react/shallow';
import { useBoardCreationStore } from '../stores';
import { ROLE_CHECKBOX_GROUPS, ROLE_LABELS } from '@/fsd_shared/configs';

const getAllRoles = (): User.Role[] => {
  const rolesFromGroups = Object.values(ROLE_CHECKBOX_GROUPS).flat();
  const rolesFromLabels = Object.keys(ROLE_LABELS).filter(
    (role) => role !== 'NONE'
  ) as User.Role[];
  return Array.from(new Set([...rolesFromGroups, ...rolesFromLabels]));
};

const ALL_ROLES = getAllRoles();

export const useSelectRole = () => {
  const { selectedRoleList, setSelectedRoleList } = useBoardCreationStore(
    useShallow((state) => ({
      selectedRoleList: state.selectedRoleList,
      setSelectedRoleList: state.setSelectedRoleList,
    })),
  );

  const handleToggleAll = () => {
    if (selectedRoleList.includes('ALL')) {
      setSelectedRoleList([]);
    } else {
      setSelectedRoleList(['ALL']);
    }
  };

  const handleToggleRole = (rolesToToggle: User.Role[]) => {
    const currentSelected = selectedRoleList.filter((r) => r !== 'ALL');
    const isGroupAlreadySelected = rolesToToggle.every((role) =>
      currentSelected.includes(role),
    );

    if (isGroupAlreadySelected) {
      const updatedList = currentSelected.filter(
        (role) => !rolesToToggle.includes(role as User.Role),
      );
      setSelectedRoleList(updatedList);
    } else {
      const updatedList = Array.from(
        new Set([...currentSelected, ...rolesToToggle]),
      );
      setSelectedRoleList(updatedList as (User.Role | 'ALL')[]);
    }
  };

  const getRealSelectedRoles = (): User.Role[] => {
    if (selectedRoleList.includes('ALL')) {
      return ALL_ROLES;
    }
    return selectedRoleList as User.Role[];
  };

  return { selectedRoleList, handleToggleAll, handleToggleRole, getRealSelectedRoles };
};
