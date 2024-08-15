declare namespace User {
  export interface User {
    admissionYear: number;
    circleIdIfLeader: string[] | null;
    circleNameIfLeader: string[] | null;
    email: string;
    id: string;
    name: string;
    profileImage: string;
    role: Role;
    state: "ACTIVE" | "INACTIVE" | "DROP" | "INACTIVE_N_DROP";
    studentId: string;
  }

  export type Role =
    | "ADMIN"
    | "PRESIDENT"
    | "VICE_PRESIDENT"
    | "COUNCIL"
    | "LEADER_1"
    | "LEADER_2"
    | "LEADER_3"
    | "LEADER_4"
    | "LEADER_CIRCLE"
    | "LEADER_ALUMNI"
    | "COMMON"
    | "PROFESSOR"
    | "COUNCIL_N_LEADER_CIRCLE"
    | "LEADER_1_N_LEADER_CIRCLE"
    | "LEADER_2_N_LEADER_CIRCLE"
    | "LEADER_3_N_LEADER_CIRCLE"
    | "LEADER_4_N_LEADER_CIRCLE";

  // findByName
  export type FindByNameResponseDto = User[];
  export type FindByNameResponse = Model.User[];

  // updateRole
  export interface UpdateRoleRequestDto {
    role: User["role"];
    circleId?: string;
  }

  // findAllAdmissions
  export interface AdmissionUser {
    admissionYear: number;
    attachImage: string | null;
    createdAt: string;
    description: string;
    id: string;
    updatedAt: string;
    userEmail: string;
    userName: string;
    //#71 추가
    userState: User["state"];
  }

  export interface FindAllAdmissionsResponseDto {
    content: AdmissionUser[];
    last: boolean;

    //#71 추가
    empty: boolean;
    first: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  }
  export interface FindAllAdmissionsResponse {
    users: Model.AdmissionUser[];
    last: boolean;
  }

  // findByState
  export interface FindByStateResponseDto {
    content: User[];
    last: boolean;
    //#71 추가
    empty: boolean;
    first: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  }
  export interface FindByStateResponse {
    users: Model.User[];
    last: boolean;
  }

  // findPrivilegedUsers
  export interface FindPrivilegedUsersResponseDto {
    presidentUser: User[];
    vicePresidentUser: User[];
    councilUsers: User[];
    leaderGradeUsers: User[];
    leaderCircleUsers: User[];
    leaderAlumni: User[];
  }

  export interface FindPrivilegedUsersResponse {
    presidentUser: Model.User[];
    vicePresidentUser: Model.User[];
    councilUsers: Model.User[];
    leaderGradeUsers: Model.User[];
    leaderCircleUsers: Model.User[];
    leaderAlumni: Model.User[];
  }

  // ---

  export interface SignInRequestDto {
    email: string;
    password: string;
    auto?: boolean;
  }

  export interface IsDuplicatedEmailResponseDto {
    result: boolean;
  }

  export interface CreateDto {
    email: string;
    password: string;
    name: string;
    admissionYear: number;
    profileImage?: string | null;
    studentId: string;
  }

  export interface AdmissionCreateRequestDto {
    email: string;
    attachImage: File | null;
    description: string;
  }

  export interface UpdateDto {
    admissionYear: number;
    email: string;
    name: string;
    profileImage: string | null;
    studentId: string;
  }

  export interface PasswordUpdateRequestDto {
    originPassword: string;
    updatedPassword: string;
  }

  export type UpdateAccessTokenRequestDto =
    | {
        accessToken: "string";
        refreshToken: "string";
      }
    | ApiErrorResponse;

  export interface FindPasswordReqestDto {
    name: string;
    studentId: string;
    email: string;
  }

  export interface SignOutRequestDto {
    accessToken: string;
    refreshToken: string;
  }

  // ==

  export interface FindPostsResponse {
    posts: Model.HistoryPost[];
    last: boolean;
  }

  export interface FindPostsResponseDto {
    //#71 추가
    admissionYear: number;
    email: string;
    id: string;
    name: string;
    profileImage: string;
    studentId: string;

    post: {
      content: HistoryData.Post[];
      last: boolean;
      //#71 추가
      empty: boolean;
      first: boolean;
      number: number;
      numberOfElements: number;
      pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        unpaged: boolean;
      };
      size: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      totalElements: number;
      totalPages: number;
    };
  }

  export interface FindCommentsResponse {
    comments: Model.HistoryComment[];
    last: boolean;
  }

  export interface FindCommentsResponseDto {
    //#71 추가
    admissionYear: number;
    email: string;
    id: string;
    name: string;
    profileImage: string;
    studentId: string;

    comment: {
      content: HistoryData.Comment[];
      last: boolean;
      //#71 추가
      empty: boolean;
      first: boolean;
      number: number;
      numberOfElements: number;
      pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        unpaged: boolean;
      };
      size: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      totalElements: number;
      totalPages: number;
    };
  }

  //Store
  export interface UseUserStore extends User {
    setUserStore: (props: User.User) => void;

    roleTxt: () => string;
    nameWithAdmission: () => string;
    profileImageSrc: () => string;
    isStudent: () => boolean;
    isProfessor: () => boolean;
    isVicePresidents: () => boolean;
    isCircleLeader: () => boolean;
    isCouncil: () => boolean;
    isStudentLeader: () => boolean;
    isAlumniLeader: () => boolean;
  }

  //DTO
  export type UserDto = User & Error.ApiErrorResponse;
}
