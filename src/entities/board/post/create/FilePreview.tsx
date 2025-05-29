import React from 'react';

import Image from 'next/image';

import { useFileUploadStore } from '@/shared';

export const FilePreview = React.memo(() => {
  const { selectedFiles, removeFile } = useFileUploadStore(); // 업로드된 파일 상태와 파일 제거 함수

  const isImageFile = (fileName: string) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(fileName);
  };

  return (
    <div className="border-t-comment-bw border-file-preview-border mt-4 grid h-full w-full grid-cols-3 gap-4 pt-6 lg:grid-cols-6">
      {selectedFiles.map((file, index) => (
        <div
          key={index}
          className="w-min-20 h-min-20 relative h-24 w-24 border border-black bg-cover bg-center lg:h-32 lg:w-32"
        >
          {isImageFile(file.name) ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}
            />
          ) : (
            <div className="w-min-20 h-min-20 flex h-24 w-24 flex-col items-center justify-center space-y-2 border border-black p-2 lg:h-32 lg:w-32">
              <Image src="/images/post/file-icon.svg" alt={file.name} width={30} height={30} />
              <span className="text-[10px]">{file.name}</span>
            </div>
          )}
          {/* 파일 제거 버튼 */}
          <button
            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            onClick={() => removeFile(index)} // 파일 제거 함수 호출
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
});

FilePreview.displayName = 'FilePreview';

export default FilePreview;
