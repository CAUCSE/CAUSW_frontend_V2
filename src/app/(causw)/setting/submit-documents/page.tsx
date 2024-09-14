"use client";

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  academicStatus: string;
  notes: string;
  semester: string; // 학기 차수를 추가
  files: FileList;
};

const SubmitDocumentsPage = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>();
  const [documentPreviews, setDocumentPreviews] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
    // Handle form submission logic here
  };

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const files = watch("files") as FileList;
  useEffect(() => {
    if (files && files.length > 0) {
      const newImagePreviews = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setImagePreviews(prevPreviews => [...newImagePreviews.reverse(), ...prevPreviews]);
    }
  }, [files]);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleImageDelete = (index: number) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">학부 재학 증빙 서류 제출</h1>
        <p className="text-gray-600 hidden lg:block">
          재학 중일 시 학부 사무실, 동문회 등의 사업/행사 신청을 위한 증빙 절차입니다. 증빙이 되지 않으면 휴학/졸업이 아닌 재학 중인 회원은 서비스 이용이 어렵습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8">
        {/* 학적 상태 선택 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">본 학기 학적 상태</label>
          <select
            {...register("academicStatus", { required: true })}
            className="p-2 border border-gray-300 w-1/3 rounded-md mb-4"
          >
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="졸업">졸업</option>
          </select>
          {errors.academicStatus && <span className="text-red-500">학적 상태는 필수 항목입니다.</span>}
        </div>

        {/* N차 학기 선택 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">본 학기 기준 등록 완료 학기 차수</label>
          <select
            {...register("semester", { required: true })}
            className="p-2 border border-gray-300 w-1/3 rounded-md mb-4"
          >
            <option value="1">1차 학기</option>
            <option value="2">2차 학기</option>
            <option value="3">3차 학기</option>
            <option value="4">4차 학기</option>
            <option value="5">5차 학기</option>
            <option value="6">6차 학기</option>
            <option value="7">7차 학기</option>
            <option value="8">8차 학기</option>
            <option value="9">9차 학기 이상</option>
          </select>
          {errors.semester && <span className="text-red-500">학기 차수는 필수 항목입니다.</span>}
        </div>

        {/* 특이사항 입력 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">유저 작성 특이사항</label>
          <textarea
            {...register("notes", { maxLength: 500 })}
            placeholder="특이사항을 작성해주세요."
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.notes && <span className="text-red-500">특이사항은 500자 이내로 작성해주세요.</span>}
        </div>

        {/* 증빙 서류 제출 */}
        <div className="mb-2 ml-4 mr-4 max-w-md">
          <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2">학부 재적/졸업 증빙 자료</label>
          <p className="text-md text-red-500 mt-1">
          mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요. 
          </p>
          <p className="text-md text-red-500 mb-2">
          (이외의 파일로는 재학 증빙이 불가능합니다.)
          </p>
          <div className="flex items-center justify-left border-2 border-gray-300 rounded-lg p-4 overflow-auto w-full">
            <div className="w-32 h-32 border-2 border-gray-300 rounded-lg p-4 mr-4 flex-shrink-0 basis-1/3">
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center h-full">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="text-gray-600 mt-2 text-center sm:hidden">파일을 선택하세요</span>
                <input id="file-upload" type="file" multiple className="hidden" {...register('files', { 
                  required: '파일을 첨부해 주세요' })} />
              </label>            
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex flex-nowrap w-full basis-1/3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-full h-32 border-2 border-gray-300 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full cursor-pointer"
                      onClick={() => handleImageClick(preview)}
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleImageDelete(index)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 모달 */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50" onClick={closeImage}>
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto">
              <img src={selectedImage} alt="Selected" className="object-contain w-full h-full" />
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600">
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDocumentsPage;
