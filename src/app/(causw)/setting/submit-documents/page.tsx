"use client";

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


const SubmitDocumentsPage = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, setError } = useForm<User.CreateUserAcademicRecordApplicationRequestDto>();
  const [fileList, setFileList] = useState<File[]>([]); // 관리할 파일 목록
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 졸업 년도 선택에 쓰이는 yearOptions
  const startYear = 1972; 
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(year);
  }





  const files = watch("images") as FileList;
  useEffect(() => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newImagePreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prevPreviews => [...newImagePreviews.reverse(), ...prevPreviews]);
      setFileList(newFiles); // 파일 업데이트
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

    // 파일리스트에서 해당 파일 삭제
    const updatedFiles = fileList.filter((_, i) => i !== index);
    setFileList(updatedFiles);

    // useForm에서 관리하는 files 상태도 함께 업데이트
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransfer 구성
    setValue('images', dataTransfer.files); // useForm에 새로운 파일 목록 설정
  };


  const onSubmit = async (data: User.CreateUserAcademicRecordApplicationRequestDto) => {
    try {
      const formData = new FormData();

      formData.append('targetAcademicStatus', data.targetAcademicStatus);
      formData.append('targetCompletedSemester', data.targetCompletedSemester.toString());
      formData.append('graduationYear', data.graduationYear.toString());
      formData.append('graduationType', data.graduationType.toString());
      formData.append('note', data.note);


      // 파일들을 FormData에 추가
      Array.from(data.images).forEach((file, index) => {
        formData.append('images', file);
      });

      // 서버에 전송하는 로직 작성 (axios 예시)
      // const response = await axios.post('/api/your-endpoint', formData);

    } catch (error) {
      // 에러 처리
      console.log(error);
    }
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
            {...register("targetAcademicStatus", { required: "학적 상태는 필수 항목입니다." })}
            className="p-2 border border-gray-300 w-full sm:w-1/3 rounded-md mb-1"
          >
            <option value= "">-선택해주세요-</option>
            <option value="ENROLLED">재학</option>
            <option value="LEAVE_OF_ABSENCE">휴학</option>
            <option value="GRADUATED">졸업</option>
            <option value="UNDETERMINED">미정</option>
          </select>
          {errors.targetAcademicStatus && <span className="text-red-500">{errors.targetAcademicStatus.message}</span>}
        </div>

        {/* N차 학기 선택 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">본 학기 기준 등록 완료 학기 차수</label>
          <select
            {...register("targetCompletedSemester", { required: "학기 차수는 필수 항목입니다." })}
            className="p-2 border border-gray-300 w-full sm:w-1/3 rounded-md mb-1"
          >
            <option value="">-선택해주세요-</option>            
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
          {errors.targetCompletedSemester && <span className="text-red-500">{errors.targetCompletedSemester.message}</span>}
        </div>

        {/* 졸업 년도 선택 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">졸업 년도</label>
          <select
            {...register("graduationYear", { required: "졸업 년도 선택은 필수 항목입니다." })}
            className="p-2 border border-gray-300 w-full sm:w-1/3 rounded-md mb-1"
          >
            <option value="">-선택해주세요-</option>
          {yearOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>))}
          </select>
          {errors.graduationYear && <span className="text-red-500">{errors.graduationYear.message}</span>}
        </div>


        {/* 졸업 월 선택 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">졸업 월</label>
          <select
            {...register("graduationType", { required: "졸업 월 선택은 필수 항목입니다." })}
            className="p-2 border border-gray-300 w-full sm:w-1/3 rounded-md mb-1"
          >
            <option value="">-선택해주세요-</option>
            <option value="FEBRUARY">2월</option>
            <option value="AUGUST">8월</option>
          </select>
          {errors.graduationType && <span className="text-red-500">{errors.graduationType.message}</span>}
        </div>



        {/* 특이사항 입력 */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">유저 작성 특이사항</label>
          <textarea
            {...register("note", { maxLength: 500,
              required: "특이사항을 작성해주세요."
             })}
            placeholder="특이사항을 작성해주세요."
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
          />
          {errors.note && <span className="text-red-500">{errors.note.message}</span>}
        </div>

        {/* 증빙 서류 제출 */}
        <div className="mb-2 mr-4 max-w-full">
          <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2">학부 재적/졸업 증빙 자료</label>
          <p className="text-md text-red-500 mt-1">
          mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요. 
          </p>
          <p className="text-md text-red-500 mb-2">
          (이외의 파일로는 재학 증빙이 불가능합니다.)
          </p>
          <div className="flex items-center justify-left border-2 border-gray-300 rounded-lg p-4 overflow-auto w-full mb-1">
            <div className="w-32 h-32 border-2 border-gray-300 rounded-lg p-4 mr-4 flex-shrink-0 basis-1/3">
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center h-full">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <input id="file-upload" type="file" multiple className="hidden" {...register('images', { 
                  required: '파일을 첨부해 주세요' })} />
              </label>            
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex flex-nowrap w-full basis-1/3 mb-2">
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
          {errors.images && <span className="text-red-500">{errors.images.message}</span>}
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
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-2/3 lg:w-1/3 hover:bg-blue-600">
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDocumentsPage;
