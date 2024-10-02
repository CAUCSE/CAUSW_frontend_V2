"use client";

import {
  managementDetailEntities,
  ManagementDetailInfoTable,
} from "@/entities/home/setting/management";
import { Button } from "@/shared";
import { ManagementState } from "./Management";

interface ManagementDetailProp {
  // userData:
  state: ManagementState;
}

export function ManagementDetail({ state }: ManagementDetailProp) {
  const entities = managementDetailEntities[state];
  const { titleSuffix, buttons } = entities;

  const userName = "홍길동";
  const studentId = "20201234";

  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] px-2 py-4">
      <p className="text-[40px] font-semibold">{`${userName}(${studentId})의 ${titleSuffix}`}</p>
      <ManagementDetailInfoTable />
      <div className="flex gap-[50px]">
        {buttons.map(({ name, action, variant }) => (
          <Button
            key={name}
            action={action}
            variant={variant}
            className="h-[55px] w-[300px]"
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
