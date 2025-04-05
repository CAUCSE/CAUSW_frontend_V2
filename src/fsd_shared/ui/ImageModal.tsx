import React from 'react';

import Image from 'next/image';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={onClose} // 모달 외부 클릭하면 닫힘
    >
      <div className="relative w-[400px] h-[600px] lg:w-[500px] lg:h-[600px]">
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
