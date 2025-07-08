'use client';

import { HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

export function Modal({
  onClose,
  children,
  className,
  preventBgClose,
  setWhiteBg,
  controller,
  ...props
}: {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  preventBgClose?: boolean;
  setWhiteBg?: boolean;
  controller?: ReactNode;
} & HTMLAttributes<HTMLDialogElement>) {
  return (
    // modal backdrop
    <div
      className={`fixed top-0 left-0 z-1000 flex h-screen w-screen items-center justify-center ${setWhiteBg ? 'bg-[rgba(255,255,255,0.6)]' : 'bg-[rgba(0,0,0,0.5)]'}`}
      onClick={() => {
        if (!preventBgClose) onClose();
      }}
    >
      {/* modal content */}
      <dialog
        className={clsx(`z-9999 rounded-md border border-[rgba(39,39,39,0.2)] bg-white p-[14px] shadow-md`, className)}
        onClick={(e) => e.stopPropagation()}
        open
        {...props}
      >
        {children}
        {controller && <div className="absolute top-1 right-3">{controller}</div>}
      </dialog>
    </div>
  );
}

export function TitleModal({
  onClose,
  children,
  className,
  preventBgClose,
  title,
}: {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  preventBgClose?: boolean;
  title: string;
}) {
  return (
    // modal backdrop
    <div
      className="fixed top-0 left-0 z-1000 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onClick={() => {
        if (!preventBgClose) onClose();
      }}
    >
      {/* modal content */}
      <dialog
        className={clsx(
          className,
          `z-9999 rounded-md border border-[rgba(39,39,39,0.2)] bg-white p-[11.65px] pt-[20px] pb-[15px] shadow-md`,
        )}
        onClick={(e) => e.stopPropagation()}
        open
      >
        <p className="border-opacity-[0.07] border-b border-black pb-[11.35px] text-start text-[16px] font-light">
          {title}
        </p>
        {children}
      </dialog>
    </div>
  );
}
