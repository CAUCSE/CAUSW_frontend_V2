'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { getCeremonyAwaitList, getCeremonyDetail } from '@/fsd_entities/ocaasion/api/get';
import { updateCeremonyState } from '@/fsd_entities/ocaasion/api/post';
import {
  OccasionApprovalButton,
  OccasionApprovalModal,
  OccasionDateTile,
  OccasionImageTile,
  OccasionSectionTitle,
} from '@/fsd_entities/ocaasion/ui';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared/configs/constants';

export const OccasionDetailPage = ({ occasionId }: OccasionDetailPageProps) => {
  const [occasionTitle, setOccasionTitle] = useState('');
  const [occasionType, setOccasionType] = useState('');
  const [occasionRegister, setOccasionRegister] = useState('');
  const [occasionContent, setOccasionContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  useEffect(() => {
    const fetchCeremonyList = async () => {
      try {
        const OccasionContent = await getCeremonyDetail(occasionId);
        setOccasionTitle(OccasionContent.description);
        setOccasionType(OccasionContent.category);
        setOccasionRegister(OccasionContent.ceremonyState);
        setOccasionContent(OccasionContent.description);
        setStartDate(OccasionContent.startDate);
        setEndDate(OccasionContent.endDate);
        setImageList(OccasionContent.attachedImageUrlList);
      } catch (error) {
        throw new Error(`${MESSAGES.OCCASION.DETAIL_CONTENT_TITLE} - ${ERROR_MESSAGES.DETAIL_CONTENT_FETCH_FAIL}`);
      }
    };

    fetchCeremonyList();
  }, []);
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await getCeremonyAwaitList(0, 10);
        const matchedOccasion = res.filter(item => item.id === occasionId);
        setOccasionTitle(matchedOccasion[0].title);
      } catch (err) {
        throw new Error(`${MESSAGES.OCCASION.TITLE} - ${ERROR_MESSAGES.MATCH_DATA_FETCH_FAIL}`);
      }
    };

    fetchTitles();
  }, []);
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
      throw new Error(ERROR_MESSAGES.REGISTRATION_APPROVAL_FAIL);
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
      <div className="flex flex-col gap-3 pb-10 pt-8 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionSectionTitle title={MESSAGES.OCCASION.CATEGORY} occasionContent={occasionType} />
          <OccasionSectionTitle title={MESSAGES.OCCASION.REGISTRANT} occasionContent={occasionRegister} />
        </div>
        <OccasionSectionTitle title={MESSAGES.OCCASION.DETAIL_CONTENTS} occasionContent={occasionContent} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDateTile title={MESSAGES.OCCASION.START_DATE} date={startDate} />
          <OccasionDateTile title={MESSAGES.OCCASION.END_DATE} date={endDate} />
        </div>
        <OccasionImageTile imageList={imageList} />
        <div className="flex justify-center gap-5 pt-4 md:pt-0 lg:gap-11">
          <OccasionApprovalButton color="BLUE" onClick={handleClickApprove} text={MESSAGES.OCCASION.APPROVAL} />
          <OccasionApprovalButton color="GRAY" onClick={handleClickReject} text={MESSAGES.OCCASION.REJECTION} />
        </div>
      </div>
      {isModalOpen && <OccasionApprovalModal closeModal={closeModal} occasionTitle={occasionTitle} />}
    </>
  );
};
