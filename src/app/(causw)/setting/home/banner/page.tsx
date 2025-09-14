'use client';

import { useGetBannerList } from '@/entities/banner';
import { LoadingComponent } from '@/shared';
import { BannerList, BannerSettingHeader } from '@/fsd_widgets/banner';

const EventSetting = () => {
  const { data, isLoading } = useGetBannerList();
  const bannerList = data?.events;
  if (isLoading) {
    return <LoadingComponent variant='background-only' />;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 md:p-8">
      <BannerSettingHeader bannerList={bannerList!} />
      <BannerList bannerList={bannerList!} />
    </div>
  );
};

export default EventSetting;
