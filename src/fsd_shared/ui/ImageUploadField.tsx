import React, { ChangeEvent, useState } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { ImageModal } from "./ImageModal";
import Image from "next/image";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  errorMessage?: string;
  setValue: UseFormSetValue<T>;
  maxFiles?: number;
  children?: React.ReactNode;
}

export const ImageUploadField = <T extends FieldValues>({
  name,
  label,
  errorMessage,
  setValue,
  maxFiles = 5,
  children,
}: Props<T>) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    <div className="flex flex-col w-full mx-auto mb-6">
      {label && <label className="text-lg font-semibold mb-1">{label}</label>}
      {children && <div className="mb-1">{children}</div>}

      <div className="flex gap-4 items-center overflow-x-auto">
        <label className="min-w-28 min-h-28 w-28 h-28 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition shrink-0">
          <span className="text-6xl text-gray-400">+</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {[...previews]
          .slice()
          .reverse()
          .map((src, i) => (
            <div
              key={i}
              className="relative min-w-28 min-h-28 w-28 h-28 border-gray-300 rounded overflow-hidden flex-shrink-0 cursor-pointer"
            >
            <Image
              src={src}
              alt={`preview-${i}`}
              fill
              className="object-cover cursor-pointer"
              onClick={() => setSelectedImage(src)}
            />
              <button
                type="button"
                onClick={() => handleDelete(previews.length - 1 - i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
      </div>

      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
      {errorMessage && <span className="text-error">{errorMessage}</span>}

    </div>
  );
};
