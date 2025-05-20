'use client';

import { useEffect, useState } from 'react';

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
import { UserService, useUserStore } from '@/shared';

const ceremonyTypeMap: Record<string, string> = {
  MARRIAGE: '결혼',
  FUNERNAL: '장례식',
  GRADUATION: '졸업',
  ETC: '기타',
};
export const CeremonyDetailPage = ({ ceremonyId }: Ceremony.CeremonyDetailPageProps) => {
  const { occasionDetails } = useCeremonyData(ceremonyId);
  const { getMe } = UserService();
  useEffect(() => {
    getMe();
  }, []);
  const name = useUserStore(state => state.name);
  const studentId = useUserStore(state => state.studentId);
  console.log('name', name, 'studentId ', studentId);
  console.log('occasionDetails', occasionDetails);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    router.back();
  };
  const ceremonyType = ceremonyTypeMap[occasionDetails.type];

  return (
    <>
      <div className="flex flex-col gap-3 pb-10 pt-8 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionSectionTitle title={MESSAGES.OCCASION.CATEGORY} occasionContent={ceremonyType} />
          <OccasionSectionTitle title={MESSAGES.OCCASION.REGISTRANT} occasionContent={`${name}/${studentId}`} />
        </div>
        <OccasionSectionTitle title={MESSAGES.OCCASION.DETAIL_CONTENTS} occasionContent={occasionDetails.content} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDateTile title={MESSAGES.OCCASION.START_DATE} date={occasionDetails.startDate} />
          <OccasionDateTile title={MESSAGES.OCCASION.END_DATE} date={occasionDetails.endDate} />
        </div>
        <OccasionImageTile imageList={occasionDetails.imageList} />
        {/* {occasionDetails.ceremonyState === 'AWAIT' && (
          <div className="flex justify-center">
            <div
              className="w-full max-w-[270px] rounded-md bg-[#d9d9d9] py-2 text-center text-xl font-semibold"
              onClick={handleClickReject}
            >
              {MESSAGES.OCCASION.CANCEL_REGIST}
            </div>
          </div>
        )} */}
      </div>
      {isModalOpen && <OccasionApprovalModal closeModal={closeModal} occasionTitle={occasionDetails.title} />}
    </>
  );
};
