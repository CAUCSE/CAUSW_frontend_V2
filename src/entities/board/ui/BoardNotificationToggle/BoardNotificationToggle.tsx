'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { BellRing } from 'lucide-react';
import { Check as CheckIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/shadcn/components/ui';

import {
  useActiveBoardNotification,
  useInActiveBoardNotification,
} from '../../model';

interface BoardNotificationToggleProps {
  isNotificationActive: boolean;
}

export const BoardNotificationToggle = ({
  isNotificationActive,
}: BoardNotificationToggleProps) => {
  const params = useParams();
  const { boardId } = params as { boardId: string };

  const [isActive, setIsActive] = useState<boolean>(isNotificationActive);

  const { mutate: activeBoardNotification } = useActiveBoardNotification();
  const { mutate: inactiveBoardNotification } = useInActiveBoardNotification();

  const handleClickNotificationToggle = () => {
    if (isActive) {
      inactiveBoardNotification(
        { boardId },
        {
          onSuccess: () => {
            setIsActive(false);
          },
          onError: () => {
            toast.error('게시판 알림 설정에 실패했습니다');
          },
        },
      );
      return;
    }
    activeBoardNotification(
      { boardId },
      {
        onSuccess: () => {
          setIsActive(true);
        },
        onError: () => {
          toast.error('게시판 알림 설정에 실패했습니다');
        },
      },
    );
  };

  return (
    <Button
      variant="neutral"
      className="h-7 rounded-md px-4 sm:h-10"
      onClick={handleClickNotificationToggle}
    >
      {isActive ? <CheckIcon /> : <BellRing />}
      <div className="text-[10px] font-medium sm:text-sm">
        {isActive ? '알림 받는 중' : '알림 받기'}
      </div>
    </Button>
  );
};
