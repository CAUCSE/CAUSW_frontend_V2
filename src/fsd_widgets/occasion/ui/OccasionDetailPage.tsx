'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { getCeremonyDetail } from '@/fsd_entities/ocaasion/api/get';
import {
  OccasionApprovalButton,
  OccasionApprovalModal,
  OccasionDateTile,
  OccasionImageTile,
  OccasionSectionTitle,
} from '@/fsd_entities/ocaasion/ui';

import { ERROR_MESSAGES } from '@/fsd_shared/configs/constants';

interface OccasionDetailPageProp {
  occasionId: string;
}

export const OccasionDetailPage = ({ occasionId }: OccasionDetailPageProp) => {
  // TODO: 경조사 승인, 거절 API 연동
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
        console.log('OccasionContent', OccasionContent);
        setOccasionTitle(OccasionContent.description);
        setOccasionType(OccasionContent.category);
        setOccasionRegister(OccasionContent.ceremonyState);
        setOccasionContent(OccasionContent.description);
        setStartDate(OccasionContent.startDate);
        setEndDate(OccasionContent.endDate);
        setImageList(OccasionContent.attachedImageUrlList);
      } catch (error) {
        // throw new Error(ERROR_MESSAGES.OCCASION_LIST_FETCH_FAIL);
        console.log(error);
      }
    };

    fetchCeremonyList();
  }, []);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    router.back();
  };

  const handleClickApprove = () => {
    setIsModalOpen(true);
  };

  const handleClickReject = () => {
    router.back();
  };

  return (
    <>
      <div className="flex flex-col gap-3 pb-10 pt-8 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionSectionTitle title="경조사 분류" occasionContent={occasionType} />
          <OccasionSectionTitle title="등록인" occasionContent={occasionRegister} />
        </div>
        <OccasionSectionTitle title="경조사 내용" occasionContent={occasionContent} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDateTile title="시작 날짜" date={startDate} />
          <OccasionDateTile title="종료 날짜" date={endDate} />
        </div>
        <OccasionImageTile imageList={imageList} />
        <div className="flex justify-center gap-5 pt-4 md:pt-0 lg:gap-11">
          <OccasionApprovalButton color="BLUE" onClick={handleClickApprove} text="승인" />
          <OccasionApprovalButton color="GRAY" onClick={handleClickReject} text="거부" />
        </div>
      </div>
      {isModalOpen && <OccasionApprovalModal closeModal={closeModal} occasionTitle={occasionTitle} />}
    </>
  );
};
