import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postAcademicRecord } from "../api/post";

export const useAcademicRecordForm = () => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User.CreateUserAcademicRecordApplicationRequestDto>({ mode: "onBlur" });

  const mutation = useMutation({
    mutationFn: postAcademicRecord,
    onSuccess: () => {
      toast.success("증빙 서류 제출이 완료되었습니다!");
    },
    onError: (error: any) => {
      toast.error(error.message || "알 수 없는 오류가 발생했습니다.");
    },
  });

  
  const onSubmit = (data: User.CreateUserAcademicRecordApplicationRequestDto) => {
    if (!data.images) {
        toast.error("이미지를 첨부해주세요.");
    }
    console.log(data);
    // mutation.mutate(data as User.CreateUserAcademicRecordApplicationRequestDto);
};

const onInvalid = () => {
    toast.error("모든 항목을 조건에 맞게 입력해주세요."); };
  

return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    onInvalid,
    setValue,
  };
};