import {
  ManagementDetailButtons,
  managementDetailEntities,
  ManagementDetailInfoTable,
} from "@/entities/home/setting/management";
import {
  convertDataToTableEntity,
  titleMapping,
} from "@/entities/home/setting/management/AdmissionManagementDetailEntities";
import { SettingRscService } from "@/shared";
import { ManagementState } from "./Management";

interface ManagementDetailProp {
  state: ManagementState;
  userId: string;
}

export async function ManagementDetail({
  state,
  userId,
}: ManagementDetailProp) {
  const entities = managementDetailEntities[state];
  const { titleSuffix } = entities;
  const { getAdmission } = SettingRscService();

  let admission;
  try {
    admission = await getAdmission(userId);
  } catch {
    console.error("가입 신청서 조회 실패");
  }

  if (!admission) return <div>가입 신청서 조회 실패</div>;

  const { user } = admission;
  const { name, studentId } = user;
  const admissionStringData = convertDataToTableEntity(admission);

  return (
    <div className="flex w-full flex-col items-center gap-[30px] px-2 py-4">
      <p className="text-[18px] font-semibold lg:text-[40px]">{`${name}(${studentId})의 ${titleSuffix}`}</p>
      <ManagementDetailInfoTable
        data={admissionStringData}
        titleMapping={titleMapping}
      />
      <ManagementDetailButtons state={state} admission={admission} />
    </div>
  );
}
