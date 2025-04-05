'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  OccasionApproveModal,
  OccasionContent,
  OccasionDate,
  OccasionDetail,
  OccasionImage,
  OccasionManageButton,
} from '@/entities';
import { Modal } from '@/shared';

interface OccasionManagementDetailProp {
  occasionId: string;
}

export const OccasionManagementDetail = ({ occasionId }: OccasionManagementDetailProp) => {
  // TODO: 경조사 정보를 불러오는 API 연동
  // TODO: 경조사 승인, 거절 API 연동

  const occasionTitle = '홍길동 결혼식';
  const occasionType = '결혼';
  const occasionRegister = '홍길동';
  const occasionContent = `홍길동 님의 결혼식에 초대합니다.
  
  일시: 2023년 12월 25일 오후 3시
  장소: 서울특별시 강남구 청담동 123-45, 청담웨딩홀 3층
  
  안녕하세요, 여러분.
  저희 홍길동과 이영희가 결혼식을 올리게 되었습니다.
  서로의 사랑을 약속하고 새로운 출발을 하는 이 자리에
  여러분을 초대하고 싶습니다.
  
  저희의 결혼식에 참석하셔서 자리를 빛내주시고,
  축복해 주시면 감사하겠습니다.
  
  감사합니다.
  홍길동 & 이영희 드림
  `;

  const startDate = '2023-12-25';
  const endDate = '2023-12-25';

  const imageList = [
    '/images/puang-proud.png',
    '/images/puang-proud.png',
    '/images/puang-proud.png',
    '/images/puang-proud.png',
    '/images/puang-proud.png',
    '/images/puang-proud.png',
    '/images/puang-proud.png',
    '/images/puang-proud.png',
  ];

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
          <OccasionDetail title="경조사 분류" description={occasionType} />
          <OccasionDetail title="등록인" description={occasionRegister} />
        </div>
        <OccasionContent title="경조사 내용" occasionContent={occasionContent} />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDate title="시작 날짜" date={startDate} />
          <OccasionDate title="종료 날짜" date={endDate} />
        </div>
        <OccasionImage imageList={imageList} />
        <div className="flex justify-center gap-5 pt-4 md:pt-0 lg:gap-11">
          <OccasionManageButton color="BLUE" onClick={handleClickApprove} text="승인" />
          <OccasionManageButton color="GRAY" onClick={handleClickReject} text="거부" />
        </div>
      </div>
      {isModalOpen && <OccasionApproveModal closeModal={closeModal} occasionTitle={occasionTitle} />}
    </>
  );
};
