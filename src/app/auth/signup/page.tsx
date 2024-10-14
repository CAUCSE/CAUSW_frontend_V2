"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation"; // useRouter import
import { AuthService } from "@/shared";
import { UseTerms } from "@/entities/home/useTerms";
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<User.SignUpForm>({ mode: "onBlur" });
  const router = useRouter(); // useRouter 초기화

  const {
    signup,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    checkStudentIdDuplicate,
  } = AuthService();


    // 엔터키를 누를 때 기본 동작을 방지하는 함수
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 엔터키의 기본 동작 방지
      }
    };

  // 이메일 중복 및 형식 검사
  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (!email) return; // 빈 값일 경우 무시

    // 이메일 형식 검사
    const emailPattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(email)) {
      setError("email", {
        type: "pattern",
        message: "이메일 형식으로 입력해주세요.",
      });
      return;
    } else {
      clearErrors("email");
    }

    // 이메일 중복 검사
    const isDuplicate = await checkEmailDuplicate(email);
    if (isDuplicate) {
      setError("email", {
        type: "duplicate",
        message: "이미 사용 중인 이메일입니다.",
      });
    } else {
      clearErrors("email");
    }
  };

  // 닉네임 중복 검사 및 형식 검사
  const handleNicknameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (!nickname) return; // 빈 값일 경우 무시

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

  // 학번 중복 및 형식 검사
  const handleStudentIdBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const studentId = e.target.value;

    if (!studentId) return; // 빈 값일 경우 무시

    // 학번 형식 검사
    const studentIdPattern = /^\d{8}$/;
    if (!studentIdPattern.test(studentId)) {
      setError("studentId", {
        type: "pattern",
        message: "학번은 8자리로 입력해주세요.",
      });
      return;
    } else {
      clearErrors("studentId");
    }

    // 학번 중복 검사
    const isDuplicate = await checkStudentIdDuplicate(studentId);
    if (isDuplicate) {
      setError("studentId", {
        type: "duplicate",
        message: "이미 사용 중인 학번입니다.",
      });
    } else {
      clearErrors("studentId");
    }
  };

  // 뒤로가기 버튼
  const handleBack = () => {
    router.push("/auth/signin");
  };

  // 비밀번호 숨김 / 보임 기능

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  // 입학 년도, 혹은 졸업 년도 리스트 저장
  const startYear = 1972;
  const currentYear = new Date().getFullYear();
  const yearOptions: any[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(year);
  }

  // 수행한 학기 배열로 저장 1-1, 1-2, 2-1 ... 4-2 순서대로
  const currentCompletedSemester: any[] = [];
  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 2; k++) {
      currentCompletedSemester.push(`${j}학년 ${k}학기`);
    }
  }

  // 이용약관 선택 여부
  const handleCheckboxChange = (checked: boolean) => {
    setValue("agreeToTerms", checked);
    setValue("agreeToPopup", checked);
  };

  // 이용 약관 모달 창
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 회원가입 성공, 혹은 실패 시 모달
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [countdown, setCountdown] = useState(0);

  const closeCompleteModal = () => {
    if (isSuccessModalOpen) {
      router.push("/auth/signin");
    } else {
      setIsSuccessModalOpen(false);
      setIsErrorModalOpen(false);
    }
  };

  // 제출
  const onSubmit = async (data: User.SignUpForm) => {
    try {
      const {
        email,
        name,
        password,
        studentId,
        admissionYearString,
        nickname,
        major,
        phoneNumberHyphen,
      } = data;

      // phoneNumber에서 하이픈 빼서 저장
      const phoneNumber = phoneNumberHyphen.replace(/-/g, "");

      // admissionYear 숫자 값으로 저장
      const admissionYear = Number(admissionYearString);

      const selectedData = {
        email,
        name,
        password,
        studentId,
        admissionYear,
        nickname,
        major,
        phoneNumber,
      };

      const response = await signup(selectedData); // signup 함수 호출

      if (response) {
        // 성공한 경우
        setIsSuccessModalOpen(true);
        setCountdown(5);

        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsSuccessModalOpen(false);
              router.push("/auth/signin"); // 성공 시 리다이렉션
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error: any) {
      // 에러 발생 시 처리
      console.error("SignUp error:", error);
      setIsErrorModalOpen(true);
      setServerError(error.message || "회원가입 중 문제가 발생했습니다."); // 에러 메시지 처리
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
    <div className="bg-white-100 flex min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex w-80 flex-col items-center md:w-[580px] lg:w-[580px]"
      >
        <div className="sticky left-4 top-0 z-10 mb-4 mt-8 flex w-full items-center bg-white py-2 text-lg">
          <button
            onClick={handleBack}
            className="text-black-500 items-left flex hover:text-gray-500"
          >
            <span className="icon-[weui--back-filled] mr-3 mt-[2px] text-2xl font-bold"></span>
            <span>이전</span>
          </button>
        </div>
        <h1 className="mb-6 mt-3 text-center text-2xl font-bold sm:text-3xl">
          회원가입
        </h1>

        <div className="flex w-full flex-col sm:w-[600px] sm:flex-row">
          <div className="sm:w-1/2">
            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                아이디
              </label>
              <input
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                type="text"
                placeholder="이메일 형식으로 입력해주세요"
                {...register("email", {
                  required: "아이디를 입력해주세요",
                })}
                onBlur={handleEmailBlur}
                onKeyDown={handleKeyDown}
              />
              {errors.email && (
                <p className="text-error">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                비밀번호
              </label>
              <div className="flex w-full">
                <input
                  className="mr-4 w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자리 이상, 영어/숫자/특수 문자 조합"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "8글자 이상 입력해주세요",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                      message:
                        "비밀번호를 8~16자로 영문, 숫자, 특수기호를 조합해서 사용하세요. ",
                    },
                  })}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className=""
                >
                  {" "}
                  {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </button>
              </div>
              <p className="text-error">{errors?.password?.message}</p>
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                비밀번호 확인
              </label>
              <div className="flex w-full">
                <input
                  className="mr-4 w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="8자리 이상, 영어/숫자/특수 문자 조합"
                  {...register("pwConfirm", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "8글자 이상 입력해주세요",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                      message:
                        "비밀번호를 8~16자로 영문, 숫자, 특수기호를 조합해서 사용하세요. ",
                    },
                    validate: {
                      check: (val) => {
                        if (getValues("password") !== val) {
                          return "비밀번호가 일치하지 않습니다.";
                        }
                      },
                    },
                  })}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={togglePasswordConfirmVisibility}
                  className=""
                >
                  {" "}
                  {showPasswordConfirm ? (
                    <FaEye></FaEye>
                  ) : (
                    <FaEyeSlash></FaEyeSlash>
                  )}
                </button>
              </div>

              <p className="text-error">{errors?.pwConfirm?.message}</p>
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                이름
              </label>
              <input
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                type="text"
                placeholder="이름을 입력해주세요"
                {...register("name", {
                  required: "이름을 입력해주세요",
                })}
                onKeyDown={handleKeyDown}
              />
              <p className="text-error">{errors?.name?.message}</p>
            </div>
          </div>

          <div className="sm:w-1/2">
            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                닉네임
              </label>
              <input
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                type="text"
                placeholder="닉네임을 입력해주세요"
                {...register("nickname", {
                  required: "닉네임을 입력해주세요",
                })}
                onBlur={handleNicknameBlur}
                onKeyDown={handleKeyDown}
              />
              {errors.nickname && (
                <p className="text-error">{errors.nickname.message}</p>
              )}
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                입학년도
              </label>
              <select
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                {...register("admissionYearString", {
                  required: "입학 년도를 선택해주세요",
                })}
                onKeyDown={handleKeyDown}
              >
                <option value="">-선택해주세요-</option>
                {yearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className="text-error">
                {errors?.admissionYearString?.message}
              </p>
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                학번
              </label>
              <input
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                type="number"
                placeholder="학번 8자리를 입력해주세요"
                {...register("studentId", {
                  required: "학번을 입력해주세요",
                })}
                onBlur={handleStudentIdBlur}
                onKeyDown={handleKeyDown}
              />
              <p className="text-error">{errors?.studentId?.message}</p>
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                학부/학과
              </label>
              <input
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                type="text"
                placeholder="ex) 소프트웨어학부, 컴퓨터공학부"
                {...register("major", {
                  required: "학부/학과를 입력해주세요",
                })}
                onKeyDown={handleKeyDown}
              />
              <p className="text-error">{errors?.major?.message}</p>
            </div>

            <div className="mb-6 ml-4 mr-4">
              <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
                연락처
              </label>
              <input
                className="w-full max-w-md rounded-lg border-2 border-gray-300 p-2"
                type="text"
                placeholder="- 없이 작성해주세요. ex) 01012341234"
                {...register("phoneNumberHyphen", {
                  required: "연락처를 입력해주세요",
                  pattern: {
                    value: /^([0-9]{10,11})$/,
                    message: "전화번호 형식이 아닙니다.",
                  },
                })}
                onKeyDown={handleKeyDown}
              />
              <p className="text-error">{errors?.phoneNumberHyphen?.message}</p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex w-[calc(100%-30px)] flex-col sm:w-[565px]">
          <div className="-ml-2 flex items-center pl-2">
            <input
              type="checkbox"
              className="mr-2"
              {...register("agreeToTerms", {
                required: "약관에 동의해주세요",
                onChange: (e) => handleCheckboxChange(e.target.checked),
              })}
            />

            <label htmlFor="terms">
              <label
                className="cursor-pointer text-lg text-gray-700 underline"
                onClick={openModal}
              >
                약관 읽고 동의하기
              </label>
            </label>
          </div>
          <div className="mb-2 ml-5">
            {errors.agreeToTerms && (
              <p className="text-error">{errors.agreeToTerms.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-focus p-2 text-lg text-white transition-colors duration-300 hover:bg-blue-400"
          >
            생성하기
          </button>
        </div>
      </form>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="items-center justify-center overflow-y-auto rounded-lg bg-white p-8">
            <div className="grid justify-items-center">
              <h2 className="mb-4 text-xl font-bold">회원가입 완료</h2>
              <p>회원가입이 성공적으로 완료되었습니다!</p>
              <button
                onClick={closeCompleteModal}
                className="mt-6 w-2/3 rounded-lg bg-focus p-2 p-4 text-sm text-white hover:bg-blue-500"
              >
                로그인 창으로 바로 이동
              </button>
              <p className="mt-4 text-gray-500">
                {" "}
                ({countdown}초 후에 로그인 창으로 이동합니다.)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 회원가입 도중 에러 발생했을 때 표시되는 모달 */}
      {isErrorModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
          onClick={closeCompleteModal}
        >
          <div className="ml-4 mr-4 w-full max-w-xs rounded-lg bg-white p-6">
            <div className="grid justify-items-center">
              <h2 className="mb-4 text-xl font-bold">회원가입 실패</h2>
              <p>{serverError}</p>
            </div>
          </div>
        </div>
      )}

      {/* 이용약관 모달 */}
      {isModalOpen && (
        <UseTerms
          closeModal={() => {
            setIsModalOpen(false);
          }}
        ></UseTerms>
      )}
    </div>
  );
};

export default SignUpPage;
