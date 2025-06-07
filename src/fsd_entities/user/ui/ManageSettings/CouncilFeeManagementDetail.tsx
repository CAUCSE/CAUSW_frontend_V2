import { getUserCouncilFeeInfo } from '../../api/get';
import { convertDataToTableEntity, titleMapping } from '../../config/CouncilFeeManagementDetailEntities';
import { CouncilFeeButtons } from './buttons';
import { ManagementDetailInfoTable } from './ManagementDetailInfoTable';

export async function CouncilFeeDetail({ councilFeeId }: { councilFeeId: string }) {
  let userCouncilFeeInfo: Setting.UserCouncilFeeInfoDTO | undefined;
  try {
    userCouncilFeeInfo = await getUserCouncilFeeInfo(councilFeeId);
  } catch (e) {}
  const isRefunded = userCouncilFeeInfo?.isRefunded;

  if (!userCouncilFeeInfo) return <div>가입 신청서 조회 실패</div>;

  return (
    <div className="flex w-full flex-col items-center gap-[30px] px-2 py-4">
      <p className="text-[18px] font-semibold lg:text-[40px]">{`${userCouncilFeeInfo.userName}(${userCouncilFeeInfo.studentId})의 정보`}</p>
      <ManagementDetailInfoTable data={convertDataToTableEntity(userCouncilFeeInfo)} titleMapping={titleMapping} />
      <CouncilFeeButtons params={{ councilFeeId, isRefunded }}></CouncilFeeButtons>
    </div>
  );
}
