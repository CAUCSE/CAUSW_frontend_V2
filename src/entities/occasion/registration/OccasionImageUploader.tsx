'use client';

import React, { useState } from 'react';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

export const OccasionImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviews((prev) => [...prev, ...newFiles]);
      onUpload([...previews.map((item) => item.file), ...newFiles.map((item) => item.file)]);
    }
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onUpload(updatedPreviews.map((item) => item.file));
  };

  return (
    <div className="flex flex-wrap gap-4">
      <label className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border border-gray-400 lg:h-32 lg:w-32">
        +
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} multiple />
      </label>
      {previews.map((preview, index) => (
        <div key={index} className="relative">
          <img
            src={preview.url}
            alt={`Uploaded Preview ${index}`}
            className="h-24 w-24 rounded-lg object-cover lg:h-32 lg:w-32"
          />
          {/* 삭제 버튼 */}
          <button
            onClick={() => handleRemove(index)}
            className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full border border-gray-400 bg-white text-sm font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
