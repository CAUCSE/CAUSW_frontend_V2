import { create } from "zustand";

export const UserRoleCodes: {
  [key in User.UserDto["role"]]: string;
} = {
  ADMIN: "관리자",
  PRESIDENT: "학생회장",
  VICE_PRESIDENT: "부학생회장",
  COUNCIL: "학생회",
  LEADER_1: "1학년 학년대표",
  LEADER_2: "2학년 학년대표",
  LEADER_3: "3학년 학년대표",
  LEADER_4: "4학년 학년대표",
  LEADER_CIRCLE: "동아리장",
  LEADER_ALUMNI: "동문회장",
  COMMON: "학생",
  PROFESSOR: "교수",
  COUNCIL_N_LEADER_CIRCLE: "학생회 / 동아리장",
  LEADER_1_N_LEADER_CIRCLE: "1학년 학년대표 / 동아리장",
  LEADER_2_N_LEADER_CIRCLE: "2학년 학년대표 / 동아리장",
  LEADER_3_N_LEADER_CIRCLE: "3학년 학년대표 / 동아리장",
  LEADER_4_N_LEADER_CIRCLE: "4학년 학년대표 / 동아리장",
};

export const useUserStore = create<User.UseUserStore>((set, get) => ({
  id: "",
  email: "",
  name: "",
  admissionYear: 0,
  role: "COMMON",
  profileImage: null,
  studentId: undefined,
  circleIds: undefined,
  circleNames: undefined,
  state: "ACTIVE",

  setUserStore: (props: User.UserDto) => {
    set(() => ({
      id: props.id,
      email: props.email,
      name: props.name,
      admissionYear: props.admissionYear,
      role: props.role,
      profileImage:
        !props.profileImage || props.profileImage === ""
          ? "/images/default_profile.png"
          : props.profileImage,
      studentId: props.studentId,
      circleIds: props.circleIdIfLeader ?? [],
      circleNames: props.circleNameIfLeader ?? [],
      state: props.state,
    }));
  },

  roleTxt: () => {
    return UserRoleCodes[get().role];
  },

  nameWithAdmission: () => {
    return `${get().name} (${get().admissionYear % 100})`;
  },

  profileImageSrc: () => {
    return !get().profileImage || get().profileImage === ""
      ? "/images/default_profile.png"
      : (get().profileImage as string);
  },

  isStudent: () => {
    return get().role === "COMMON";
  },

  isProfessor: () => {
    return get().role === "PROFESSOR";
  },

  isAdmin: () => {
    return get().role === "ADMIN";
  },

  isPresidents: () => {
    return get().role === "PRESIDENT" || get().role === "VICE_PRESIDENT";
  },

  isVicePresidents: () => {
    return get().role === "VICE_PRESIDENT";
  },

  isCircleLeader: () => {
    return (
      get().role === "LEADER_CIRCLE" ||
      get().role === "COUNCIL_N_LEADER_CIRCLE" ||
      get().role === "LEADER_1_N_LEADER_CIRCLE" ||
      get().role === "LEADER_2_N_LEADER_CIRCLE" ||
      get().role === "LEADER_3_N_LEADER_CIRCLE" ||
      get().role === "LEADER_4_N_LEADER_CIRCLE"
    );
  },

  isCouncil: () => {
    return (
      get().role === "COUNCIL" ||
      get().role === "VICE_PRESIDENT" ||
      get().role === "COUNCIL_N_LEADER_CIRCLE"
    );
  },

  isStudentLeader: () => {
    return (
      get().role === "LEADER_1" ||
      get().role === "LEADER_2" ||
      get().role === "LEADER_3" ||
      get().role === "LEADER_4" ||
      get().role === "LEADER_1_N_LEADER_CIRCLE" ||
      get().role === "LEADER_2_N_LEADER_CIRCLE" ||
      get().role === "LEADER_3_N_LEADER_CIRCLE" ||
      get().role === "LEADER_4_N_LEADER_CIRCLE"
    );
  },

  isAlumniLeader: () => {
    return get().role === "LEADER_ALUMNI";
  },
}));
