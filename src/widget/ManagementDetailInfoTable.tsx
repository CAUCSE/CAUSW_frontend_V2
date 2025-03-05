"use client";

import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ImageModal, PreviousButton } from "@/shared";

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
    <div className="flex flex-col text-[14px] lg:text-[20px]">
      <p>{title}</p>
      {title === "학부 재적/졸업 증빙 자료" ||
      title === "가입 신청서 첨부 이미지" ? (
        data ? (
          <Image
            className={data === "" ? "invisible rounded-md" : "rounded-md mt-8 mb-8"}
            src={data}
            alt={title}
            width={200}
            height={200}
            onClick={() =>
              setSelectedImage(data)
            }
          />
        ) : (
          <p className="h-[200px] text-[rgba(180,177,177,1)] max-lg:text-[14px]">
            첨부된 이미지가 없습니다.
          </p>
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
        <PreviousButton></PreviousButton>
        {Object.keys(data).filter((key) => key in titleMapping).map((k) => {
          const key = k as keyof typeof data;
          return (
            <TableUnit
              key={key}
              title={titleMapping[k]}
              data={data[key]}
              setSelectedImage={setSelectedImage}
            />
          );
        })}
        {additionalUnit}
      </div>
    </>
  );
}
