// 권한 관련 유틸리티 함수들
export const getUserRole = (roles: User.Role[]) => {
  return roles.map((element) => userRoleCodes[element]).join(' / ');
};

export const isStudent = (roles: User.Role[]) => {
  return roles.includes('COMMON');
};

export const isProfessor = (roles: User.Role[]) => {
  return roles.includes('PROFESSOR');
};

export const isAdmin = (roles: User.Role[]) => {
  return roles.includes('ADMIN');
};

export const isPresidents = (roles: User.Role[]) => {
  return roles.includes('PRESIDENT') || roles.includes('VICE_PRESIDENT');
};

export const isVicePresidents = (roles: User.Role[]) => {
  return roles.includes('VICE_PRESIDENT');
};

export const isCircleLeader = (roles: User.Role[]) => {
  return roles.includes('LEADER_CIRCLE');
};

export const isCouncil = (roles: User.Role[]) => {
  return roles.includes('COUNCIL') || roles.includes('VICE_PRESIDENT') || roles.includes('PRESIDENT');
};

export const isStudentLeader = (roles: User.Role[]) => {
  return (
    roles.includes('LEADER_1') || roles.includes('LEADER_2') || roles.includes('LEADER_3') || roles.includes('LEADER_4')
  );
};

export const isAlumniLeader = (roles: User.Role[]) => {
  return roles.includes('LEADER_ALUMNI');
};

export const isAlumniManager = (roles: User.Role[]) => {
  return roles.includes('ALUMNI_MANAGER');
};

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
  ALUMNI_MANAGER: '동문회 관리자',
  COMMON: '학생',
  PROFESSOR: '교수',
  NONE: '권한 없음',
};
