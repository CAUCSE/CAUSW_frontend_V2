'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { getUser } from '@/fsd_entities/user/api';
import { addPayer } from '@/fsd_entities/user/api';
import { convertDataToTableEntity, titleMapping } from '@/fsd_entities/user/config/AddPayerEntities';
import { ManagementDetailInfoTable } from '@/fsd_entities/user/ui';

import { Button } from '@/fsd_shared';

export default function AddPayerPage({ params: { userId } }: { params: { userId: string } }) {
  const [user, setUser] = useState<User.UserDto | null>(null);
  const [payNum, setPayNum] = useState<number | undefined>(8);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(userId);
        setUser(user);
      } catch {}
    };

    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <div className="flex h-full flex-col items-center gap-3 py-10">
      <strong className="text-3xl">{user.name} 학부 정보</strong>
      <ManagementDetailInfoTable
        data={convertDataToTableEntity(user)}
        titleMapping={titleMapping}
        additionalUnit={
          <div className="flex flex-col text-[14px] lg:text-[20px]">
            <p>학생회비 납부 차수</p>
            <p>
              <input
                className="w-5 border-b bg-transparent text-center"
                type="number"
                value={payNum}
                onChange={(e) => {
                  if (e.target.value === '') return setPayNum(undefined);
                  setPayNum(+e.target.value);
                }}
              />
              차 학기 분
            </p>
          </div>
        }
      />
      <Button
        variant={payNum ? 'BLUE' : 'GRAY'}
        action={async () => {
          if (!payNum) return;
          if (user.currentCompletedSemester === null || user.currentCompletedSemester === undefined) {
            toast.error('등록 완료 학기 정보가 없어 학생회비 납부자 등록이 불가합니다.');
            return;
          }
          try {
            const res = await addPayer(userId, 8 - user.currentCompletedSemester, payNum, false, 0);
            if (!res) {
              toast.error('납부자 추가 중 오류가 발생했습니다.');
              // throw new Error("납부자 추가 중 오류가 발생했습니다.");
            } else {
              toast.success('납부자 추가가 완료되었습니다.');
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            toast.error(errorMessage);
          }
        }}
        goBack
        disabled={!payNum}
        className="h-[55px] w-[150px] text-white lg:w-[300px]"
      >
        납부자로 추가
      </Button>
    </div>
  );
}
