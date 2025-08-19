'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useCeremonyData } from '@/fsd_entities/ceremony';
import {
  CeremonyApprovalButton,
  CeremonyApprovalModal,
  CeremonyDateTile,
  CeremonySectionTitle,
} from '@/fsd_entities/ceremony';
import { useAdminUpdateCeremony } from '@/fsd_entities/ceremony/model/useAdminUpdateCeremony';

import { CommonImageList, MESSAGES } from '@/fsd_shared';

import { ceremonyTypeMap } from '../config';
import { NotificationYearListBox } from './NotificationYearListBox';

export const AdminCeremonyDetail = ({ ceremonyId, context }: Ceremony.CeremonyDetailPageProps) => {
  const ceremonyDetails = useCeremonyData({ ceremonyId, context });
  const ceremonyType = ceremonyTypeMap[ceremonyDetails.type];

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    router.back();
  };

  const { mutate: updateCeremony } = useAdminUpdateCeremony({ setIsModalOpen });

  const handleClickApprove = async () => {
    updateCeremony({ ceremonyId, targetCeremonyState: 'ACCEPT' });
  };
  const handleClickReject = async () => {
    updateCeremony({ ceremonyId, targetCeremonyState: 'REJECT' });
  };

  return (
    <>
      {isModalOpen && <CeremonyApprovalModal closeModal={closeModal} ceremonyTitle={ceremonyDetails.title} />}

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

        <h1 className="text-lg font-medium md:text-2xl">{MESSAGES.NOTIFICATION.YEAR_LIST}</h1>
        <NotificationYearListBox years={ceremonyDetails.targetAdmissionYears} isSetAll={ceremonyDetails.isSetAll} />

        <CommonImageList images={ceremonyDetails.imageList} />

        <div className="fixed bottom-20 left-0 z-10 flex w-full justify-center gap-5 md:pt-0 lg:gap-11 xl:left-auto xl:w-[calc(100%-29rem)]">
          <CeremonyApprovalButton color="BLUE" onClick={handleClickApprove} text={MESSAGES.CEREMONY.APPROVAL} />
          <CeremonyApprovalButton color="GRAY" onClick={handleClickReject} text={MESSAGES.CEREMONY.REJECTION} />
        </div>
      </div>
    </>
  );
};
