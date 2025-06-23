import { CouncilFeeManagementDetail } from '@/fsd_entities/user/ui';

import { SettingRscService } from '@/shared';

export default async function CouncilFeeDetailPage({ params }: { params: { councilFeeId: string } }) {
  const { councilFeeId } = params;
  const { getUserCouncilFeeInfo } = SettingRscService();
  let userCouncilFeeInfo: Setting.UserCouncilFeeInfoDTO | undefined;
  try {
    userCouncilFeeInfo = await getUserCouncilFeeInfo(councilFeeId);
  } catch (e) {}

  return (
    <div className="mb-4">
      <CouncilFeeManagementDetail councilFeeId={councilFeeId} />
    </div>
  );
}
