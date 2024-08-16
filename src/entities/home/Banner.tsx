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
    <div className="h-[23.1880vh] w-[68.75vw]">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        loop={true}
        className="h-[13vw] w-[68.75vw] rounded-2xl bg-white shadow-[0px_10px_10px_0px_rgba(72,72,72,0.25)]"
      >
        {images.map((image, idx) => (
          <SwiperSlide
            key={idx}
            className="flex items-center justify-center text-center"
          >
            <Image
              src={image}
              alt={image}
              width={1320}
              height={250.43}
              className="h-full object-scale-down object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
