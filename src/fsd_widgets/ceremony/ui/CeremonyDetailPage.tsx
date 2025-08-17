'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  cancelCeremonyRegist,
  CeremonyDateTile,
  CeremonySectionTitle,
  useCancelCeremony,
  useCeremonyData,
} from '@/fsd_entities/ceremony';

import { CommonImageList, ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { ceremonyTypeMap } from '../config';
import { NotificationYearListBox } from './NotificationYearListBox';

export const CeremonyDetailPage = ({ ceremonyId, context }: Ceremony.CeremonyDetailPageProps) => {
  const ceremonyDetails = useCeremonyData({ ceremonyId, context });
  const router = useRouter();

  const ceremonyType = ceremonyTypeMap[ceremonyDetails.type];

  const { mutate: rejectCeremony } = useCancelCeremony();
  const handleClickReject = async () => {
    rejectCeremony({ ceremonyId });
  };
  return (
    <>
      <div className="flex flex-col gap-3 pt-8 pb-10 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <CeremonySectionTitle title={MESSAGES.CEREMONY.CATEGORY} ceremonyContent={ceremonyType} />
          <CeremonySectionTitle
            title={MESSAGES.CEREMONY.REGISTRANT}
            ceremonyContent={`${ceremonyDetails.applicantName}${ceremonyDetails.applicantStudentId ? `/${ceremonyDetails.applicantStudentId}` : ''}`}
          />
        </div>
        <CeremonySectionTitle title={MESSAGES.CEREMONY.DETAIL_CONTENTS} ceremonyContent={ceremonyDetails.content} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <CeremonyDateTile title={MESSAGES.CEREMONY.START_DATE} date={ceremonyDetails.startDate} />
          <CeremonyDateTile title={MESSAGES.CEREMONY.END_DATE} date={ceremonyDetails.endDate} />
        </div>
        {context !== 'general' && (
          <>
            <h1 className="text-lg font-medium md:text-2xl">{MESSAGES.NOTIFICATION.YEAR_LIST}</h1>
            <NotificationYearListBox years={ceremonyDetails.targetAdmissionYears} isSetAll={ceremonyDetails.isSetAll} />
          </>
        )}

        <CommonImageList images={ceremonyDetails.imageList} />
        {ceremonyDetails.register === 'AWAIT' && (
          <div className="fixed bottom-24 left-1/2 z-50 w-full max-w-[270px] -translate-x-1/2 rounded-md bg-[#d9d9d9] py-2 text-center text-xl font-semibold">
            <div onClick={handleClickReject}>{MESSAGES.CEREMONY.CANCEL_REGIST}</div>
          </div>
        )}
      </div>
    </>
  );
};
