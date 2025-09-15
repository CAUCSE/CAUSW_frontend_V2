/**
 * CouncilFeeManagementDetail.tsx
 * - "환경설정"-"관리"-"학생회비 납부자 관리"-유저 선택
 */
import dynamic from 'next/dynamic';

import { getUserCouncilFeeInfo } from '../../api';
import { convertDataToTableEntity, titleMapping } from '../../config/CouncilFeeManagementDetailEntities';

const CouncilFeeButtons = dynamic(() => import('./buttons').then((mod) => mod.CouncilFeeButtons), {
  ssr: false,
});
const ManagementDetailInfoTable = dynamic(
  () => import('./ManagementDetailInfoTable').then((mod) => mod.ManagementDetailInfoTable),
  {
    ssr: false,
  },
);

export async function CouncilFeeManagementDetail({ councilFeeId }: { councilFeeId: string }) {
  let userCouncilFeeInfo: Setting.UserCouncilFeeInfoDTO | undefined;
  try {
    userCouncilFeeInfo = await getUserCouncilFeeInfo(councilFeeId);
  } catch (e) {}
  const isRefunded = userCouncilFeeInfo?.isRefunded;

  if (!userCouncilFeeInfo) return <div>가입 신청서 조회 실패</div>;

  return (
    <div className="flex w-full flex-col items-center gap-[30px] px-2 py-4">
      <p className="text-[18px] font-semibold lg:text-[40px]">
        {`${userCouncilFeeInfo.userName}${userCouncilFeeInfo.studentId ? `(${userCouncilFeeInfo.studentId})` : ''}의 정보`}
      </p>
      <ManagementDetailInfoTable data={convertDataToTableEntity(userCouncilFeeInfo)} titleMapping={titleMapping} />
      <CouncilFeeButtons params={{ councilFeeId, isRefunded }}></CouncilFeeButtons>
    </div>
  );
}
