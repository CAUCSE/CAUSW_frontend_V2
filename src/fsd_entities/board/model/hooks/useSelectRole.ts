import { useShallow } from 'zustand/react/shallow';

import { useBoardCreationStore } from '../stores';

export const useSelectRole = () => {
  const { selectedRoleList, setSelectedRoleList } = useBoardCreationStore(
    useShallow(state => ({
      selectedRoleList: state.selectedRoleList,
      setSelectedRoleList: state.setSelectedRoleList,
    })),
  );

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

  return { selectedRoleList, handleToggleAll, handleToggleRole };
};
