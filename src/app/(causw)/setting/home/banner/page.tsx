"use client";

import { BannerList, BannerSettingHeader } from "@/widget";

import { BannerService } from "@/shared";
import { LoadingComponent } from "@/entities";

const EventSetting = () => {
  const { useGetBannerList } = BannerService();
  const { data, isLoading } = useGetBannerList();
  const bannerList = data?.events;
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 md:p-8">
      <BannerSettingHeader bannerList={bannerList!} />
      <BannerList bannerList={bannerList!} />
    </div>
  );
};

export default EventSetting;
