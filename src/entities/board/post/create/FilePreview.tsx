import Image from 'next/image';
import { useFileUploadStore } from '@/shared';

export const FilePreview = () => {
  const { selectedFiles, removeFile } = useFileUploadStore(); // 업로드된 파일 상태와 파일 제거 함수

  const isImageFile = (fileName: string) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(fileName);
  };

  return (
    <div className="h-full w-full border-t-comment-bw border-file-preview-border pt-6 grid grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
      {selectedFiles.map((file, index) => (
        <div key={index} className="relative w-24 h-24 lg:w-32 lg:h-32 w-min-20 h-min-20 bg-center bg-cover border border-black">
          {isImageFile(file.name) ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-24 h-24 lg:w-32 lg:h-32 w-min-20 h-min-20 border border-black p-2 space-y-2">
              <Image
                src="/images/post/file-icon.svg"
                alt={file.name}
                width={30}
                height={30}
              />
              <span className="text-[10px]">{file.name}</span>
            </div>
          )}
          {/* 파일 제거 버튼 */}
          <button
            className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
            onClick={() => removeFile(index)} // 파일 제거 함수 호출
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
