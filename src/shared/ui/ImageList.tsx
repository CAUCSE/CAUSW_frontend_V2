'use client';

import { useState } from 'react';

import Image from 'next/image';

import { getOptimizedImageUrl } from '@/shared/utils/image';

import { ImageViewer } from './ImageViewer';

interface ImageListProps {
  images: string[];
  imageSize?: number; // 이미지 크기 (기본값: 80px)
}

export const ImageList = ({ images, imageSize = 80 }: ImageListProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 이미지 클릭 시 뷰어 오픈
  const openViewer = (index: number) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  // 이미지 뷰어 닫기
  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedIndex(null);
  };

  return (
    <div className="scrollbar-hide grid w-full grid-cols-3 gap-1 overflow-x-auto pb-3 md:grid-cols-5 md:gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer rounded-md border border-gray-500"
          onClick={() => openViewer(index)}
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
          }}
        >
          <Image
            src={getOptimizedImageUrl(image, { width: imageSize })}
            alt={`Uploaded Image ${index}`}
            fill
            className="rounded-md object-cover"
            unoptimized
          />
        </div>
      ))}

      {/* 이미지 뷰어 오픈 */}
      {isViewerOpen && selectedIndex !== null && (
        <ImageViewer
          images={images}
          initialIndex={selectedIndex}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};
