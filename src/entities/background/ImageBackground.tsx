'use client';

import { useState } from 'react';

import Image from 'next/image';

import { LoadingComponent } from '@/entities';

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
      {darkBackground ? <div className="fixed left-0 top-0 z-[-1] h-full w-full bg-black opacity-70"></div> : null}
      <div className="fixed left-1/2 top-1/2 z-[-1] ml-4 h-[100vw] w-full -translate-x-1/2 -translate-y-1/2 transform bg-center object-cover md:h-full md:w-[100vh]">
        <Image
          src={src}
          alt={alt}
          fill={true}
          style={{ filter: 'brightness(0.5)' }}
          onLoadingComplete={() => {
            setIsImageLoaded(true);
          }}
        />
      </div>
    </>
  );
};
