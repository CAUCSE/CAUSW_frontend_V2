import React from "react";

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
      <div className="relative">
        <img src={imageUrl} alt="확대 이미지" className="max-w-full max-h-screen rounded-lg shadow-lg" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-full text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

