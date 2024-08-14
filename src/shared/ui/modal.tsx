import React from "react";

interface IModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export const Modal = ({ closeModal, children }: IModalProps) => {
  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={closeModal}
    >
      <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
        <button
          className="absolute left-0 top-0 px-4 py-2 text-xl font-bold"
          onClick={closeModal}
        >
          x
        </button>
        {children}
        <button className="h-10 w-28 rounded bg-default" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};
