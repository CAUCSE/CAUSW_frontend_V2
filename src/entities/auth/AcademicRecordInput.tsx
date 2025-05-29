'use client';

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useSubmitAcademicRecord } from '@/shared/hooks/auth/useSubmitApplication';

import { NoButtonModal, PreviousButton } from '@/shared';

const SubmitAcademicRecordPage = ({
  onClose,
  rejectMessage,
}: {
  onClose: () => void;
  rejectMessage: string | null;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<User.CreateUserAcademicRecordApplicationRequestDto>();
  const [fileList, setFileList] = useState<File[]>([]); // 관리할 파일 목록
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [academicStatus, setAcademicStatus] = useState<string>(''); // 학적 상태를 저장할 상태
  const [rejectMessageModal, setRejectMessageModal] = useState(false);
  const { mutate: submitAcademicRecord } = useSubmitAcademicRecord(onClose, academicStatus);

  const handleCancel = () => {
    // 취소 버튼을 클릭했을 때 모달을 닫습니다.
    onClose();
  };

  // 졸업 년도 선택에 쓰이는 yearOptions
  const startYear = 1972;
  const currentYear = new Date().getFullYear();
  const yearOptions: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(year);
  }

  useEffect(() => {
    if (rejectMessage) {
      setRejectMessageModal(true);
    }
  }, []);

  const selectedAcademicStatus = watch('targetAcademicStatus');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files); // 새로운 파일 배열로 변환

      // 기존 파일들과 병합
      const updatedFileList = [...newFiles, ...fileList.reverse()];
      setFileList(updatedFileList);

      // 이미지 미리보기 URL 생성 및 추가
      const newImagePreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...newImagePreviews, ...prevPreviews.reverse()]);

      const dataTransfer = new DataTransfer();
      updatedFileList.forEach((file) => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransf  er 구성

      setValue('images', dataTransfer.files, { shouldValidate: true }); // useForm에 새로운 파일 목록 설정

      // Reset the input value to allow re-uploading the same file if needed
    }
  };

  useEffect(() => {
    setAcademicStatus(selectedAcademicStatus); // 학적 상태 변경 시 UI 갱신
  }, [selectedAcademicStatus]);

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
    updatedFiles.forEach((file) => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransfer 구성
    setValue('images', dataTransfer.files); // useForm에 새로운 파일 목록 설정
  };

  const onSubmit = (data: User.CreateUserAcademicRecordApplicationRequestDto) => {
    submitAcademicRecord(data);
  };

  const onInvalid = (errors: any) => {
    // 모든 필드를 입력하지 않았을 경우에 대한 로직
    toast.error('모든 항목을 조건에 맞게 입력해주세요.');
  };

  return (
    <div className="bg-board-page-background min-h-screen p-6">
      <PreviousButton routeCallback={() => handleCancel()}></PreviousButton>
      <div className="mt-8 mb-6">
        <h1 className="text-2xl font-bold">학부 재학 증빙 서류 제출</h1>
        <p className="hidden text-gray-600 lg:block">
          재학 중일 시 학부 사무실, 동문회 등의 사업/행사 신청을 위한 증빙 절차입니다. 증빙이 되지 않으면 휴학/졸업이
          아닌 재학 중인 회원은 서비스 이용이 어렵습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="grid grid-cols-1 gap-8">
        {/* 학적 상태 선택 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">본 학기 학적 상태</label>
          <select
            {...register('targetAcademicStatus', { required: '학적 상태는 필수 항목입니다.' })}
            className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
          >
            <option value="">-선택해주세요-</option>
            <option value="ENROLLED">재학</option>
            <option value="LEAVE_OF_ABSENCE">휴학</option>
            <option value="GRADUATED">졸업</option>
          </select>
          {errors.targetAcademicStatus && <span className="text-red-500">{errors.targetAcademicStatus.message}</span>}
          {academicStatus === 'GRADUATED' && (
            <label className="font-semibold text-red-500">졸업 선택 시 추후 재학, 휴학으로 변경이 불가합니다.</label>
          )}
        </div>

        {/* N차 학기 선택 */}
        {academicStatus === 'ENROLLED' && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">본 학기 기준 등록 완료 학기 차수</label>
            <select
              {...register('targetCompletedSemester', { required: '학기 차수는 필수 항목입니다.' })}
              className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
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
            {errors.targetCompletedSemester && (
              <span className="text-red-500">{errors.targetCompletedSemester.message}</span>
            )}
          </div>
        )}

        {/* 졸업 년도 선택 */}
        {academicStatus === 'GRADUATED' && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">졸업 년도</label>
            <select
              {...register('graduationYear', { required: '졸업 년도 선택은 필수 항목입니다.' })}
              className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
            >
              <option value="">-선택해주세요-</option>
              {yearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.graduationYear && <span className="text-red-500">{errors.graduationYear.message}</span>}
          </div>
        )}

        {/* 졸업 월 선택 */}
        {academicStatus === 'GRADUATED' && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">졸업 월</label>
            <select
              {...register('graduationType', { required: '졸업 월 선택은 필수 항목입니다.' })}
              className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
            >
              <option value="">-선택해주세요-</option>
              <option value="FEBRUARY">2월</option>
              <option value="AUGUST">8월</option>
            </select>
            {errors.graduationType && <span className="text-red-500">{errors.graduationType.message}</span>}
          </div>
        )}

        {/* 특이사항 입력 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">유저 작성 특이사항</label>
          <textarea
            {...register('note', { maxLength: 500, required: '특이사항을 작성해주세요.' })}
            placeholder="특이사항을 작성해주세요. ( 500자 이내 )"
            className="mb-1 w-full rounded-md border border-gray-300 p-2"
          />
          {errors.note && <span className="text-red-500">{errors.note.message}</span>}
        </div>
        {/* 증빙 서류 제출 */}
        {academicStatus === 'ENROLLED' && (
          <div className="mr-4 mb-2 max-w-full">
            <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">학부 재적/졸업 증빙 자료</label>
            <p className="text-md mt-1 text-red-500">mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요.</p>
            <p className="text-md mb-2 text-red-500">(이외의 파일로는 재학 증빙이 불가능합니다.)</p>
            <div className="justify-left mb-1 flex w-full items-center overflow-auto rounded-lg border-2 border-gray-300 p-4 lg:w-4/6">
              <div className="mr-4 aspect-square h-32 w-32 shrink-0 rounded-lg border-2 border-gray-300 p-4">
                <label
                  htmlFor="file-upload"
                  className="flex h-full cursor-pointer flex-col items-center justify-center"
                >
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    {...register('images', {
                      validate: {
                        validateFileCount: (files: FileList | null) =>
                          (files && files.length > 0 && files.length <= 5) ||
                          '파일은 최소 1개, 최대 5개까지 업로드 가능합니다.',
                        allImages: (files: FileList | null) => {
                          // 모든 파일이 이미지 형식인지 확인
                          if (!files) return true;
                          for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            if (!file.type.startsWith('image/')) {
                              return '이미지 파일만 업로드 가능합니다.';
                            }
                          }
                        },
                      },
                    })}
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="mb-2 flex w-full flex-nowrap gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square h-32 w-32 shrink-0 overflow-hidden rounded-lg border-2 border-gray-300"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full cursor-pointer object-cover"
                        onClick={() => handleImageClick(preview)}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 mt-1 mr-1 rounded-full bg-red-500 p-1 text-white"
                        onClick={() => handleImageDelete(index)}
                      >
                        <svg
                          className="h-4 w-4"
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
        )}

        {/* 모달 */}
        {selectedImage && (
          <div
            className="bg-opacity-10 fixed inset-0 z-50 flex items-center justify-center bg-black"
            onClick={closeImage}
          >
            <div className="max-h-full max-w-3xl overflow-auto rounded-lg bg-white p-4">
              <img src={selectedImage} alt="Selected" className="h-full w-full object-contain" />
            </div>
          </div>
        )}

        {/* 지난 제출 때 거절당했을 때 표시되는 모달 */}
        {rejectMessageModal && (
          <NoButtonModal closeModal={() => setRejectMessageModal(false)}>
            <h1 className="mb-8 font-bold">다음과 같은 이유로 재학 증빙 서류 제출이 거절되었습니다.</h1>
            <h1>거절 사유 : {rejectMessage}</h1>
          </NoButtonModal>
        )}

        <div className="mt-8 flex justify-center">
          <button type="submit" className="bg-focus w-2/3 rounded-md p-3 text-white hover:bg-blue-400 lg:w-1/3">
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitAcademicRecordPage;
