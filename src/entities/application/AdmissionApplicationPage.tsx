"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { UserRscService, NoButtonModal } from "@/shared";

const SubmitApplicationModal = ({
  onClose,
  emailValue,
  rejectMessage,
}: {
  onClose: () => void;
  emailValue: string;
  rejectMessage: string | null;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<User.AdmissionCreateRequestDto>();
  const [fileList, setFileList] = useState<File[]>([]); // 관리할 파일 목록
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { submitAdmissionsApplication } = UserRscService();
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
        URL.createObjectURL(file),
      );
      setImagePreviews((prevPreviews) => [
        ...newImagePreviews,
        ...prevPreviews.reverse(),
      ]);

      const dataTransfer = new DataTransfer();
      updatedFileList.forEach((file) => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransf  er 구성

      setValue("attachImage", dataTransfer.files, { shouldValidate: true }); // useForm에 새로운 파일 목록 설정

      // Reset the input value to allow re-uploading the same file if needed
    }
  };

  useEffect(() => {
    if (rejectMessage) {
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
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index),
    );

    // 파일리스트에서 해당 파일 삭제
    const updatedFiles = fileList.filter((_, i) => i !== index);
    setFileList(updatedFiles);

    // useForm에서 관리하는 files 상태도 함께 업데이트
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file)); // 새로운 파일 목록으로 DataTransf  er 구성
    setValue("attachImage", dataTransfer.files, { shouldValidate: true }); // useForm에 새로운 파일 목록 설정
  };

  const onSubmit = async (data: User.AdmissionCreateRequestDto) => {
    try {
      await submitAdmissionsApplication(data);
      setIsSuccessModalOpen(true);
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
      <div className="z-1 justify-left sticky top-0 mb-4 flex w-full items-center bg-white py-2">
        <button
          onClick={() => {
            onClose();
          }}
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
            defaultValue={emailValue} // 기본값으로 설정
            readOnly={!!emailValue} // emailValue가 존재하면 input을 readOnly로 고정
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
                  accept="image/*"
                  {...register("attachImage", {
                    validate: {
                      validateFileCount: (files: FileList | null) =>
                        (files && files.length > 0 && files.length <= 5) ||
                        "파일은 최소 1개, 최대 5개까지 업로드 가능합니다.",
                      allImages: (files: FileList | null) => {
                        // 모든 파일이 이미지 형식인지 확인
                        if (!files) return true;
                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          if (!file.type.startsWith("image/")) {
                            return "이미지 파일만 업로드 가능합니다.";
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
                    className="relative aspect-square h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${imagePreviews.length - (index + 1)}`}
                      className="h-full w-full cursor-pointer object-cover"
                      onClick={() => handleImageClick(preview)}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-red-500 p-1 text-white"
                      onClick={() => {
                        handleImageDelete(index);
                        console.log(index);
                      }}
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

          {errors.attachImage && (
            <span className="text-red-500">{errors.attachImage.message}</span>
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
            onClick={() => {
              onClose();
            }}
          >
            <div className="w-xs h-xs items-center justify-center overflow-y-auto rounded-lg bg-white p-8">
              <div className="grid justify-items-center">
                <h2 className="mb-4 text-xl font-bold">
                  가입 신청서 제출 완료
                </h2>
                <p>화면을 클릭하면 창이 닫힙니다.</p>
              </div>
            </div>
          </div>
        )}
        {/* 지난 제출 때 거절당했을 때 표시되는 모달 */}
        {rejectMessageModal && (
          <NoButtonModal closeModal={() => setRejectMessageModal(false)}>
            <h1 className="mb-8 font-bold">
              다음과 같은 이유로 가입 신청서 제출이 거절되었습니다.
            </h1>
            <h1>거절 사유 : {rejectMessage}</h1>
          </NoButtonModal>
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

export default SubmitApplicationModal;
