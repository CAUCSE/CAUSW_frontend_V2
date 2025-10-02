export const createFormData = (
  jsonData: object,
  jsonKey: string, // JSON 데이터의 FormData 키
  files?: File[],
  fileKey: string = 'imageFileList', // 이미지 리스트의 FormData 키
): FormData => {
  const formData = new FormData();

  // JSON 데이터를 Blob으로 변환 후 FormData에 추가
  formData.append(
    jsonKey,
    new Blob([JSON.stringify(jsonData)], { type: 'application/json' }),
  );

  // 파일이 존재하면 FormData에 추가
  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append(
        fileKey,
        new Blob([file], { type: file.type }),
        file.name,
      );
    });
  } else {
    // 파일이 없을 경우 빈 문자열 추가
    formData.append(fileKey, '');
  }

  return formData;
};
