import { CardBox } from "@/entities/home";
import DeleteIcon from "../../../public/icons/delete_icon.svg";
import Image from "next/image";

interface CalendarCardProps {
  imgSrc: string;
  year: number;
  month: number;
  editDate: string;
}

export const CalendarCard = ({
  imgSrc,
  year,
  month,
  editDate,
}: CalendarCardProps) => {
  return (
    <CardBox className="relative flex h-full w-full flex-col justify-between rounded-2xl">
      <Image
        src={imgSrc}
        alt="banner"
        width={320}
        height={240}
        className="h-44 w-full rounded-t-2xl object-cover object-top"
      />
      <button className="absolute right-2 top-2 h-8 w-8 place-items-center rounded-full border border-[#A0A0A0] bg-white text-[#A0A0A0] hover:bg-red-500 hover:text-white">
        <DeleteIcon />
      </button>
      <div className="flex flex-col justify-between px-4 py-2">
        <p className="text-base lg:text-lg">
          {year}년 {month}월
        </p>
        <p className="text-xs text-[#B4B1B1] lg:text-sm">
          최종 수정일: {editDate}
        </p>
      </div>
    </CardBox>
  );
};
