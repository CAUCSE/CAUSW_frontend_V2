import { RegisterOptions } from "react-hook-form";
import { checkEmailDuplicate, checkNicknameDuplicate, checkStudentIdDuplicate } from "../api/get";
export const validationRules: Record<keyof User.SignUpForm, RegisterOptions<User.SignUpForm>> = {
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
    validate: async (value) => {
        if (typeof value !== "string") return "이메일은 문자열이어야 합니다.";
        const isAvailable = await checkEmailDuplicate(value);
        return isAvailable || "이미 사용 중인 이메일입니다다.";
      },
  },
  name: {
    required: "이름을 입력해주세요.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
    pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        message:
          "비밀번호를 8~16자로 영문, 숫자, 특수기호를 조합해서 사용하세요. ",
    },
  },
  pwConfirm: {
    required: "비밀번호 확인을 입력해주세요.",
    validate: (value, formValues) => 
        value === formValues.password || "비밀번호가 일치하지 않습니다.",    
  },
  studentId: {
    required: "학번을 입력해주세요.",
    pattern: {
        value: /^[0-9]{8}$/,
        message: "학번은 8자리 숫자여야 합니다.",
      },
    validate: async (value) => {
        if (typeof value !== "string") return "닉네임은 문자열이어야 합니다.";
        const isAvailable = await checkStudentIdDuplicate(value);
        return isAvailable || "이미 사용 중인 학번입니다다.";
      },
  },
  admissionYearString: {
    required: "입학년도를 입력해주세요.",

},
  nickname: {
    required: "닉네임을 입력해주세요.",
    validate: async (value) => {
        if (typeof value !== "string") return "닉네임은 문자열이어야 합니다.";
        if (!value.trim()) return "올바른 닉네임이 아닙니다.";
        const isAvailable = await checkNicknameDuplicate(value);
        return isAvailable || "이미 사용 중인 닉네임입니다.";
      },
  },
  major: {
    required: "학과를 입력해주세요.",
  },
  agreeToTerms: {
    required: "약관에 동의해주세요.",
  },
  phoneNumber: { 
    required: "휴대폰 번호를 입력해주세요.",
    pattern: {
        value: /^\d{3}-\d{3,4}-\d{4}$/,
        message: "ex) 010-1234-5678 형식으로 입력해주세요.",
      },
  },
    agreeToPopup: {
        required: "알림에 동의해주세요.",
    },
};
