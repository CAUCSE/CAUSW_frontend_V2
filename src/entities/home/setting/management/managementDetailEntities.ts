type state = "admission" | "drop" | "active" | "inactive_n_drop" | "inactive";

export const managementDetailEntities: Record<
  state,
  {
    titleSuffix: string;
    buttons: {
      name: string;
      variant: "BLUE" | "RED" | "GRAY";
      action: () => void;
    }[];
  }
> = {
  admission: {
    titleSuffix: "가입 신청서 내용",
    buttons: [
      {
        name: "승인",
        variant: "BLUE",
        action: () => {
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
