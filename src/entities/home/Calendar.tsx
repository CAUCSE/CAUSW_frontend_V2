import Image from "next/image";
import Link from "next/link";
import { CardBox } from "./card/CardBox";

export const Calendar = () => {
  return (
    <CardBox className="flex h-full flex-col items-center gap-[25px] p-[30px]">
      <div className="flex h-[25px] w-full items-center justify-center gap-[40px]">
        <button>
          <i className="icon-[material-symbols--chevron-left] h-[25px] w-[25px] text-gray-400" />
        </button>
        <p className="w-[200px] text-center text-[24px] text-[#4A5660]">
          September 2024
        </p>
        <button>
          <i className="icon-[material-symbols--chevron-right] h-[25px] w-[25px] text-gray-400" />
        </button>
      </div>
      <Image
        src="/images/calendar-dummy.png"
        width={391}
        height={383}
        className="h-[383px] w-[391px] border-b-[1px] object-cover"
        alt="캘린더"
      />
      <hr className="w-full border-[1px] border-[#E0E0E0]" />
      <Link
        href="delivered"
        className="text-[32px] underline underline-offset-[5px]"
      >
        딜리버드 보러 가기
      </Link>
    </CardBox>
  );
};
