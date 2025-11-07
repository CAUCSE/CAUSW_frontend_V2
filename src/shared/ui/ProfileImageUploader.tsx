'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';

import { Pencil, Plus, UserCircle } from 'lucide-react';
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form';

import { cn } from '@/shadcn/lib/utils';

interface Props<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultValue?: string;
}

export const ProfileImageUploader = <T extends FieldValues>({
  name,
  setValue,
  defaultValue = '',
}: Props<T>) => {
  const [preview, setPreview] = useState<string>(defaultValue);
  useEffect(() => {
    setPreview(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(name, file as any, { shouldValidate: true });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="group relative h-24 w-24">
      <div className="relative h-full w-full overflow-hidden rounded-full">
        {preview ? (
          <Image
            src={preview}
            alt="프로필 미리보기"
            fill
            className="object-cover"
          />
        ) : (
          <UserCircle className="h-full w-full text-gray-300" />
        )}
      </div>
      <label
        htmlFor="profile-image-upload"
        className={cn(
          'absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100',
          !preview && 'bg-gray-200 text-gray-500 opacity-100 hover:bg-gray-300',
        )}
      >
        {preview ? <Pencil size={24} /> : <Plus size={32} />}
      </label>
      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
