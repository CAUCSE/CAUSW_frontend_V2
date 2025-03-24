"use client";

import React, { useEffect } from "react";

import clsx from "clsx";
import { createPortal } from "react-dom";

interface PortalModalProps {
  children: React.ReactNode;
  className?: string;
  closeModal: () => void;
}

// TODO: focus 스트랩 적용
export const PortalModal = ({
  children,
  className,
  closeModal,
}: PortalModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  const clickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50"
      onClick={clickOutSide}
    >
      <div
        className={clsx(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

interface ModalElementProps {
  className?: string;
  children: React.ReactNode;
}

const ModalHeader = ({ className = "", children }: ModalElementProps) => {
  return <div className={className}>{children}</div>;
};

const ModalBody = ({ className = "", children }: ModalElementProps) => {
  return <div className={className}>{children}</div>;
};

const ModalFooter = ({ className = "", children }: ModalElementProps) => {
  return <div className={className}>{children}</div>;
};

PortalModal.Header = ModalHeader;
PortalModal.Body = ModalBody;
PortalModal.Footer = ModalFooter;

export interface PortalModalComponent extends React.FC<PortalModalProps> {
  Header: React.FC<ModalElementProps>;
  Body: React.FC<ModalElementProps>;
  Footer: React.FC<ModalElementProps>;
}

(PortalModal as PortalModalComponent).Header = ModalHeader;
(PortalModal as PortalModalComponent).Body = ModalBody;
(PortalModal as PortalModalComponent).Footer = ModalFooter;

export default PortalModal as PortalModalComponent;
