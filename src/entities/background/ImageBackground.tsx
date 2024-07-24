"use client";

import Image from "next/image";
import { useState } from "react";

import { LoadingComponent } from "@/entities";

export const ImageBackground = ({
  src,
  alt,
  darkBackground,
}: {
  src: string;
  alt: string;
  darkBackground?: boolean;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {isImageLoaded ? null : <LoadingComponent />}
      {darkBackground ? (
        <div className="w-full h-screen fixed top-0 left-0 bg-black opacity-70 z-[-1] "></div>
      ) : null}
      <div className="fixed z-[-1] object-cover w-full lg:w-3/4 h-3/4 lg:h-screen top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2">
        <Image
          src={src}
          alt={alt}
          fill={true}
          style={{ filter: "brightness(0.5)" }}
          onLoadingComplete={() => {
            setIsImageLoaded(true);
          }}
        />
      </div>
    </>
  );
};
