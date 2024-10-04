"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserService, AcademicRecordRscService, Modal } from "@/shared";
import { useRouter } from "next/navigation";

const UpdataeAcademicRecordPage = () => {
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
  const { checkIsAcademicRecordSubmitted } = UserService();
  const { updateAcademicRecord, postAcademicRecord } =
    AcademicRecordRscService();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter(); // useRouter 초기화
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);

  // 졸업 년도 선택에 쓰이는 yearOptions
  const startYear = 1972;
  const currentYear = new Date().getFullYear();
  const yearOptions: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(year);
  }

  const [academicStatus, setAcademicStatus] = useState<string>(""); // 학적 상태를 저장할 상태
  const selectedAcademicStatus = watch("targetAcademicStatus");

  useEffect(() => {
    setAcademicStatus(selectedAcademicStatus); // 학적 상태 변경 시 UI 갱신
  }, [selectedAcademicStatus]);

  // 완료 모달
  const closeCompleteModal = () => {
    if (isSuccessModalOpen) {
      router.push("/setting");
    } else {
      setIsSuccessModalOpen(false);
    }
  };

  // 이미 증빙 서류를 제출한 경우
  const [hasExistingRecord, setHasExistingRecord] = useState(false);
  const [isRejectedRecord, setIsRejectedRecord] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");

  const closeAcademicRecordModal = () => {
    if (hasExistingRecord) {
      setHasExistingRecord(false);
    } else if (isRejectedRecord) {
      setIsRejectedRecord(false);
      setRejectMessage("");
    }
  };

  // 증빙 서류 제출 여부 확인
  useEffect(() => {
    const fetchAcademicRecord = async () => {
      try {
        const response = await checkIsAcademicRecordSubmitted();
        if (response.status === 200) {
          const academicRecordInfo = response.data;
          if (academicRecordInfo.isRejected === true) {
            // 거절 당한 경우
            setIsRejectedRecord(true);
            setRejectMessage(academicRecordInfo.rejectMessage);
          } else {
            // 승인 대기 중인 경우
            setHasExistingRecord(true);
            setValue(
              "targetAcademicStatus",
              academicRecordInfo.targetAcademicStatus,
            );
            setValue(
              "targetCompletedSemester",
              academicRecordInfo.targetCompletedSemester,
            );
            setValue("note", academicRecordInfo.userNote);
          }
          setIsAlreadySubmitted(true);
        }
      } catch (error: any) {
        if (error.response?.status === 400) {
        } else {
          console.error("Error checking academic record:", error);
        }
      }
    };

    fetchAcademicRecord();
  }, []);

  // useEffect 이용한 상태 관리
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

  // 이미지 관련
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

  const onSubmit = async (
    data: User.CreateUserAcademicRecordApplicationRequestDto,
  ) => {
    try {
      // 이미 제출된 경우 put method, 아닌 경우 post method 이용
      if (data.targetAcademicStatus !== "GRADUATED") {
        data.graduationType = null;
        data.graduationYear = null;
      }
      if (data.targetAcademicStatus !== "ENROLLED") {
        data.images = null;
      }

      const response = isAlreadySubmitted
        ? await updateAcademicRecord(data)
        : await postAcademicRecord(data);

      // 서버에 전송하는 로직 작성 (axios 예시)
      console.log(response);
      console.log("성공");
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
      <div className="justify-left sticky top-0 z-10 mb-4 flex w-full items-center bg-[#F8F8F8] py-2">
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
        <h1 className="text-2xl font-bold">학부 재학 증빙 서류 제출</h1>
        <p className="hidden text-gray-600 lg:block">
          재학 중일 시 학부 사무실, 동문회 등의 사업/행사 신청을 위한 증빙
          절차입니다. 증빙이 되지 않으면 휴학/졸업이 아닌 재학 중인 회원은
          서비스 이용이 어렵습니다.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="grid grid-cols-1 gap-8"
      >
        {/* 학적 상태 선택 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">
            본 학기 학적 상태
          </label>
          <select
            {...register("targetAcademicStatus", {
              required: "학적 상태는 필수 항목입니다.",
            })}
            className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
          >
            <option value="">-선택해주세요-</option>
            <option value="ENROLLED">재학</option>
            <option value="LEAVE_OF_ABSENCE">휴학</option>
            <option value="GRADUATED">졸업</option>
          </select>
          {errors.targetAcademicStatus && (
            <span className="text-red-500">
              {errors.targetAcademicStatus.message}
            </span>
          )}
        </div>

        {/* N차 학기 선택 */}
        {academicStatus === "ENROLLED" && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">
              본 학기 기준 등록 완료 학기 차수
            </label>
            <select
              {...register("targetCompletedSemester", {
                required: "학기 차수는 필수 항목입니다.",
              })}
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
              <span className="text-red-500">
                {errors.targetCompletedSemester.message}
              </span>
            )}
          </div>
        )}

        {/* 졸업 년도 선택 */}
        {academicStatus === "GRADUATED" && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">졸업 년도</label>
            <select
              {...register("graduationYear", {
                required: "졸업 년도는 필수 항목입니다.",
              })}
              className="mb-1 w-full overflow-y-auto rounded-md border border-gray-300 p-2 sm:w-1/3"
            >
              <option value="">-선택해주세요-</option>
              {yearOptions.map((year, index) => (
                <option key={index} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            {errors.graduationYear && (
              <span className="text-red-500">
                {errors.graduationYear.message}
              </span>
            )}
          </div>
        )}

        {/* 졸업 월 선택 */}
        {academicStatus === "GRADUATED" && (
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">졸업 월</label>
            <select
              {...register("graduationType", {
                required: "학기 차수는 필수 항목입니다.",
              })}
              className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-1/3"
            >
              <option value="">-선택해주세요-</option>
              <option value="FEBRUARY">2월</option>
              <option value="AUGUST">8월</option>
            </select>
            {errors.graduationType && (
              <span className="text-red-500">
                {errors.graduationType.message}
              </span>
            )}
          </div>
        )}

        {/* 특이사항 입력 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">
            유저 작성 특이사항
          </label>
          <textarea
            {...register("note", {
              maxLength: 500,
              required: "특이사항을 작성해주세요.",
            })}
            placeholder="특이사항을 작성해주세요. ( 500자 이내 )"
            className="mb-1 w-full rounded-md border border-gray-300 p-2"
          />
          {errors.note && (
            <span className="text-red-500">{errors.note.message}</span>
          )}
        </div>

        {/* 증빙 서류 제출 */}
        {academicStatus === "ENROLLED" && (
          <div className="mb-2 mr-4 max-w-full">
            <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
              학부 재적/졸업 증빙 자료
            </label>
            <p className="text-md mt-1 text-red-500">
              mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요.
            </p>
            <p className="text-md mb-2 text-red-500">
              (이외의 파일로는 재학 증빙이 불가능합니다.)
            </p>
            <div className="justify-left mb-1 flex w-full items-center overflow-auto rounded-lg border-2 border-gray-300 p-4">
              <div className="mr-4 h-32 w-32 flex-shrink-0 basis-1/3 rounded-lg border-2 border-gray-300 p-4">
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
                    {...register("images", {
                      required: "파일을 첨부해 주세요",
                    })}
                  />
                </label>
              </div>
              {imagePreviews.length > 0 && (
                <div className="mb-2 flex w-full basis-1/3 flex-nowrap">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative mr-4 h-32 w-full flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300"
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
        )}

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

        {/* 기존 작성중인 정보가 있을 때 표시되는 모달 */}
        {hasExistingRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
            <div className="w-xs h-xs items-center justify-center overflow-y-auto rounded-lg bg-white p-8">
              <div className="grid justify-items-center">
                <h2 className="mb-4 text-xl font-bold">
                  이미 제출한 증빙 서류가 있습니다.
                </h2>
                <div className="flex flex-col lg:flex-row">
                  <button
                    className="ml-4 mr-4 mt-4 h-10 w-28 rounded bg-focus text-white hover:bg-blue-500"
                    onClick={closeAcademicRecordModal}
                  >
                    수정하기
                  </button>
                  <button
                    className="ml-4 mr-4 mt-4 h-10 w-28 rounded bg-focus text-white hover:bg-blue-500"
                    onClick={() => router.back()}
                  >
                    돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isRejectedRecord && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
            onClick={closeAcademicRecordModal}
          >
            <div className="w-xs h-xs items-center justify-center overflow-y-auto rounded-lg bg-white p-8">
              <div className="grid justify-items-center">
                <h2 className="mb-4 text-xl font-bold">
                  증빙 서류 제출이 거절 당했습니다.
                </h2>
                <p>거절 사유 : {rejectMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-2/3 rounded-md bg-focus p-3 text-white hover:bg-blue-600 lg:w-1/3"
          >
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdataeAcademicRecordPage;