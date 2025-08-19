'use client';

/** ManagementDetailInfoTable.tsx
 * - "환경설정"-"관리"-"학생회비 납부자 유저"-"납부자 추가"
 * - AdmissionManagementDetail, CouncilFeeManagementDetail에서 활용
 */
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const ImageModal = dynamic(() => import('@/fsd_shared').then((mod) => mod.ImageModal), {
  ssr: false,
});

const TableUnit = ({
  title,
  data,
  setSelectedImage,
}: {
  title: string;
  data: string;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <div className="flex flex-col px-2 text-[14px] lg:text-[20px]">
      <p>{title}</p>
      {title === '학부 재적/졸업 증빙 자료' || title === '가입 신청서 첨부 이미지' ? (
        data ? (
          <Image
            className={data === '' ? 'invisible rounded-md' : 'mt-8 mb-8 rounded-md'}
            src={data}
            alt={title}
            width={200}
            height={200}
            onClick={() => setSelectedImage(data)}
          />
        ) : (
          <p className="h-[200px] text-[rgba(180,177,177,1)] max-lg:text-[14px]"> -</p>
        )
      ) : (
        <p className="text-[rgba(180,177,177,1)] max-lg:text-[14px]">{data}</p>
      )}
    </div>
  );
};

export function ManagementDetailInfoTable({
  data,
  titleMapping,
  additionalUnit,
}: {
  data: { [key: string]: string };
  titleMapping: { [key: string]: string };
  additionalUnit?: ReactNode;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
      <div className="grid h-full grid-cols-2 justify-around gap-y-[27px] pt-4 font-semibold lg:w-[700px] lg:pt-8">
        {Object.keys(data)
          .filter((key) => key in titleMapping)
          .map((k) => {
            const key = k as keyof typeof data;
            return <TableUnit key={key} title={titleMapping[k]} data={data[key]} setSelectedImage={setSelectedImage} />;
          })}
        {additionalUnit}
      </div>
    </>
  );
}
