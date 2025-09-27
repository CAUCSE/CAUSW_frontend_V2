export const ROLE_CHECKBOX_GROUPS: Record<string, User.Role[]> = {
  학생회장: ['PRESIDENT'],
  부학생회장: ['VICE_PRESIDENT'],
  학생회: ['COUNCIL'],
  '학년 대표': ['LEADER_1', 'LEADER_2', 'LEADER_3', 'LEADER_4'],
  동아리장: ['LEADER_CIRCLE'],
  동문회장: ['LEADER_ALUMNI'],
  교수: ['PROFESSOR'],
};

export const ROLE_LABELS: Record<User.Role, string> = {
  ADMIN: '최고 관리자',
  PRESIDENT: '학생회장',
  VICE_PRESIDENT: '부학생회장',
  COUNCIL: '학생회',
  LEADER_1: '1학년 대표',
  LEADER_2: '2학년 대표',
  LEADER_3: '3학년 대표',
  LEADER_4: '4학년 대표',
  LEADER_CIRCLE: '동아리장',
  LEADER_ALUMNI: '동문회장',
  COMMON: '일반 회원',
  PROFESSOR: '교수',
  NONE: '권한 없음',
};
