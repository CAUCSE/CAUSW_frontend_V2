'use client';

import Image from 'next/image';

import { useShallow } from 'zustand/react/shallow';

import { useUploadFileStore } from '@/fsd_entities/post';

import CloseIcon from '../../../../../public/icons/close_icon.svg';
import FileIcon from '../../../../../public/icons/file_icon.svg';

export const UploadFilePreview = () => {
  const { selectedFileList, removeFile } = useUploadFileStore(
    useShallow((state) => ({
      selectedFileList: state.selectedFileList,
      removeFile: state.removeFile,
    })),
  );

  const isImageFile = (fileName: string) => {
    const extension = fileName.split('.').pop() ?? '';
    return /(jpg|jpeg|png|gif|bmp|webp)$/.test(extension);
  };

  return (
    <div className="mt-4 flex h-fit w-full flex-shrink-0 flex-grow gap-4 overflow-x-scroll border-t-comment-bw border-file-preview-border p-4">
      {selectedFileList.map((file, index) => (
        <div
          key={index}
          className="relative h-24 w-24 flex-shrink-0 border border-black bg-cover bg-center lg:h-32 lg:w-32"
        >
          {isImageFile(file.name) ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="preview"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 flex-col items-center justify-center space-y-2 border border-black p-2 lg:h-32 lg:w-32">
              <FileIcon width={30} height={30} />
              <span className="text-xs">{file.name}</span>
            </div>
          )}
          <button
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            onClick={() => removeFile(index)}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};
