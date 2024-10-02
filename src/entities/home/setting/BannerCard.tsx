"use client";

import Link from "next/link";
import { CardBox } from "../card/CardBox";

export const BannerCard = ({
  url,
  imgSrc,
  bannerId,
  date,
}: {
  url: string;
  imgSrc: string;
  bannerId: string;
  date: string;
}) => {
  return (
    <Link href={`./event/${bannerId}?bannerImg=${imgSrc}`}>
      <CardBox className="flex h-[240px] w-full flex-col gap-[17px] rounded-2xl p-[14px]">
        <img
          src={imgSrc}
          alt="banner"
          className="h-[141px] w-full object-cover"
        />
        <div className="flex justify-between">
          <p>{url}</p>
          <div className="flex items-end gap-[18px]">
            <p className="text-[15px] text-[#B4B1B1]">{date}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                confirm("정말 삭제하시겠습니까?") && alert("삭제되었습니다.");
              }}
              className="z-10"
            >
              <i className="icon-[fa6-regular--trash-can] h-[50px] w-[50px]" />
            </button>
          </div>
        </div>
      </CardBox>
    </Link>
  );
};
