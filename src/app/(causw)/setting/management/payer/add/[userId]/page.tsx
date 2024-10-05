"use client";

import {
  convertDataToTableEntity,
  titleMapping,
} from "@/entities/home/setting/management/AddPayerEntities";
import { Button, SettingRscService, UserRscService } from "@/shared";
import { ManagementDetailInfoTable } from "@/widget/ManagementDetailInfoTable";
import { useEffect, useState } from "react";

export default function AddPayerPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const { getUser } = UserRscService();
  const { addPayer } = SettingRscService();
  const [user, setUser] = useState<User.UserDto | null>(null);
  const [payNum, setPayNum] = useState<number | undefined>(8);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(userId);
        setUser(user);
      } catch {
        console.error("유저 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <div className="flex h-full w-full flex-col items-center gap-3 py-5">
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
                  if (e.target.value === "") return setPayNum(undefined);
                  setPayNum(+e.target.value);
                }}
              />
              차 학기 분
            </p>
          </div>
        }
      />
      <Button
        variant={payNum ? "BLUE" : "GRAY"}
        action={async () => {
          if (!payNum) return;
          try {
            const res = await addPayer(
              userId,
              user.currentCompletedSemester
                ? 8 - user.currentCompletedSemester
                : 1,
              payNum,
              false,
              0,
            );
            if (!res) throw new Error("납부자 추가 중 오류가 발생했습니다.");
          } catch {
            console.error("납부자 추가 중 오류가 발생했습니다.");
          }
          alert("납부자 추가가 완료되었습니다.");
        }}
        goBack
        disabled={!payNum}
        className="h-[55px] w-[150px] lg:w-[300px]"
      >
        저장
      </Button>
    </div>
  );
}
