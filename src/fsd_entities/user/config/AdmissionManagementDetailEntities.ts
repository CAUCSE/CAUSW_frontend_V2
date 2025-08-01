// 유저 리펙 TODO: 식별자 및 구조 리펙토링 필요.
import toast from 'react-hot-toast';

import { acceptAdmission, restoreUser } from '../api';
import { ManagementState } from '../model';

const admitTarget = async (userId) => {
  try {
    await acceptAdmission(userId);
    toast.success('승인이 완료되었습니다.');
    setTimeout(() => {
      window.location.assign(`/setting/management/user/admission`);
    }, 500);
  } catch {
    toast.error('승인에 실패했습니다. 관리자에게 문의하세요');
  }
};

const restoreTarget = async (userId) => {
  try {
    await restoreUser(userId);
    toast.success('사용자가 복구되었습니다다.');
    setTimeout(() => {
      window.location.assign(`/setting/management/user/active`);
    }, 500);
  } catch (error) {
    toast.error('복구에 실패했습니다. 관리자에게 문의하세요');
  }
};

export const uiEntities: Record<
  ManagementState,
  {
    titleSuffix: string;
    buttons: {
      name: string;
      variant: 'BLUE' | 'RED' | 'GRAY';
      action: (admission: Setting.GetAdmissionResponseDto) => void;
    }[];
  }
> = {
  admission: {
    titleSuffix: '가입 신청서 내용',
    buttons: [
      {
        name: '승인',
        variant: 'BLUE',
        action: async (admission) => {
          await admitTarget(admission.id);
        },
      },
      {
        name: '거부',
        variant: 'GRAY',
        action: async () => {},
      },
    ],
  },
  reject: {
    titleSuffix: '가입 신청서 내용',
    buttons: [
      {
        name: '닫기',
        variant: 'BLUE',
        action: () => {
          window.history.back();
        },
      },
      {
        name: '목록에서 삭제',
        variant: 'RED',
        action: async () => {},
      },
    ],
  },
  active: {
    titleSuffix: '정보',
    buttons: [
      {
        name: '닫기',
        variant: 'BLUE',
        action: () => {
          window.history.back();
        },
      },
      {
        name: '추방',
        variant: 'RED',
        action: async () => {},
      },
    ],
  },
  drop: {
    titleSuffix: '정보',
    buttons: [
      {
        name: '복구',
        variant: 'BLUE',
        action: async (admission) => {
          await restoreTarget(admission.id);
        },
      },
      {
        name: '목록에서 삭제',
        variant: 'RED',
        action: async () => {},
      },
    ],
  },
  inactive: {
    titleSuffix: '정보',
    buttons: [
      {
        name: '탈퇴 복구',
        variant: 'BLUE',
        action: async (admission) => {
          await restoreTarget(admission.id);
          window.location.assign(`/setting/management/user/inactive`);
        },
      },
      {
        name: '목록에서 삭제',
        variant: 'RED',
        action: () => {},
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

export const convertAdmissionDataToTableEntity = (data: Setting.GetAdmissionResponseDto): InfoTableEntity => {
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
    ENROLLED: '재학',
    LEAVE_OF_ABSENCE: '휴학',
    GRADUATED: '졸업',
  };

  return {
    email,
    major,
    name,
    studentId,
    leftPayedSemester: `${8 - currentCompletedSemester}차 학기`,
    admissionYear: admissionYear.toString(),
    nickname,
    graduateYearMonth: `${graduationYear}/${+graduationType < 10 ? '0' + graduationType : graduationType}`,
    academicStatus: academicStatusMap[academicStatus],
    enrolledSemester: `${currentCompletedSemester}차 학기`,
    phoneNumber,
    requestedAt: requestedAt.split('T')[0].replaceAll('-', '.'),
    evidentImg,
  };
};

export const convertUserDataToTableEntity = (data: any): any => {
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
  } = data;
  const { createdAt: requestedAt, profileImageUrl } = data;
  const evidentImg = profileImageUrl ? profileImageUrl : '';

  const academicStatusMap: Record<Setting.AdmissionAcademicStatus, string> = {
    ENROLLED: '재학',
    LEAVE_OF_ABSENCE: '휴학',
    GRADUATED: '졸업',
  };
  const rejectionOrDropReason = data.rejectionOrDropReason || '';
  return {
    email,
    major,
    name,
    studentId,
    leftPayedSemester: `${8 - currentCompletedSemester}차 학기`,
    admissionYear: admissionYear.toString(),
    nickname,
    graduateYearMonth: `${graduationYear}/${+graduationType < 10 ? '0' + graduationType : graduationType}`,
    academicStatus: academicStatusMap[academicStatus],
    enrolledSemester: `${currentCompletedSemester}차 학기`,
    phoneNumber,
    requestedAt: requestedAt.split('T')[0].replaceAll('-', '.'),
    evidentImg,
    rejectionOrDropReason,
  };
};

export const titleMapping: Record<keyof InfoTableEntity, string> = {
  email: '아이디(이메일)',
  major: '학부',
  name: '이름',
  studentId: '학번',
  leftPayedSemester: '잔여 학생회비 적용 학기',
  admissionYear: '입학년도',
  nickname: '닉네임',
  graduateYearMonth: '졸업 시기',
  academicStatus: '학적 상태',
  enrolledSemester: '등록 완료 학기',
  phoneNumber: '연락처',
  requestedAt: '가입 요청 일시',
  evidentImg: '가입 신청서 첨부 이미지',
};

// 동아리 멤버 상세보기 페이지용 (가입 요청 일시 제외)
export const titleMappingForCircle = Object.keys(titleMapping)
  .filter((key) => !['requestedAt', 'leftPayedSemester'].includes(key))
  .reduce(
    (obj, key) => {
      obj[key as keyof InfoTableEntity] = titleMapping[key as keyof InfoTableEntity];
      return obj;
    },
    {} as Record<keyof InfoTableEntity, string>,
  );

// 거절, 추방 회원에 대한 titlemapping

export const titleMappingForRejected: Record<keyof any, string> = {
  ...titleMapping, // 기존 타이틀 매핑을 그대로 가져옴
  evidentImg: '학부 재적/졸업 증빙 자료',
  rejectionOrDropReason: '거부/ 추방 사유', // 추가된 항목
};

export const titleMappingForUser: Record<keyof any, string> = {
  ...titleMapping, // 기존 타이틀 매핑을 그대로 가져옴
  evidentImg: '학부 재적/졸업 증빙 자료',
};
