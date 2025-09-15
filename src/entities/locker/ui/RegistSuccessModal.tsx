import { LOCKER_CONSTANT, Modal } from '@/shared';

import { useGetLockerLocations } from '../api';

export const RegistSuccessModal = ({ onClose }: Locker.RegistSuccessModalProps) => {
  const { data: lockerLocations } = useGetLockerLocations();
  const { floor } = LOCKER_CONSTANT();

  return (
    <Modal closeModal={onClose}>
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-8 text-xl font-bold md:text-2xl">사물함 신청 완료</h1>
        <p className="text-lg break-keep md:text-xl">선택하신 사물함이 신청되었습니다.</p>
        <p className="text-md mb-8 break-keep text-gray-500">
          내 사물함 위치 :{' '}
          {lockerLocations?.myLocker
            ? `${floor[lockerLocations.myLocker.lockerNumber.split(' ')[0]]} ${lockerLocations.myLocker.lockerNumber.split(' ')[1]}번`
            : '없음'}
        </p>
      </div>
    </Modal>
  );
};
