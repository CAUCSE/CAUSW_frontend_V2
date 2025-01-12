"use client";

import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { PreviousButton } from "@/shared";

import { Modal } from "@/entities";

const TableUnit = ({
  title,
  data,
  setModalOn,
}: {
  title: string;
  data: string;
  setModalOn: Dispatch<SetStateAction<false | JSX.Element>>;
}) => {
  return (
    <div className="flex flex-col text-[14px] lg:text-[20px]">
      <p>{title}</p>
      {title === "학부 재적/졸업 증빙 자료" ||
      title === "가입 신청서 첨부 이미지" ? (
        data ? (
          <Image
            className={data === "" ? "invisible rounded-md" : "rounded-md"}
            src={data}
            alt={title}
            width={200}
            height={200}
            onClick={() =>
              setModalOn(
                <Image
                  className={data == "" ? "invisible rounded-md" : "rounded-md"}
                  src={data}
                  alt={title}
                  width={1000}
                  height={1000}
                />,
              )
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
  const [isModalOn, setModalOn] = useState<JSX.Element | false>(false);

  return (
    <>
      {isModalOn && (
        <Modal onClose={() => setModalOn(false)}>{isModalOn}</Modal>
      )}
      <div className="grid h-full grid-cols-2 justify-around gap-y-[27px] pt-4 font-semibold lg:w-[700px] lg:pt-8">
        <PreviousButton></PreviousButton>
        {Object.keys(data).map((k) => {
          const key = k as keyof typeof data;
          return (
            <TableUnit
              key={key}
              title={titleMapping[k]}
              data={data[key]}
              setModalOn={setModalOn}
            />
          );
        })}
        {additionalUnit}
      </div>
    </>
  );
}
