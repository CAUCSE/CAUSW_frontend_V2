import React from 'react';

import Image from 'next/image';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose} // 모달 외부 클릭하면 닫힘
    >
      <div className="relative h-[600px] w-[400px] lg:h-[600px] lg:w-[500px]">
        {/* 이미지 */}
        <Image
          src={imageUrl}
          alt="확대 이미지"
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
