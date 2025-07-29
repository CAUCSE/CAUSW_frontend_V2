'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ImageViewer } from './ImageViewer';

interface CommonImageListProps {
  images: string[];
}

export const CommonImageList = ({ images }: CommonImageListProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openViewer = (index: number) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedIndex(null);
  };
  if (images.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold md:text-2xl">사진</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-8">
        {images.map((image, idx) => (
          <div key={idx} className="flex cursor-pointer justify-center" onClick={() => openViewer(idx)}>
            <Image
              src={image}
              alt={`첨부사진${idx}`}
              width={200}
              height={200}
              layout="fixed"
              className="h-36 w-36 rounded-2xl border border-black object-contain sm:h-48 sm:w-48"
              unoptimized
            />
          </div>
        ))}
      </div>

      {isViewerOpen && selectedIndex !== null && (
        <ImageViewer images={images} initialIndex={selectedIndex} onClose={closeViewer} />
      )}
    </div>
  );
};
