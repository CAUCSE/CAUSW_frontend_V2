"use client";

import { CardBox } from "../card/CardBox";
import DeleteIcon from "../../../../public/icons/delete_icon.svg";
import { HomeService } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import LinkIcon from "../../../../public/icons/link_icon.svg";

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
      <CardBox className="relative flex w-full flex-col rounded-2xl">
        <Image
          src={imgSrc}
          alt="banner"
          height={150}
          width={1100}
          className="h-[150px] w-[1100px] rounded-t-2xl object-cover"
        />
        <div className="flex items-center gap-2 py-3 pl-4 text-sm text-gray-500 md:text-base">
          <LinkIcon />
          <p className="">{url}</p>
        </div>
        <button
          className="absolute right-2 top-2 h-8 w-8 place-items-center rounded-full border border-[#A0A0A0] bg-white text-[#A0A0A0] hover:bg-red-500 hover:text-white"
          onClick={handleDeleteEvent}
        >
          <DeleteIcon />
        </button>
      </CardBox>
    </Link>
  );
};
