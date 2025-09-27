'use client';

import Image from 'next/image';

import DeleteIcon from '@icons/delete_icon.svg';
import LinkIcon from '@icons/link_icon.svg';
import { useShallow } from 'zustand/react/shallow';

import { useBannerStore } from '@/entities/banner';

import { CardBox } from '@/shared/ui';

export const BannerCard = ({
  url,
  imgSrc,
  bannerId,
}: {
  url: string;
  imgSrc: string;
  bannerId: string;
  date: string;
}) => {
  const {
    setSelectedBannerId,
    setSelectedBannerImage,
    setSelectedBannerUrl,
    openEditBannerModal,
    openDeleteBannerModal,
  } = useBannerStore(
    useShallow((state) => ({
      setSelectedBannerId: state.setSelectedBannerId,
      setSelectedBannerImage: state.setSelectedBannerImage,
      setSelectedBannerUrl: state.setSelectedBannerUrl,
      openEditBannerModal: state.openEditBannerModal,
      openDeleteBannerModal: state.openDeleteBannerModal,
    })),
  );

  const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openDeleteBannerModal();
    setSelectedBannerId(bannerId);
  };

  const handleClickBanner = () => {
    setSelectedBannerId(bannerId);
    setSelectedBannerImage(imgSrc);
    setSelectedBannerUrl(url);
    openEditBannerModal();
  };

  return (
    <div onClick={handleClickBanner}>
      <CardBox className="relative flex w-full flex-col rounded-2xl">
        <Image
          src={imgSrc}
          alt="banner"
          height={150}
          width={1100}
          className="h-[150px] w-full rounded-t-2xl object-cover"
        />
        <div className="flex min-w-0 items-center gap-2 py-3 pr-2 pl-4 text-sm text-gray-500 md:text-base">
          <LinkIcon className="flex-shrink-0" />
          <p className="line-clamp-2 flex-1 break-all">{url}</p>
        </div>
        <button
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#A0A0A0] bg-white text-[#A0A0A0] hover:bg-red-500 hover:text-white"
          onClick={handleDeleteEvent}
        >
          <DeleteIcon />
        </button>
      </CardBox>
    </div>
  );
};
