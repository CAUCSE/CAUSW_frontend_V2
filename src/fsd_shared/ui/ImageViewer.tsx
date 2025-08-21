'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';

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
  const downloadImage = async () => {
    const imageUrl = images[currentIndex];
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image_${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // cors 설정 완료되면 이미지 다운로드 로직 변경 예정 (보류)
  // const downloadImages = async () => {
  //   const imageUrl = images[currentIndex];
  //   console.log('Downloading image:', imageUrl);

  //   try {
  //     const res = await fetch(imageUrl, { mode: 'cors' });

  //     if (!res.ok) throw new Error('Network response was not ok');

  //     const blob = await res.blob();
  //     const url = URL.createObjectURL(blob);

  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `image_${currentIndex + 1}.jpg`;
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();

  //     setTimeout(() => URL.revokeObjectURL(url), 1000);
  //   } catch (error) {
  //     console.error('Download failed', error);
  //     alert('파일 다운로드에 실패했습니다.');
  //   }
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* 이미지 컨테이너 */}
      <div className="relative flex items-center justify-center px-12 lg:px-20">
        {/* 이전 버튼 - 이미지 바깥쪽 */}
        {currentIndex > 0 && (
          <button
            className="absolute left-0 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-3xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white lg:h-14 lg:w-14"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8 pr-0.5 lg:h-12 lg:w-12" /> {/* 아이콘으로 대체 */}
          </button>
        )}

        {/* 이미지 */}
        <div className="relative flex min-h-[70vw] min-w-[70vw] items-center justify-center lg:min-h-[45vw] lg:min-w-[45vw]">
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
            className="absolute right-0 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-3xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white lg:h-14 lg:w-14"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8 pl-0.5 lg:h-12 lg:w-12" /> {/* 아이콘으로 대체 */}
          </button>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white"
        onClick={onClose}
      >
        <X className="h-7 w-7" />
      </button>

      {/* 다운로드 버튼 */}
      <button
        className="absolute top-4 right-16 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-gray-500 backdrop-blur-md transition duration-300 hover:bg-black/70 hover:text-white"
        onClick={downloadImage}
      >
        <Download className="h-6 w-6 pb-0.5" />
      </button>
    </div>
  );
};
