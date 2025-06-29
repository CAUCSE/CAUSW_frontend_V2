'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { updateAdminCeremonyState } from '@/fsd_entities/ceremony';
import { useCeremonyData } from '@/fsd_entities/ceremony';
import {
  CeremonyApprovalButton,
  CeremonyApprovalModal,
  CeremonyDateTile,
  CeremonyImageTile,
  CeremonySectionTitle,
} from '@/fsd_entities/ceremony';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

export const AdminCeremonyDetail = ({ ceremonyId }: Ceremony.CeremonyDetailPageProps) => {
  const { ceremonyDetails } = useCeremonyData(ceremonyId);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    router.back();
  };

  const handleClickApprove = async () => {
    try {
      await updateAdminCeremonyState({
        ceremonyId,
        targetCeremonyState: 'ACCEPT',
      });
      setIsModalOpen(true);
    } catch (error) {
      toast.error(ERROR_MESSAGES.REGISTRATION_APPROVAL_FAIL);
    }
  };
  const handleClickReject = async () => {
    try {
      await updateAdminCeremonyState({
        ceremonyId,
        targetCeremonyState: 'REJECT',
      });
      router.back();
    } catch (error) {
      throw new Error(ERROR_MESSAGES.RERISTRATION_REJECT_MESSAGE);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 pt-8 pb-10 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <CeremonySectionTitle title={MESSAGES.CEREMONY.CATEGORY} ceremonyContent={ceremonyDetails.type} />
          <CeremonySectionTitle
            title={MESSAGES.CEREMONY.REGISTRANT}
            ceremonyContent={`${ceremonyDetails.applicantName}/${ceremonyDetails.applicantStudentId}`}
          />
        </div>
        <CeremonySectionTitle title={MESSAGES.CEREMONY.DETAIL_CONTENTS} ceremonyContent={ceremonyDetails.content} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <CeremonyDateTile title={MESSAGES.CEREMONY.START_DATE} date={ceremonyDetails.startDate} />
          <CeremonyDateTile title={MESSAGES.CEREMONY.END_DATE} date={ceremonyDetails.endDate} />
        </div>
        <CeremonyImageTile imageList={ceremonyDetails.imageList} />
        <div className="fixed bottom-20 left-0 z-10 flex w-full justify-center gap-5 md:pt-0 lg:gap-11 xl:left-auto xl:w-[calc(100%-29rem)]">
          <CeremonyApprovalButton color="BLUE" onClick={handleClickApprove} text={MESSAGES.CEREMONY.APPROVAL} />
          <CeremonyApprovalButton color="GRAY" onClick={handleClickReject} text={MESSAGES.CEREMONY.REJECTION} />
        </div>
      </div>
      {isModalOpen && <CeremonyApprovalModal closeModal={closeModal} ceremonyTitle={ceremonyDetails.title} />}
    </>
  );
};
