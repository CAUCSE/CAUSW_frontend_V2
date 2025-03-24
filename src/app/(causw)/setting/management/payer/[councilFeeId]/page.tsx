import { SettingRscService } from "@/shared";
import { convertDataToTableEntity } from "@/entities/home/setting/management/CouncilFeeManagementDetailEntities";
import CouncilFeeDetail from "@/widget/CouncilFeeManagementDetail";
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
    ;
  }

return (
  
    <div className = "mb-4">
      <CouncilFeeDetail councilFeeId ={councilFeeId}></CouncilFeeDetail>
      <></>
    </div>
  );
}
