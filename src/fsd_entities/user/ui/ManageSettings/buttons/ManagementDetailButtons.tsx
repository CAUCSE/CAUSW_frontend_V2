'use client';

import { useState } from 'react';

import { Button } from '@/shared';
import { ManagementState } from '@/widget';

import { uiEntities } from '../../../config/AdmissionManagementDetailEntities';
import { WarningModal } from '../modal/WarningModal';

export function AdmissionManagementDetailButtons({
  state,
  admission,
}: {
  state: ManagementState;
  admission: Setting.GetAdmissionResponseDto;
}) {
  const buttons = uiEntities[state].buttons;
  const [isModalOpen, setIsModalOpen] = useState('');

  return (
    <div className="flex gap-[20px] lg:gap-[50px]">
      {buttons.map(({ name, action, variant }) => (
        <Button
          key={name}
          action={() => {
            if (name === '목록에서 삭제') {
              setIsModalOpen('DELETE');
            } else if (name === '추방') {
              setIsModalOpen('EXPEL');
            } else if (name === '거부') {
              setIsModalOpen('REJECT');
            } else {
              action(admission);
            }
          }}
          goBack
          variant={variant}
          className="h-[55px] w-[150px] lg:w-[300px]"
        >
          {name}
        </Button>
      ))}
      {isModalOpen !== '' && (
        <WarningModal
          isOpen={true}
          onClose={() => {
            setIsModalOpen('');
          }}
          admission={admission}
          type={isModalOpen}
        ></WarningModal>
      )}
    </div>
  );
}
