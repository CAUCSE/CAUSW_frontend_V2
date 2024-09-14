import { CardBox } from "@/entities/home";
import { HomeRscService } from "@/shared";
import Image from "next/image";
import Link from "next/link";

const CalendarCard = ({
  imgSrc,
  year,
  month,
  editDate,
}: {
  imgSrc: string;
  year: number;
  month: number;
  editDate: string;
}) => {
  return (
    <CardBox className="flex h-fit w-full justify-between gap-[17px] rounded-2xl p-[14px]">
      <div className="flex flex-col justify-between">
        <p className="text-[32px]">
          {year}년 {month}월
        </p>

        <p className="text-[15px] text-[#B4B1B1]">최종 수정일: {editDate}</p>
      </div>
      <Image
        src={imgSrc}
        alt="banner"
        width={145}
        height={145}
        className="h-[145px] w-[145px] object-cover"
      />
    </CardBox>
  );
};

export default async function CalendarSettingPage() {
  const { getEvents } = HomeRscService();

  return (
    <div className="flex h-full w-full flex-col gap-10 p-8">
      <div className="flex justify-between">
        <Link href=".." className="flex items-center">
          <i className="icon-[ooui--next-rtl]" />
          이전
        </Link>
        <Link
          href="./banner"
          className="rounded-full border border-black bg-white px-8 py-3"
        >
          캘린더 추가
        </Link>
      </div>
      <p className="text-[40px] font-medium">캘린더 편집</p>
      <CalendarCard
        imgSrc="/images/calendar-dummy.png"
        year={2021}
        month={10}
        editDate="2021.10.10"
      />

      {/* {events && <p>이벤트 목록</p>} */}
    </div>
  );
}
