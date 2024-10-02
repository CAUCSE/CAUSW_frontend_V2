"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import {
  UserService,
  useUserStore,
  AcademicRecordRscService,
  UserRscService,
} from "@/shared";
import { useRouter } from "next/navigation";

const SubmitApplicationPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<User.UserAdmissionCreateRequestDto>();
  const [fileList, setFileList] = useState<File[]>([]); // 관리할 파일 목록
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter(); // useRouter 초기화
  const email = useUserStore((state) => state.email);
  const { submitAdmissionsApplication } = UserRscService();

  // 졸업 년도 선택에 쓰이는 yearOptions
  const startYear = 1972;
  const currentYear = new Date().getFullYear();
  const yearOptions: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(year);
  }

  // 완료 모달
  const closeCompleteModal = () => {
    if (isSuccessModalOpen) {
      router.push("/setting");
    } else {
      setIsSuccessModalOpen(false);
    }
  };

  // 증빙 서류 제출 여부 확인
  useEffect(() => {
    const fetchEmailValue = async () => {
      setValue("email", email);
      fetchEmailValue();
    };
  }, []);

  const files = watch("images") as FileList;

  useEffect(() => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newImagePreviews = newFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews((prevPreviews) => [
        ...newImagePreviews.reverse(),
        ...prevPreviews,
      ]);
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
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index),
    );

    // 파일리스트에서 해당 파일 삭제
    const updatedFiles = fileList.filter((_, i) => i !== index);
    setFileList(updatedFiles);

    // useForm에서 관리하는 files 상태도 함께 업데이트
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransfer 구성
    setValue("images", dataTransfer.files); // useForm에 새로운 파일 목록 설정
  };

  const onSubmit = async (data: User.UserAdmissionCreateRequestDto) => {
    try {
      const response = submitAdmissionsApplication(data);
    } catch (error) {
      // 에러 처리
      console.log("실패");
      console.log(error);
    }
  };

  // 필수 항목을 입력하지 않고, 또는 잘못 입력한 상태로 제출했을 경우
  const [isIncompleteModalOpen, setIsIncompleteModalOpen] = useState(false);
  const closeInCompleteModal = () => {
    setIsIncompleteModalOpen(false);
  };

  const onInvalid = (errors: any) => {
    // 모든 필드를 입력하지 않았을 경우에 대한 로직
    console.error("Form Errors:", errors);
    setIsIncompleteModalOpen(true); // 모든 필드를 입력하지 않았을 때 모달을 띄움
  };

  return (
    <div className="p-6">
      {/* 이전 버튼 */}
      <div className="justify-left sticky top-0 z-10 mb-4 flex w-full items-center bg-white py-2">
        <button
          onClick={() => router.back()}
          className="text-black-500 flex items-center hover:text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          이전
        </button>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">승인 신청서 작성</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="grid grid-cols-1 gap-8"
      >
        {/* 이메일 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">이메일</label>
          <input
            {...register("email", { required: "학적 상태는 필수 항목입니다." })}
            className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
            placeholder="이메일을 입력해주세요"
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* 특이사항 입력 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">자기소개 글</label>
          <textarea
            {...register("description", {
              maxLength: 500,
              required: "자기소개 글을 작성해주세요.",
            })}
            placeholder="자기소개 글을 작성해주세요. ( 250자 이내 )"
            className="mb-1 w-full rounded-md border border-gray-300 p-2"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="mb-2 mr-4 max-w-full">
          <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
            가입 신청 이미지 제출
          </label>
          <p className="text-md mb-2 mt-1 text-red-500">
            mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요.
          </p>

          <div className="justify-left mb-1 flex w-full items-center overflow-auto rounded-lg border-2 border-gray-300 p-4 lg:w-4/6">
            <div className="mr-4 aspect-square h-32 w-32 flex-shrink-0 rounded-lg border-2 border-gray-300 p-4">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  {...register("images", { required: "파일을 첨부해 주세요" })}
                />
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mb-2 flex w-full flex-nowrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-square h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full cursor-pointer object-cover"
                      onClick={() => handleImageClick(preview)}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-red-500 p-1 text-white"
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

          {errors.images && (
            <span className="text-red-500">{errors.images.message}</span>
          )}
        </div>

        {/* 모달 */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"
            onClick={closeImage}
          >
            <div className="max-h-full max-w-3xl overflow-auto rounded-lg bg-white p-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        {/* 모든 필드를 입력하지 않았을 때 표시되는 모달 */}
        {isIncompleteModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeInCompleteModal}
          >
            <div className="ml-4 mr-4 grid w-full max-w-xs justify-items-center rounded-lg bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">
                입력되지 않은 항목이 있습니다
              </h2>
              <p className="mb-4">모든 항목을 조건에 맞게 입력해주세요.</p>
            </div>
          </div>
        )}
        {/* 회원가입을 성공했을 때 표시되는 모달 */}
        {isSuccessModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
            onClick={closeCompleteModal}
          >
            <div className="w-xs h-xs items-center justify-center overflow-y-auto rounded-lg bg-white p-8">
              <div className="grid justify-items-center">
                <h2 className="mb-4 text-xl font-bold">증빙 서류 제출 완료</h2>
                <p>화면을 클릭하면 환경 설정 페이지로 이동합니다.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-2/3 rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 lg:w-1/3"
          >
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitApplicationPage;
