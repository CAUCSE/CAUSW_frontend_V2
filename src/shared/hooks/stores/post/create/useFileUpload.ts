import { useFileUploadStore } from '@/shared';

const FILE_UPLOAD_RULES = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILE_COUNT: 10,
  ALLOWED_EXTENSIONS: [
    'jpg',
    'jpeg',
    'png',
    // 'gif',
    // 'bmp',
    // 'mp4',
    // 'avi',
    // 'mkv',
    // 'mov',
    // 'wmv',
    // 'flv',
    // 'mp3',
    // 'wav',
    // 'flac',
    // 'alac',
    // 'aac',
    // 'txt',
    // 'doc',
    // 'docx',
    // 'xls',
    // 'xlsx',
    // 'ppt',
    // 'pptx',
    // 'pdf',
    // 'hwp',
    // 'zip',
    // 'rar',
    // 'alz',
  ],
};

export const useFileUpload = () => {
  const { selectedFiles, addFile, setFiles, clearFiles } = useFileUploadStore();

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    // 개수 제한 검증
    if (selectedFiles.length >= FILE_UPLOAD_RULES.MAX_FILE_COUNT) {
      alert(`파일은 최대 ${FILE_UPLOAD_RULES.MAX_FILE_COUNT}개까지 업로드할 수 있습니다.`);
      return;
    }

    // 확장자 검증
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!FILE_UPLOAD_RULES.ALLOWED_EXTENSIONS.includes(extension)) {
      alert(`"${file.name}"은(는) 허용되지 않는 파일 형식입니다.`);
      return;
    }

    // 크기 제한 검증
    if (file.size > FILE_UPLOAD_RULES.MAX_FILE_SIZE) {
      alert(`"${file.name}"의 크기가 ${FILE_UPLOAD_RULES.MAX_FILE_SIZE / 1024 / 1024}MB를 초과합니다.`);
      return;
    }

    // 유효한 파일 추가
    addFile(file);
  };

  const resetFiles = () => {
    clearFiles();
  };

  return {
    selectedFiles,
    handleFileUpload,
    resetFiles,
  };
};
