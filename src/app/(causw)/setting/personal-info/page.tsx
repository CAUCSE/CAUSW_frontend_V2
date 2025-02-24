"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import {
  UserService,
  UserRscService,
  UserCouncilFeeService,
  AuthService,
} from "@/shared";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingComponent } from "@/entities";


const PersonalInfoPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<User.userUpdateDto>({
    defaultValues: {
      profileImage: null,
      nickname: "",
    },
  });

  const [studentCouncilFeeStatus, setStudentCouncilFeeStatus] = useState("");
  const [paidFeeSemesters, setpaidFeeSemesters] = useState("");
  const [remainingFeeSemesters, setRemainingFeeSemesters] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(
    "/images/default_profile.png",
  );

  // 원래의 학적 상태 저장
  const router = useRouter();
  const { getUserCouncilFeeInfo } = UserCouncilFeeService();
  const { updateInfo } = UserRscService();
  const { checkNicknameDuplicate } = AuthService();

  // 제출 시 모달
  const {data: userData, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async() => {
      const response = await getMyInfo();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안 데이터를 최신 상태로 유지
  })

  useEffect(() => {
    if (userData) {
      setProfileImagePreview(
        userData.profileImage ?? "/images/default_profile.png",
      );
      setValue("nickname", userData.nickname);
      setValue("phoneNumber", userData.phoneNumber ?? "");
    }
  }, [userData, setProfileImagePreview, setValue])

  const { getMyInfo } = UserService();
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        //  학생회비 납부 정보 받아오기
        const responseUserCouncilFeeData = await getUserCouncilFeeInfo();
        const userCouncilFeeData = responseUserCouncilFeeData.data;

        setStudentCouncilFeeStatus(
          userCouncilFeeData.isAppliedThisSemester === true ? "O" : "X",
        );
        setpaidFeeSemesters(`${userCouncilFeeData.numOfPaidSemester}학기`);
        setRemainingFeeSemesters(`${userCouncilFeeData.restOfSemester}학기`);
      } catch (error: any) {
        console.error("Failed to fetch user info:", error?.message);
        setStudentCouncilFeeStatus("X");
        setpaidFeeSemesters(`0학기`);
        setRemainingFeeSemesters(`0학기`);
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImagePreview(newImageUrl);
      setValue("profileImage", file);
    }
  };

  // 닉네임 중복 검사 및 형식 검사
  const handleNicknameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (!nickname || nickname === userData.nickname) return; // 빈 값일 경우 무시

    // 닉네임 길이 및 형식 검사
    if (nickname.length < 1 || nickname.length > 16) {
      setError("nickname", {
        type: "length",
        message: "닉네임은 1글자 이상 16글자 이내로 입력해주세요.",
      });
      return;
    } else {
      clearErrors("nickname");
    }

    // 닉네임 중복 검사
    const isDuplicate = await checkNicknameDuplicate(nickname);
    if (isDuplicate) {
      setError("nickname", {
        type: "duplicate",
        message: "이미 사용 중인 닉네임입니다.",
      });
    } else {
      clearErrors("nickname");
    }
  };

  // 개인정보 수정한 내용 제출하는 함수
  const onSubmit = async (data: User.userUpdateDto, event) => {
    try {
      event.preventDefault();
      await updateInfo(data);
      toast.success("변경 사항이 저장되었습니다.")
} catch (error: any) {
      if (error.status === 400) {
        toast.error("중복된 닉네임입니다.")
      } else {
        toast.error("알 수 없는 에러가 발생했습니다.");
      }
    }
  };




if (isLoading) return <LoadingComponent />;
if (error) return <p>에러 발생!</p>;


  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* 이전 버튼 */}
        <div className="justify-left sticky top-0 mb-4 flex w-full items-center bg-[#F8F8F8] py-2">
          <button
            onClick={() => router.push("/setting")}
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

        <h1 className="mb-6 text-3xl font-bold">개인정보 관리</h1>

        {/* 반응형 그리드 */}
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 왼쪽: 프로필 사진, 닉네임, 학적 상태 */}
          <div className="flex flex-col items-center lg:flex lg:items-center lg:justify-center">
            <img
              src={profileImagePreview}
              alt="프로필"
              className="mb-4 h-32 w-32 rounded-full object-cover lg:h-32 lg:w-32"
            />
            <label
              htmlFor="profileImage"
              className="text-black-500 flex w-32 cursor-pointer justify-center rounded-3xl bg-focus p-3 text-sm text-white hover:bg-blue-600 lg:w-40"
            >
              프로필 사진 수정
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleProfileImageChange}
            />

            {/* 닉네임과 학적 상태 */}
            <div className="mt-4 flex w-full flex-row lg:flex-col">
              <div className="mb-4 ml-4 w-1/2 lg:w-full">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  닉네임
                </label>
                <input
                  type="text"
                  {...register("nickname", { required: true })}
                  onBlur={handleNicknameBlur}
                  className="w-full rounded-md border border-gray-300 p-2 lg:w-5/6"
                />
                {errors.nickname && (
                  <p className="text-red-500">{errors.nickname.message}</p>
                )}
              </div>

              <div className="mb-4 ml-4 w-1/2 lg:w-full">
                <div className="w-full lg:w-full">
                  <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                    학적 상태
                  </label>
                  <div className="flex w-full flex-row flex-wrap rounded-md sm:flex-nowrap lg:w-5/6">
                    <div className="mb-2 mr-2 w-full rounded-md border border-gray-300 p-2 text-center lg:w-3/6">
                      {userData.academicStatus === "ENROLLED" && <>재학</>}
                      {userData.academicStatus === "LEAVE_OF_ABSENCE" && <>휴학</>}
                      {userData.academicStatus === "GRADUATED" && <>졸업</>}
                    </div>
                    <button
                      onClick={() => {
                        window.location.href = "/setting/personal-info/update-academic-record";
                      }}
                      className="mb-2 mr-2 w-full rounded-md border border-gray-300 bg-focus p-2 text-center text-white lg:w-5/6"
                    >
                      학적 상태 수정
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 이메일, 이름, 학번 등 */}
          <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-between">
            <div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  이름
                </label>
                <p className="text-gray-700">{userData.name}</p>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  이메일
                </label>
                <p className="text-gray-700">{userData.email}</p>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  학번
                </label>
                <p className="text-gray-700">{userData.studentId}</p>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  입학 년도
                </label>
                <p className="text-gray-700">{userData.admissionYear}</p>
              </div>

              {userData.academicStatus === "GRADUATED" && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                    졸업 년도
                  </label>
                  <p className="text-gray-700">{userData.graduationYear}</p>
                </div>
              )}
            </div>

            <div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  등록 완료 학기
                </label>
                <p className="text-gray-700">{userData.currentCompletedSemester}</p>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  학부(학과)
                </label>
                <p className="text-gray-700">{userData.major}</p>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  본 학기 학생회비 적용 여부
                </label>
                <p className="text-gray-700">{studentCouncilFeeStatus}</p>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  납부한 학생회비 학기 차수
                </label>
                <p className="text-gray-700">{paidFeeSemesters}</p>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
                  남은 학생회비 차수
                </label>
                <p className="text-gray-700">{remainingFeeSemesters}</p>
              </div>
            </div>
          </div>
        </div>



        {/* 변경 사항 저장 버튼 */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-32 rounded-3xl bg-focus p-3 text-white hover:bg-blue-600 lg:w-80"
          >
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoPage;
