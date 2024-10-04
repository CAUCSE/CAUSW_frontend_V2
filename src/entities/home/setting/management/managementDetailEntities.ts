import { SettingRscService } from "@/shared";
import { Setting } from "@/shared/@types/setting";

type state = "admission" | "drop" | "active" | "inactive_n_drop" | "inactive";

export const uiEntities: Record<
  state,
  {
    titleSuffix: string;
    buttons: {
      name: string;
      variant: "BLUE" | "RED" | "GRAY";
      action: (...args: any) => void;
    }[];
  }
> = {
  admission: {
    titleSuffix: "가입 신청서 내용",
    buttons: [
      {
        name: "승인",
        variant: "BLUE",
        action: async (admissionId) => {
          const { acceptAdmission } = SettingRscService();
          if (await acceptAdmission(admissionId)) return;
          alert("승인에 실패했습니다. 관리자에게 문의하세요");
          console.log("승인");
        },
      },
      {
        name: "거부",
        variant: "GRAY",
        action: () => {
          console.log("거부");
        },
      },
    ],
  },
  drop: {
    titleSuffix: "가입 신청서 내용",
    buttons: [
      {
        name: "재승인",
        variant: "BLUE",
        action: () => {
          console.log("재승인");
        },
      },
      {
        name: "목록에서 삭제",
        variant: "RED",
        action: () => {
          console.log("목록에서 삭제");
        },
      },
    ],
  },
  active: {
    titleSuffix: "정보",
    buttons: [
      {
        name: "닫기",
        variant: "BLUE",
        action: () => {
          console.log("닫기");
        },
      },
      {
        name: "추방",
        variant: "RED",
        action: () => {
          console.log("추방");
        },
      },
    ],
  },
  inactive_n_drop: {
    titleSuffix: "정보",
    buttons: [
      {
        name: "닫기",
        variant: "BLUE",
        action: () => {
          console.log("닫기");
        },
      },
      {
        name: "목록에서 삭제",
        variant: "RED",
        action: () => {
          console.log("목록에서 삭제");
        },
      },
    ],
  },
  inactive: {
    titleSuffix: "정보",
    buttons: [
      {
        name: "탈퇴 복구",
        variant: "BLUE",
        action: () => {
          console.log("탈퇴 복구");
        },
      },
      {
        name: "목록에서 삭제",
        variant: "RED",
        action: () => {
          console.log("목록에서 삭제");
        },
      },
    ],
  },
};

export type InfoTableEntity = {
  email: string;
  major: string;
  name: string;
  studentId: string;
  leftPayedSemester: string;
  admissionYear: string;
  nickname: string;
  graduateYearMonth: string;
  academicStatus: string;
  enrolledSemester: string;
  phoneNumber: string;
  requestedAt: string;
  evidentImg: string;
};

export const convertDataToTableEntity = (
  data: Setting.GetAdmissionResponseDto,
): InfoTableEntity => {
  const {
    email,
    major,
    name,
    studentId,
    currentCompletedSemester,
    admissionYear,
    nickname,
    graduationYear,
    graduationType,
    academicStatus,
    phoneNumber,
  } = data.user;
  const { createdAt: requestedAt, attachImageUrlList } = data;
  const evidentImg = attachImageUrlList[0];

  const academicStatusMap: Record<Setting.AdmissionAcademicStatus, string> = {
    ENROLLED: "재학",
    LEAVE_OF_ABSENCE: "휴학",
    GRADUATED: "졸업",
  };

  return {
    email,
    major,
    name,
    studentId,
    leftPayedSemester: `${8 - currentCompletedSemester}차 학기`,
    admissionYear: admissionYear.toString(),
    nickname,
    graduateYearMonth: `${graduationYear}/${+graduationType < 10 ? "0" + graduationType : graduationType}`,
    academicStatus: academicStatusMap[academicStatus],
    enrolledSemester: `${currentCompletedSemester}차 학기`,
    phoneNumber,
    requestedAt: requestedAt.split("T")[0].replaceAll("-", "."),
    evidentImg,
  };
};

export const titleMapping: Record<keyof InfoTableEntity, string> = {
  email: "아이디(이메일)",
  major: "학부",
  name: "이름",
  studentId: "학번",
  leftPayedSemester: "잔여 학생회비 적용 학기",
  admissionYear: "입학년도",
  nickname: "닉네임",
  graduateYearMonth: "졸업 시기",
  academicStatus: "학적 상태",
  enrolledSemester: "등록 완료 학기",
  phoneNumber: "연락처",
  requestedAt: "가입 요청 일시",
  evidentImg: "학부 재적/졸업 증빙 자료",
};