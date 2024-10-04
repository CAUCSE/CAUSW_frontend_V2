"use client";

import { HomeRscService } from "@/shared";
import Image from "next/image";
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
  const { deleteEvent } = HomeRscService();

  return (
    <Link href={`./event/${bannerId}?bannerImg=${imgSrc}`}>
      <CardBox className="flex h-[240px] w-full flex-col gap-[17px] rounded-2xl p-[14px]">
        <Image
          src={imgSrc}
          alt="banner"
          height={150}
          width={1100}
          className="h-[150px] w-[1100px] object-cover"
        />
        <div className="flex justify-between">
          <p>{url}</p>
          <div className="flex items-end gap-[18px]">
            <p className="text-[15px] text-[#B4B1B1]">{date}</p>
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (confirm("정말 삭제하시겠습니까?")) {
                  if (await deleteEvent(bannerId)) {
                    alert("삭제되었습니다.");
                    location.reload();
                  } else {
                    alert("삭제에 실패했습니다. 관리자에게 문의하세요.");
                  }
                }
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
