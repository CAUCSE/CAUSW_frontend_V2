'use client';

import { useState } from 'react';

import Image from 'next/image';

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export const ImageViewer = ({ images, initialIndex = 0, onClose }: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 이전 이미지
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 다음 이미지
  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 이미지 다운로드
  const downloadImage = () => {
    const imageUrl = images[currentIndex];
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image_${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* 이미지 컨테이너 */}
      <div className="relative flex items-center justify-center">
        {/* 이전 버튼 - 이미지 바깥쪽 */}
        {currentIndex > 0 && (
          <button
            className="absolute left-0 z-50 flex h-10 w-10 -translate-x-full items-center justify-center rounded-full bg-black/50 text-3xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white lg:h-14 lg:w-14"
            onClick={prevImage}
          >
            {'<'}
          </button>
        )}

        {/* 이미지 */}
        <div className="relative flex min-h-[80vw] min-w-[80vw] items-center justify-center lg:min-h-[45vw] lg:min-w-[45vw]">
          <Image
            src={images[currentIndex]}
            alt="확대된 이미지"
            fill={true}
            quality={100}
            unoptimized
            objectFit="contain"
          />
        </div>

        {/* 다음 버튼 - 이미지 바깥쪽 */}
        {currentIndex < images.length - 1 && (
          <button
            className="absolute right-0 z-50 flex h-10 w-10 translate-x-full items-center justify-center rounded-full bg-black/50 text-3xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white lg:h-14 lg:w-14"
            onClick={nextImage}
          >
            {'>'}
          </button>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white"
        onClick={onClose}
      >
        ✕
      </button>

      {/* 다운로드 버튼 */}
      <button
        className="absolute right-16 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white"
        onClick={downloadImage}
      >
        ↓
      </button>
    </div>
  );
};
