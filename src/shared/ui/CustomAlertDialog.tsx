'use client';

import React from 'react';

interface CustomAlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  iconText?: string;
  description: React.ReactNode;
  warningText?: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

export const CustomAlertDialog = ({
  open,
  onClose,
  title,
  description,
  warningText,
  confirmText,
  cancelText,
  onConfirm,
}: CustomAlertDialogProps) => {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="mt-4 text-gray-600">{description}</div>
          {warningText && (
            <p className="mt-4 text-xs text-red-500">{warningText}</p>
          )}
        </div>

        <div className="flex flex-col border-t border-gray-200">
          <button
            className="w-full py-3 font-semibold text-blue-500 transition-colors hover:bg-gray-100"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
          <button
            className="w-full border-t border-gray-200 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
