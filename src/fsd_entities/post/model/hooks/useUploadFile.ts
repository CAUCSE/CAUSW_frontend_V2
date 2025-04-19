'use client';

import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { FILE_UPLOAD_RULES } from '../../config';
import { useUploadFileStore } from '../stores';

export const useUploadFile = () => {
  const { selectedFileList, addFile } = useUploadFileStore(
    useShallow(state => ({
      selectedFileList: state.selectedFileList,
      addFile: state.addFile,
    })),
  );

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > FILE_UPLOAD_RULES.MAX_FILE_SIZE) {
      toast.error(`파일의 크기가 10MB를 초과합니다.`);
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!FILE_UPLOAD_RULES.ALLOWED_EXTENSIONS.includes(fileExtension)) {
      toast.error(`파일의 형식이 올바르지 않습니다.`);
      return;
    }

    if (selectedFileList.length >= FILE_UPLOAD_RULES.MAX_FILE_COUNT) {
      toast.error(`파일은 최대 ${FILE_UPLOAD_RULES.MAX_FILE_COUNT}개까지 업로드할 수 있습니다.`);
      return;
    }

    addFile(file);
  };

  return { handleUploadFile };
};
