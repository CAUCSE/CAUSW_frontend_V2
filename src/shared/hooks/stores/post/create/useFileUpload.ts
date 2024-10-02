import { useFileUploadStore } from '@/shared'; 

export const useFileUpload = () => {
  const { selectedFiles, addFile, setFiles, clearFiles } = useFileUploadStore();

  const handleFileUpload = (file: File | null) => {
    if (file) {
      addFile(file);
      console.log(file.type)
    }
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