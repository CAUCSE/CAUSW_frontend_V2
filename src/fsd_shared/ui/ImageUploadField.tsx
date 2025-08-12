'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';

import { FieldValues, Path, UseFormSetValue } from 'react-hook-form';

import { ACCEPTED_IMAGE_TYPES } from '@/fsd_entities/post/config/fileUploadRule';

import { ImageModal } from './ImageModal';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  errorMessage?: string;
  setValue: UseFormSetValue<T>;
  maxFiles?: number;
  resetTrigger?: boolean;
  children?: React.ReactNode;
}

export const ImageUploadField = <T extends FieldValues>({
  name,
  label,
  errorMessage,
  setValue,
  maxFiles = 5,
  resetTrigger = false,
  children,
}: Props<T>) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (resetTrigger) {
      setPreviews([]);
      setFiles([]);
      setSelectedImage(null);
    }
  }, [resetTrigger]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const updated = [...files, ...newFiles];

    if (updated.length > maxFiles) {
      alert(`최대 ${maxFiles}개까지 업로드할 수 있습니다.`);
      return;
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFiles(updated);
    setPreviews((prev) => [...prev, ...newPreviews]);

    const dataTransfer = new DataTransfer();
    updated.forEach((file) => dataTransfer.items.add(file));
    setValue(name, dataTransfer.files as any, { shouldValidate: true });
  };

  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));
    setValue(name, dataTransfer.files as any, { shouldValidate: true });
  };

  return (
    <div className="mx-auto mb-6 flex w-full flex-col">
      {label && <label className="mb-1 text-lg font-semibold">{label}</label>}
      {children && <div className="mb-1">{children}</div>}

      <div className="flex items-center gap-4 overflow-x-auto">
        <label className="flex h-28 min-h-28 w-28 min-w-28 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition hover:bg-gray-50">
          <span className="text-6xl text-gray-400">+</span>
          <input type="file" accept={ACCEPTED_IMAGE_TYPES} multiple onChange={handleChange} className="hidden" />
        </label>

        {[...previews]
          .slice()
          .reverse()
          .map((src, i) => (
            <div
              key={i}
              className="relative h-28 min-h-28 w-28 min-w-28 shrink-0 cursor-pointer overflow-hidden rounded-sm border-gray-300"
            >
              <Image
                src={src}
                alt={`preview-${i}`}
                fill
                className="cursor-pointer object-cover"
                onClick={() => setSelectedImage(src)}
              />
              <button
                type="button"
                onClick={() => handleDelete(previews.length - 1 - i)}
                className="absolute top-1 right-1 rounded-full bg-red-500 px-1 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
      </div>
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
