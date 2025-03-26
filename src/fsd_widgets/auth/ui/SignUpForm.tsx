"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PreviousButton } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { signup, SignUpSubmitButton } from "@/fsd_entities/auth";
import { SignUpHeader } from "./SignUpHeader";
import { SignUpFormFields } from "./SignUpFormFields";

const allowedKeys = [
    "email",
    "nickname",
    "password",
    "studentId",
    "name",
    "major",
    "phoneNumber",
    "admissionYear",
  ] as readonly string[];
  

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User.SignUpForm>({mode: "onBlur"});

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!");
    },
    onError: (error: any) => {
      toast.error("회원가입 실패:", error);
    },
  });
  

  const onSubmit = (data: User.SignUpForm) => {
    const postData = {
        ...data,
        admissionYear: data.admissionYearString,
      };
      
    const newPostData = allowedKeys.reduce((acc, key) => {
        
        acc[key] = postData[key];
        return acc;
      }, {} as Partial<User.SignUpFormPost>);
      mutation.mutate(newPostData as User.SignUpFormPost);
    };
    const onInvalid = () => {
        toast.error("모든 항목을 조건에 맞게 입력해주세요."); };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col items-center justify-center gap-y-4">
      <PreviousButton variant="white"></PreviousButton>
      <SignUpHeader></SignUpHeader>
      <SignUpFormFields register={register} errors={errors} watch={watch} />
      <SignUpSubmitButton/>
    </form>
  );
};

export default SignUpForm;
