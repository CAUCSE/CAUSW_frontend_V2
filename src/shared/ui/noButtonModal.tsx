import React from 'react';

import Image from 'next/image';

interface IModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export const NoButtonModal = ({ closeModal, children }: IModalProps) => {
  return (
    <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black p-4">
      <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
        <button className="absolute top-0 left-0 p-2" onClick={closeModal}>
          <Image
            src="/images/modal_close_icon.png"
            alt="modal-close-btn"
            width={15}
            height={15}
          />
        </button>
        {children}
      </div>
    </div>
  );
};
