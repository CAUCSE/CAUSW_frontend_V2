import { getUserCouncilFeeInfo } from '@/fsd_entities/user/api';
import { CouncilFeeManagementDetail } from '@/fsd_entities/user/ui';

export default async function CouncilFeeDetailPage({ params }: { params: { councilFeeId: string } }) {
  const { councilFeeId } = params;
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
