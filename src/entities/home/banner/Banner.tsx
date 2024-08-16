"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BannerProps {
  images: string[];
}

export function Banner({ images }: BannerProps) {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      autoplay={true}
      loop={true}
      className='w-[60vw] h-[8.526vw] rounded-2xl border'
    >
      {images.map((image, idx) => (
        <SwiperSlide
          key={idx}
          className='text-center flex justify-center items-center'
        >
          <Image
            src={image}
            alt={image}
            width={1004 * 10}
            height={141 * 10}
            className='object-scale-down object-center h-full'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
