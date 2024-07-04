"use client";

import Image from "next/image";

import { useState } from "react";

import { Loading } from "@/entities";

export const ImageBackground = ({
  src,
  alt,
  darkBackground,
}: {
  src: string;
  alt: string;
  darkBackground?: boolean;
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <>
      {isVideoLoaded ? null : <Loading />}
      {darkBackground ? (
        <div className="w-full h-screen fixed top-0 left-0  bg-black opacity-80 overflow-y-hidden z-[-1]"></div>
      ) : null}
      <div className="w-full h-screen fixed top-0 left-0 overflow-y-hidden z-[-1]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ filter: "brightness(0.5)" }}
          onLoadingComplete={() => {
            setIsVideoLoaded(true);
          }}
        />
      </div>
    </>
  );
};
