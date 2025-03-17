"use client";

import { AuthService, useFindAccountStore } from "@/shared";
import { FormErrorMessage, FormInput, FormSubmitButton } from "@/entities";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

interface FormData {
  name: string;
  studentId: string;
  phoneNumber: string;
  email: string;
}

const FindPasswordPage = () => {
  const router = useRouter();
  const { studentId, name, email, resetFindAccountStore } =
    useFindAccountStore(
      useShallow((state) => ({
        studentId: state.studentId,
        name: state.name,
        email: state.email,
        resetFindAccountStore: state.resetFindAccountStore,
      })),
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      studentId,
      name,
      email,
    },
  });

  const { useFindPassword } = AuthService();
  const { isSuccess, mutate: findpassword } = useFindPassword();

  const onSubmit = async (data: FormData) => {
    findpassword({
      name: data.name,
      studentId: data.studentId,
      email: data.email,
    });
  };

  const handleRouterToSignIn = () => {
    router.push("/auth/signin");
    resetFindAccountStore();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold">이름</h2>
        <FormInput
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          register={register}
          rules={{ required: "이름을 입력해주세요." }}
        />
        <FormErrorMessage message={errors.name?.message} />

        <h2 className="mb-4 mt-4 text-xl font-semibold">학번</h2>
        <FormInput
          name="studentId"
          type="text"
          placeholder="학번 8자리를 입력해주세요."
          register={register}
          rules={{
            required: "학번을 입력해주세요.",
            pattern: {
              value: /^\d{8}$/,
              message: "학번은 8자리 숫자여야 합니다.",
            },
          }}
        />
        <FormErrorMessage message={errors.studentId?.message} />


        <h2 className="mb-4 mt-4 text-xl font-semibold">아이디 (이메일)</h2>
        <FormInput
          name="email"
          type="email"
          placeholder="아이디를 입력해주세요"
          register={register}
          rules={{ required: "아이디를 입력해주세요." }}
        />
        <FormErrorMessage message={errors.email?.message} />

        {isSuccess ? (
          <button
            className="flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={handleRouterToSignIn}
            type = "button"
          >
            로그인 하기
          </button>
        ) : (
          <FormSubmitButton />
        )}
      </form>
    </div>
  );
};

export default FindPasswordPage;
