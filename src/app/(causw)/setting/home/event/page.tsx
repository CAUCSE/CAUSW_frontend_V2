"use client";

import { BannerCard } from "@/_deprecated/entities/home";
import { HomeService } from "@/shared";
import Link from "next/link";
import { LoadingComponent } from "@/_deprecated/entities";

const EventSetting = () => {
  const { useGetEventList } = HomeService();
  const { data: events, isLoading } = useGetEventList();
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex h-full w-full flex-col gap-10 p-8">
      <div className="flex justify-between">
        <Link href=".." className="flex items-center">
          <i className="icon-[ooui--next-rtl]" />
          이전
        </Link>
        <Link
          href="./event/new"
          className="rounded-full border border-black bg-white px-5 py-2 max-lg:text-[13px] lg:px-8 lg:py-3"
        >
          배너 추가
        </Link>
      </div>
      <div className="flex gap-4 max-lg:flex-col lg:items-end">
        <p className="text-[21px] font-medium lg:text-[40px]">
          이벤트 배너 공지 편집
        </p>
        <span className="text-[#B4B1B1] max-lg:text-[14px]">
          이벤트 배너는 최대 10개까지 게시 가능합니다.
        </span>
      </div>
      {events &&
        events.map(({ url, image, id, updatedAt }) => (
          <BannerCard
            key={id}
            url={url}
            imgSrc={image}
            bannerId={id}
            date={updatedAt}
          />
        ))}
    </div>
  );
};

export default EventSetting;
