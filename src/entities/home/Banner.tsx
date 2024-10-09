"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BannerProps {
  images: string[];
  urls: string[];
  loop: boolean;
}

export function Banner({ images, urls, loop }: BannerProps) {
  return (
    <div className="h-[17vh] w-full overflow-hidden rounded-lg shadow-md">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        loop={loop}
        className="h-[17vh] w-full"
      >
        {images.map((image, idx) => (
          <SwiperSlide
            key={idx}
            className="flex items-center justify-center text-center"
          >
            {/* <Image
              src={image}
              alt={image}
              width={700}
              height={500}
              className="h-auto w-full bg-white object-scale-down object-top"
            /> */}
            <div
              className="h-full w-full bg-contain bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => {
                window.location.href = urls[idx];
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
