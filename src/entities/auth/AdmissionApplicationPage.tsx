"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NoButtonModal, PreviousButton, UserService } from '@/shared';
import toast from 'react-hot-toast';

const SubmitApplicationModal = ( {onClose, emailValue, rejectMessage}: {onClose: () => void; emailValue: string; rejectMessage: string | null}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, setError } = useForm<User.AdmissionCreateRequestDto>();
  const [fileList, setFileList] = useState<File[]>([]); // 관리할 파일 목록
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { submitAdmissionsApplication } = UserService();
  const [rejectMessageModal, setRejectMessageModal] = useState(false);


  useEffect(() => {
    if (emailValue) {
      setValue("email", emailValue); // emailValue 값으로 input 값 설정
    }
  }, [emailValue, setValue]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files); // 새로운 파일 배열로 변환

      // 기존 파일들과 병합
      const updatedFileList = [...newFiles, ...fileList.reverse()];
      setFileList(updatedFileList);

      // 이미지 미리보기 URL 생성 및 추가
      const newImagePreviews = newFiles.map((file) =>
        URL.createObjectURL(file)
      );  
      setImagePreviews((prevPreviews) => [...newImagePreviews, ...prevPreviews.reverse()]);
      
      const dataTransfer = new DataTransfer();
      updatedFileList.forEach(file => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransf  er 구성

      setValue('attachImage', dataTransfer.files, { shouldValidate: true }); // useForm에 새로운 파일 목록 설정        
      
      // Reset the input value to allow re-uploading the same file if needed
    }
  };

  useEffect(() => {
    if (rejectMessage){
      setRejectMessageModal(true);
    }
  }, []);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleImageDelete = (index: number) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));

    // 파일리스트에서 해당 파일 삭제
    const updatedFiles = fileList.filter((_, i) => i !== index);
    setFileList(updatedFiles);

    // useForm에서 관리하는 files 상태도 함께 업데이트
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransf  er 구성
    setValue('attachImage', dataTransfer.files, { shouldValidate: true }); // useForm에 새로운 파일 목록 설정

  };


  const onSubmit = async (data:User.AdmissionCreateRequestDto) => {
    try {
      await submitAdmissionsApplication(data);
      toast.success("가입 신청서 제출이 완료되었습니다.");
      setTimeout(() => {
        onClose()}, 500);
    } catch (error: any) {
      // 에러 처리
      toast.error(error.response?.data?.message || "가입 신청서 제출에 실패했습니다.");
    }
  };

    const onInvalid = (errors: any) => {
      // 모든 필드를 입력하지 않았을 경우에 대한 로직
      toast.error("모든 항목을 조건에 맞게 입력해주세요.");
    };

  return (
    <div className="p-6 bg-boardPageBackground">
      <PreviousButton routeCallback={() => onClose()}></PreviousButton>
              {/* 이전 버튼 */}
      <div className="mb-6 mt-8">
        
        <h1 className="text-2xl font-bold">승인 신청서 작성</h1>

      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="grid grid-cols-1 gap-8">
        {/* 이메일 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">이메일</label>
          <input
            {...register("email", { required: "학적 상태는 필수 항목입니다." })}
            className="p-2 border border-gray-300 w-full sm:w-1/3 rounded-md mb-1"
            placeholder='이메일을 입력해주세요'
            defaultValue={emailValue} // 기본값으로 설정
            readOnly={!!emailValue} // emailValue가 존재하면 input을 readOnly로 고정
          >
          </input>
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        {/* 특이사항 입력 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">자기소개 글</label>
          <textarea
            {...register("description", { maxLength: 500,
              required: "자기소개 글을 작성해주세요."
             })}
            placeholder="자기소개 글을 작성해주세요. ( 250자 이내 )"
            className="p-2 border border-gray-300 rounded-md w-full sm:w-2/3 mb-1"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        <div className="mb-2 mr-4 max-w-full">
          <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2">가입 신청 이미지 제출</label>
          <p className="text-md text-red-500 mt-1 mb-2">
          mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요. 
          </p>

          <div className="flex items-center justify-left border-2 border-gray-300 rounded-lg p-4 overflow-auto w-full lg:w-4/6 mb-1">
    <div className="w-32 h-32 border-2 border-gray-300 rounded-lg p-4 mr-4 flex-shrink-0 aspect-square">
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center h-full">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <input id="file-upload" type="file" multiple className="hidden" accept='image/*'{...register('attachImage', { validate: {validateFileCount: (files: FileList | null) =>
        files && files.length > 0 && files.length <= 5 || 
        "파일은 최소 1개, 최대 5개까지 업로드 가능합니다.",
           allImages: (files: FileList | null) => {
        // 모든 파일이 이미지 형식인지 확인
        if (!files) return true;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!file.type.startsWith("image/")) {
            return "이미지 파일만 업로드 가능합니다.";
          }}}   
    } })} onChange={handleFileChange}/>
        </label>
    </div>

    {imagePreviews.length > 0 && (
        <div className="flex flex-nowrap w-full gap-4 mb-2">
        {imagePreviews.map((preview, index) => (
            <div key={index} className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden flex-shrink-0 aspect-square">
            <img
                src={preview}
                alt={`Preview ${imagePreviews.length - (index + 1)}`}
                className="object-cover w-full h-full cursor-pointer"
                onClick={() => handleImageClick(preview)}
            />
          <button
            type="button"
            className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full p-1"
            onClick={() => {handleImageDelete(index);}}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  )}
</div>

          {errors.attachImage && <span className="text-red-500">{errors.attachImage.message}</span>}
        </div>


        {/* 모달 */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50" onClick={closeImage}>
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto">
              <img src={selectedImage} alt="Selected" className="object-contain w-full h-full" />
            </div>
          </div>
        )}


            {/* 지난 제출 때 거절당했을 때 표시되는 모달 */ }
        {rejectMessageModal && (
          <NoButtonModal closeModal = {() => setRejectMessageModal(false)}>
            <h1 className='font-bold mb-8'>다음과 같은 이유로 가입 신청서 제출이 거절되었습니다.</h1>
            <h1 >거절 사유 : {rejectMessage}</h1>
          </NoButtonModal>
        )

        }

        <div className="mt-8 flex justify-center">
          <button type="submit" className="bg-focus text-white p-3 rounded-md w-2/3 lg:w-1/3 hover:bg-blue-400">
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitApplicationModal;
