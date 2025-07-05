import { create } from 'zustand';

export const useUserStore = create<User.UseUserStore>((set, get) => ({
  id: '',
  email: '',
  name: '',
  admissionYear: 0,
  roles: ['COMMON'],
  profileImageUrl: '',
  studentId: '',
  circleIdIfLeader: null,
  circleNameIfLeader: null,
  state: 'ACTIVE',
  nickname: '',
  academicStatus: 'ENROLLED',
  major: '',
  currentCompletedSemester: null,
  graduationType: null,
  graduationYear: null,
  phoneNumber: '',
  createdAt: '',
  checkVTwo: true,
  updatedAt: '',
  isV2: true,
  rejectionOrDropReason: '',

  setUserStore: (props) => {
    set(() => ({
      id: props.id,
      email: props.email,
      name: props.name,
      admissionYear: props.admissionYear,
      roles: props.roles,
      profileImageUrl:
        !props.profileImageUrl || props.profileImageUrl === '' ? '/images/default_profile.png' : props.profileImageUrl,
      studentId: props.studentId,
      circleIdIfLeader: props.circleIdIfLeader ?? [],
      circleNameIfLeader: props.circleNameIfLeader ?? [],
      state: props.state,
      nickname: props.nickname,
      academicStatus: props.academicStatus,
      major: props.major,
      currentCompletedSemester: props.currentCompletedSemester,
      graduationType: props.graduationType,
      graduationYear: props.graduationYear,
      phoneNumber: props.phoneNumber,
      createdAt: props.createdAt,
      checkVTwo: props.isV2,
    }));
  },
  setEmail: (email: string) => {
    set(() => ({ email }));
  },
  roleTxt: () => {
    return get()
      .roles.map((element) => userRoleCodes[element])
      .join(' / ');
  },

  nameWithAdmission: () => {
    return `${get().name} (${get().admissionYear % 100})`;
  },

  profileImageSrc: () => {
    return !get().profileImageUrl || get().profileImageUrl === ''
      ? '/images/default_profile.png'
      : (get().profileImageUrl as string);
  },

  isStudent: () => {
    return get().roles.includes('COMMON');
  },

  isProfessor: () => {
    return get().roles.includes('PROFESSOR');
  },

  isAdmin: () => {
    return get().roles.includes('ADMIN');
  },

  isPresidents: () => {
    return get().roles.includes('PRESIDENT') || get().roles.includes('VICE_PRESIDENT');
  },

  isVicePresidents: () => {
    return get().roles.includes('VICE_PRESIDENT');
  },

  isCircleLeader: () => {
    return get().roles.includes('LEADER_CIRCLE');
  },

  isCouncil: () => {
    return (
      get().roles.includes('COUNCIL') || get().roles.includes('VICE_PRESIDENT') || get().roles.includes('PRESIDENT')
    );
  },

  isStudentLeader: () => {
    return (
      get().roles.includes('LEADER_1') ||
      get().roles.includes('LEADER_2') ||
      get().roles.includes('LEADER_3') ||
      get().roles.includes('LEADER_4')
    );
  },

  isAlumniLeader: () => {
    return get().roles.includes('LEADER_ALUMNI');
  },
}));

export const userRoleCodes: {
  [key in User.Role]: string;
} = {
  ADMIN: '관리자',
  PRESIDENT: '학생회장',
  VICE_PRESIDENT: '부학생회장',
  COUNCIL: '학생회',
  LEADER_1: '1학년 학년대표',
  LEADER_2: '2학년 학년대표',
  LEADER_3: '3학년 학년대표',
  LEADER_4: '4학년 학년대표',
  LEADER_CIRCLE: '동아리장',
  LEADER_ALUMNI: '동문회장',
  COMMON: '학생',
  PROFESSOR: '교수',
  NONE: '권한 없음',
};
