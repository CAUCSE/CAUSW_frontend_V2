import { CardBox } from "@/entities/home";
import DeleteIcon from "../../../public/icons/delete_icon.svg";
import Image from "next/image";
import { useCalendarStore } from "@/shared";
import { useShallow } from "zustand/react/shallow";

interface CalendarCardProps {
  id: string;
  imgSrc: string;
  year: number;
  month: number;
}

export const CalendarCard = ({
  id,
  imgSrc,
  year,
  month,
}: CalendarCardProps) => {
  const { openModal, setCalendarId, setCalendarYear, setCalendarMonth } =
    useCalendarStore(
      useShallow((state) => ({
        openModal: state.openModal,
        setCalendarId: state.setCalendarId,
        setCalendarYear: state.setCalendarYear,
        setCalendarMonth: state.setCalendarMonth,
      })),
    );

  const handleDeleteCalendar = (id: string, year: number, month: number) => {
    setCalendarId(id);
    setCalendarYear(year);
    setCalendarMonth(month);
    openModal();
  };
  return (
    <CardBox className="relative flex h-full w-full flex-col justify-between rounded-2xl">
      <Image
        src={imgSrc}
        alt="banner"
        width={320}
        height={240}
        className="h-44 w-full rounded-t-2xl object-cover object-top"
      />
      <button
        className="absolute right-2 top-2 h-8 w-8 place-items-center rounded-full border border-[#A0A0A0] bg-white text-[#A0A0A0] hover:bg-red-500 hover:text-white"
        onClick={() => handleDeleteCalendar(id, year, month)}
      >
        <DeleteIcon />
      </button>
      <p className="px-4 py-2 text-base lg:text-lg">
        {year}년 {month}월
      </p>
    </CardBox>
  );
};
