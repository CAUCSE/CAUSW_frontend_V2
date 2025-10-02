// 유저 리펙 TODO: 식별자 및 구조 리펙토링 필요.
export type InfoTableEntity = {
  email: string;
  major: string;
  name: string;
  studentId: string;
  admissionYear: string;
  nickname: string;
  graduateYearMonth: string;
  academicStatus: string;
  currentCompletedSemester: string;
  phoneNumber: string;
  createdAt: string;
};

export const titleMapping: Record<keyof InfoTableEntity, string> = {
  email: '아이디(이메일)',
  major: '학부',
  name: '이름',
  studentId: '학번',
  admissionYear: '입학년도',
  nickname: '닉네임',
  graduateYearMonth: '졸업 시기',
  academicStatus: '학적 상태',
  currentCompletedSemester: '등록 완료 학기',
  phoneNumber: '연락처',
  createdAt: '가입 요청',
};

export const convertDataToTableEntity = (
  data: User.UserDto,
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
    createdAt,
  } = data;

  const academicStatusMap: Record<Setting.AdmissionAcademicStatus, string> = {
    ENROLLED: '재학',
    LEAVE_OF_ABSENCE: '휴학',
    GRADUATED: '졸업',
  };

  return {
    email: email ?? '-',
    major: major ?? '-',
    name: name ?? '-',
    // 본 학기 학생회비 적용 여부?
    studentId: studentId ?? '-',
    nickname: nickname ?? '-',
    admissionYear: admissionYear?.toString() ?? '-',
    academicStatus: academicStatusMap[academicStatus] ?? '-',
    graduateYearMonth: graduationYear
      ? graduationYear.toString() + '/' + graduationType?.toString()
      : '-',
    phoneNumber: phoneNumber ?? '-',
    currentCompletedSemester: currentCompletedSemester
      ? currentCompletedSemester.toString() + '차 학기'
      : '-',
    createdAt: createdAt?.split('T')[0].replaceAll('-', '.') ?? '-',
  };
};
