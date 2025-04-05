'use client';

import Image from 'next/image';
import Link from 'next/link';

import { HomeService } from '@/shared';

import { CardBox } from '../card/CardBox';

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
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteEvent({ id: bannerId });
    }
  };

  return (
    <Link href={`./event/${bannerId}?bannerImg=${imgSrc}&url=${url}`}>
      <CardBox className="flex h-[240px] w-full flex-col gap-[17px] rounded-2xl p-[14px]">
        <Image src={imgSrc} alt="banner" height={150} width={1100} className="h-[150px] w-[1100px] object-cover" />
        <div className="flex justify-between">
          <p>{url}</p>
          <div className="flex items-end gap-[18px]">
            <p className="text-[15px] text-[#B4B1B1]">{date}</p>
            <button onClick={handleDeleteEvent} className="z-10">
              <i className="icon-[fa6-regular--trash-can] h-[50px] w-[50px]" />
            </button>
          </div>
        </div>
      </CardBox>
    </Link>
  );
};
