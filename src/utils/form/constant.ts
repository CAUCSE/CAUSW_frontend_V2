export const FORM_CONSTANT = () => {
  const detailUserInfoLeftKeys: (keyof Form.ReplyUserResponseDto)[] = [
    "email",
    "name",
    "nickName",
    "admissionYear",
    "studentId",
    "major",
    "phoneNumber",
    "academicStatus",
    "currentCompletedSemester",
  ];

  const detailUserInfoLeftKeyValue = [
    "아이디(이메일)",
    "이름",
    "닉네임",
    "입학년도",
    "학번",
    "학부/학과",
    "연락처",
    "학적 상태",
    "현재 등록 완료된 학기",
  ];

  const detailUserInfoRightKey: (keyof Form.ReplyUserResponseDto)[] = [
    "graduationYear",
    "createdAt",
    "isAppliedThisSemester",
    "paidAt",
    "numOfPaidSemester",
    "restOfSemester",
    "isRefunded",
  ];

  const detailUserInfoRightKeyValue = [
    "졸업시기",
    "가입일",
    "본 학기 학생회비 납부 여부",
    "학생회비 납부 시점",
    "학생회비 납부 차수",
    "잔여 학생회비 적용 학기",
    "학생회비 환불 여부",
  ];

  const SEMESTER: { [key: string]: string } = {
    1: "1-1",
    2: "1-2",
    3: "2-1",
    4: "2-2",
    5: "3-1",
    6: "3-2",
    7: "4-1",
    8: "4-2",
    9: "5-1",
  };

  const ACADEMIC_STATUS: { [key: string]: string } = {
    ENROLLED: "재학",
    LEAVE_OF_ABSENCE: "휴학",
    GRADUATED: "졸업",
    DROPPED_OUT: "중퇴",
    SUSPEND: "정학",
    EXPEL: "퇴학",
    PROFESSOR: "교수",
    UNDETERMINED: "미정",
  };

  return {
    detailUserInfoLeftKeys,
    detailUserInfoLeftKeyValue,
    detailUserInfoRightKey,
    detailUserInfoRightKeyValue,
    SEMESTER,
    ACADEMIC_STATUS,
  };
};
