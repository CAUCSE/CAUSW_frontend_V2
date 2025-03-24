"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageViewer } from "./ImageViewer";

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
    <div className="grid w-full grid-cols-3 gap-1 md:grid-cols-5 md:gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer border border-gray-500 rounded-md"
          onClick={() => openViewer(index)}
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
          }}
        >
          <Image
            src={image}
            alt={`Uploaded Image ${index}`}
            layout="fill" // 부모 div 크기에 맞게 자동 조정
            objectFit="cover" // 이미지 비율 유지하면서 크기 맞추기
            unoptimized // Next.js의 자동 최적화 비활성화 (화질 깨짐 방지)
            className="rounded-md"
          />
        </div>
      ))}

      {/* 이미지 뷰어 오픈 */}
      {isViewerOpen && selectedIndex !== null && (
        <ImageViewer images={images} initialIndex={selectedIndex} onClose={closeViewer} />
      )}
    </div>
  );
};
