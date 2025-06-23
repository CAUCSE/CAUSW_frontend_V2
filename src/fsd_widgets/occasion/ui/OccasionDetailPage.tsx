'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { updateCeremonyState } from '@/fsd_entities/ocaasion';
import { useCeremonyData } from '@/fsd_entities/ocaasion';
import {
  OccasionApprovalButton,
  OccasionApprovalModal,
  OccasionDateTile,
  OccasionImageTile,
  OccasionSectionTitle,
} from '@/fsd_entities/ocaasion';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

export const OccasionDetailPage = ({ occasionId }: Occasion.OccasionDetailPageProps) => {
  const { occasionDetails } = useCeremonyData(occasionId);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    router.back();
  };

  const handleClickApprove = async () => {
    try {
      await updateCeremonyState({
        ceremonyId: occasionId,
        targetCeremonyState: 'ACCEPT',
      });
      setIsModalOpen(true);
    } catch (error) {
      toast.error(ERROR_MESSAGES.REGISTRATION_APPROVAL_FAIL);
    }
  };
  const handleClickReject = async () => {
    try {
      await updateCeremonyState({
        ceremonyId: occasionId,
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
          <OccasionSectionTitle title={MESSAGES.OCCASION.CATEGORY} occasionContent={occasionDetails.type} />
          <OccasionSectionTitle
            title={MESSAGES.OCCASION.REGISTRANT}
            occasionContent={`${occasionDetails.applicantName}/${occasionDetails.applicantStudentId}`}
          />
        </div>
        <OccasionSectionTitle title={MESSAGES.OCCASION.DETAIL_CONTENTS} occasionContent={occasionDetails.content} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDateTile title={MESSAGES.OCCASION.START_DATE} date={occasionDetails.startDate} />
          <OccasionDateTile title={MESSAGES.OCCASION.END_DATE} date={occasionDetails.endDate} />
        </div>
        <OccasionImageTile imageList={occasionDetails.imageList} />
        <div className="fixed bottom-20 left-0 z-50 flex w-full justify-center gap-5 md:pt-0 lg:gap-11 xl:left-auto xl:w-[calc(100%-29rem)]">
          <OccasionApprovalButton color="BLUE" onClick={handleClickApprove} text={MESSAGES.OCCASION.APPROVAL} />
          <OccasionApprovalButton color="GRAY" onClick={handleClickReject} text={MESSAGES.OCCASION.REJECTION} />
        </div>
      </div>
      {isModalOpen && <OccasionApprovalModal closeModal={closeModal} occasionTitle={occasionDetails.title} />}
    </>
  );
};
