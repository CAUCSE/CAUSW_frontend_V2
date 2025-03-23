import { SettingRscService } from "@/shared";
import { convertDataToTableEntity } from "@/_deprecated/entities/home/setting/management/CouncilFeeManagementDetailEntities";
import CouncilFeeDetail from "@/_deprecated/widget/CouncilFeeManagementDetail";
export default async function CouncilFeeDetailPage({
  params,
}: {
  params: { councilFeeId: string };
}) {
  const { councilFeeId } = params;
  const { getUserCouncilFeeInfo } = SettingRscService();
  let userCouncilFeeInfo: Setting.UserCouncilFeeInfoDTO | undefined;
  try {
    userCouncilFeeInfo = await getUserCouncilFeeInfo(councilFeeId);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="mb-4">
      <CouncilFeeDetail councilFeeId={councilFeeId}></CouncilFeeDetail>
      <></>
    </div>
  );
}
