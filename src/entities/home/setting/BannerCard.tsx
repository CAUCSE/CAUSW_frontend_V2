"use client";

import { CardBox } from "../card/CardBox";
import { HomeService } from "@/shared";
import Image from "next/image";
import Link from "next/link";

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
  const { useDeleteEvent } = HomeService();
  const { mutateAsync: deleteEvent } = useDeleteEvent();

  const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteEvent({ id: bannerId });
    }
  };

  return (
    <Link href={`./event/${bannerId}?bannerImg=${imgSrc}&url=${url}`}>
      <CardBox className="relative flex h-[240px] w-full flex-col gap-[17px] rounded-2xl p-[14px]">
        <Image
          src={imgSrc}
          alt="banner"
          height={150}
          width={1100}
          className="h-[150px] w-[1100px] object-cover"
        />
        <div className="flex flex-col text-sm md:text-base">
          <p className="">{url}</p>
          <p className="text-[#B4B1B1]">{date}</p>
        </div>
      </CardBox>
    </Link>
  );
};
