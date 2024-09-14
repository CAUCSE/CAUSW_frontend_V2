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
    <div className="h-[17vh] w-full">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        loop={true}
        className="h-[17vh] w-full"
      >
        {images.map((image, idx) => (
          <SwiperSlide
            key={idx}
            className="flex items-center justify-center text-center"
          >
            <Image
              src={image}
              alt={image}
              width={0}
              height={0}
              className="h-auto w-full object-scale-down object-center"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
