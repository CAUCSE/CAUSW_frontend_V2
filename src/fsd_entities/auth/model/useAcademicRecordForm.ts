import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postAcademicRecord } from "../api/post";
import { useRouter } from "next/navigation";

interface userInfoProps {
    curAcademicStatus: string;
}

export const useAcademicRecordForm = ({curAcademicStatus}: userInfoProps) => {

    const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User.CreateUserAcademicRecordApplicationRequestDto>({ mode: "onBlur" });

  const { mutate: submitAcademicRecord } = useMutation({
    mutationFn: postAcademicRecord,
    onSuccess: () => {
      toast.success("증빙 서류 제출이 완료되었습니다!");
    },
    onError: (error: any) => {
      toast.error(error.message || "증빙 서류 제출 도중 오류가 발생했습니다.");
    },
  });

  
  const onSubmit = (data: User.CreateUserAcademicRecordApplicationRequestDto) => {
    if (data.targetAcademicStatus === "ENROLLED" && !data.images) {
        toast.error("이미지를 첨부해주세요.");
        return;
    }
    submitAcademicRecord(data as User.CreateUserAcademicRecordApplicationRequestDto);
    setTimeout(() => {
        router.push(curAcademicStatus === "UNDEFINED" 
            && data.targetAcademicStatus !== "ENROLLED" ? "/auth/signin" : "./"); 
            // UNDEFINED -> 휴학, 졸업일 경우 바로 로그인 가능하므로 로그인인 페이지로 보냄
    }, 500);
};

const onInvalid = () => {
    toast.error("모든 항목을 조건에 맞게 입력해주세요."); 
};
  

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