'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import clsx from 'clsx';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/shadcn/components/ui';

import { useActiveBoardNotification, useInActiveBoardNotification } from '../../model';

interface BoardNotificationToggleProps {
  isNotificationActive: boolean;
}

export const BoardNotificationToggle = ({ isNotificationActive }: BoardNotificationToggleProps) => {
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
      variant="outline"
      size="icon"
      className="h-8 w-10 cursor-pointer rounded-3xl border-[1px] border-black"
      onClick={handleClickNotificationToggle}
    >
      <Bell className={clsx(isActive ? 'text-red-500' : 'text-black')} />
    </Button>
  );
};
