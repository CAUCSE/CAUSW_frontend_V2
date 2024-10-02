import {
  ManagementDetailButtons,
  managementDetailEntities,
  ManagementDetailInfoTable,
} from "@/entities/home/setting/management";
import { ManagementState } from "./Management";

interface ManagementDetailProp {
  // userData:
  state: ManagementState;
}

export function ManagementDetail({ state }: ManagementDetailProp) {
  const entities = managementDetailEntities[state];
  const { titleSuffix } = entities;

  const userName = "홍길동";
  const studentId = "20201234";

  return (
    <div className="flex w-full flex-col items-center gap-[30px] px-2 py-4">
      <p className="text-[18px] font-semibold lg:text-[40px]">{`${userName}(${studentId})의 ${titleSuffix}`}</p>
      <ManagementDetailInfoTable />
      <ManagementDetailButtons state={state} />
    </div>
  );
}
