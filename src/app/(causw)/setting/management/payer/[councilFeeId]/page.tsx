import { SettingRscService } from "@/shared";

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
    <div className="whitespace-pre-wrap">
      {JSON.stringify(userCouncilFeeInfo).replace(/,/g, ",\n")}
    </div>
  );
}
