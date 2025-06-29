'use client';

import { useRouter } from 'next/navigation';

import { cancelCeremonyRegist } from '@/fsd_entities/ceremony';
import { useCeremonyData } from '@/fsd_entities/ceremony';
import { CeremonyDateTile, CeremonyImageTile, CeremonySectionTitle } from '@/fsd_entities/ceremony';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

const ceremonyTypeMap: Record<string, string> = {
  MARRIAGE: '결혼',
  FUNERAL: '장례식',
  GRADUATION: '졸업',
  ETC: '기타',
};
export const CeremonyDetailPage = ({ ceremonyId }: Ceremony.CeremonyDetailPageProps) => {
  const { occasionDetails } = useCeremonyData(ceremonyId);
  const router = useRouter();

  const ceremonyType = ceremonyTypeMap[occasionDetails.type];
  const handleClickReject = async () => {
    try {
      await cancelCeremonyRegist({
        ceremonyId: ceremonyId,
      });
      router.push('/ceremony/list');
    } catch (error) {
      throw new Error(ERROR_MESSAGES.CANCEL_REGITSTERED_CEREMONY);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3 pt-8 pb-10 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <CeremonySectionTitle title={MESSAGES.CEREMONY.CATEGORY} ceremonyContent={ceremonyType} />
          <CeremonySectionTitle
            title={MESSAGES.CEREMONY.REGISTRANT}
            ceremonyContent={`${occasionDetails.applicantName}/${occasionDetails.applicantStudentId}`}
          />
        </div>
        <CeremonySectionTitle title={MESSAGES.CEREMONY.DETAIL_CONTENTS} ceremonyContent={occasionDetails.content} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <CeremonyDateTile title={MESSAGES.CEREMONY.START_DATE} date={occasionDetails.startDate} />
          <CeremonyDateTile title={MESSAGES.CEREMONY.END_DATE} date={occasionDetails.endDate} />
        </div>
        <CeremonyImageTile imageList={occasionDetails.imageList} />
        {occasionDetails.register === 'AWAIT' && (
          <div className="fixed bottom-24 left-1/2 z-50 w-full max-w-[270px] -translate-x-1/2 rounded-md bg-[#d9d9d9] py-2 text-center text-xl font-semibold">
            <div onClick={handleClickReject}>{MESSAGES.CEREMONY.CANCEL_REGIST}</div>
          </div>
        )}
      </div>
    </>
  );
};
