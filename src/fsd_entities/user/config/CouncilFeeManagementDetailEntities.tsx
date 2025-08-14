// 유저 리펙 TODO: 식별자 및 구조 리펙토링 필요.
export type InfoTableEntity = {
  email: string;
  major: string;
  userName: string;
  // 본 학기 학생회비 적용 여부?
  isAppliedThisSemester: string;
  studentId: string;
  nickname: string;
  admissionYear: string;
  academicStatus: string;
  graduateYearMonth: string;
  phoneNumber: string;
  currentCompletedSemester: string;
  payedAt: string;
  joinedAt: string;
  numOfPaidSemester: string;
  restOfSemester: string;
  isRefunded: string;
  refundedAt?: string;
  isJoinedService: string;
};

export const convertDataToTableEntity = (data: Setting.UserCouncilFeeInfoDTO): InfoTableEntity => {
  const {
    email,
    major,
    userName,
    studentId,
    currentCompletedSemester,
    admissionYear,
    nickname,
    graduationYear,
    graduationType,
    academicStatus,
    phoneNumber,
    isAppliedThisSemester,
    paidAt,
    joinedAt,
    refundedAt,
    numOfPaidSemester,
    restOfSemester,
    isRefunded,
    isJoinedService,
  } = data;

  return {
    email: email ?? '-',
    major: major ?? '-',
    userName: userName ?? '-',
    // 본 학기 학생회비 적용 여부?
    isAppliedThisSemester: isAppliedThisSemester ? 'O' : 'X',
    studentId: studentId ?? '-',
    nickname: nickname ?? '-',
    admissionYear: admissionYear.toString() || '-',
    academicStatus: academicStatus ?? '-',
    graduateYearMonth: graduationYear?.toString() ?? '-',
    phoneNumber: phoneNumber ?? '-',
    currentCompletedSemester: currentCompletedSemester ? currentCompletedSemester?.toString() + '차 학기' : '-',
    payedAt: paidAt ? paidAt.toString() + '차 학기' : '-',
    joinedAt: joinedAt ?? '-',
    numOfPaidSemester: numOfPaidSemester ? numOfPaidSemester.toString() + '차 학기 분' : '-',
    restOfSemester: restOfSemester ? restOfSemester.toString() + '차 학기' : '-',
    isRefunded: isRefunded ? 'Yes' : 'No',
    refundedAt: isRefunded ? refundedAt.toString() + '차 학기' : '-',
    isJoinedService: isJoinedService ? 'Yes' : 'No',
  };
};

export const titleMapping: Record<keyof InfoTableEntity, string> = {
  email: '아이디(이메일)',
  major: '학부',
  userName: '이름',
  isAppliedThisSemester: '본 학기 학생회비 적용 여부',
  studentId: '학번',
  nickname: '닉네임',
  admissionYear: '입학년도',
  academicStatus: '학적 상태',
  graduateYearMonth: '졸업 시기',
  phoneNumber: '연락처',
  currentCompletedSemester: '등록 완료 학기',
  payedAt: '학생회비 납부 시점 학기',
  joinedAt: '가입 요청',
  numOfPaidSemester: '학생회비 납부 차수',
  restOfSemester: '잔여 학생회비 적용 학기',
  isRefunded: '학생회비 환불 여부',
  refundedAt: '학생회비 환불 시점 학기',
  isJoinedService: '동문네트워크 가입 여부',
};
