declare namespace User {
  //DTO
  export interface UserDto {
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
  export type FindByNameResponseDto = UserDto[];
  export type FindByNameResponse = Model.User[];

  // updateRole
  export interface UpdateRoleRequestDto {
    role: UserDto["role"];
    circleId?: string;
  }

  // findAllAdmissions
  export interface AdmissionUserDto {
    admissionYear: number;
    attachImage: string | null;
    createdAt: string;
    description: string;
    id: string;
    updatedAt: string;
    userEmail: string;
    userName: string;
    //#71 추가
    userState: UserDto["state"];
  }

  export interface FindAllAdmissionsResponseDto {
    content: AdmissionUserDto[];
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
    content: UserDto[];
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
    presidentUser: UserDto[];
    vicePresidentUser: UserDto[];
    councilUsers: UserDto[];
    leaderGradeUsers: UserDto[];
    leaderCircleUsers: UserDto[];
    leaderAlumni: UserDto[];
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
  
  
  // Signup
  export interface SignUpForm 
  {        
    email: string;
    name: string;
    password: string;
    pwConfirm: string;
    studentId: string;
    admissionYear: number;
    nickname: string;
    major: string;
    academicStatus: "ENROLLED" | "LEAVE_OF_ABSENCE" | "GRADUATED";
    currentCompletedSemester: number | null;
    agreeToTerms: boolean;
    agreeToPopup: boolean;
    graduationYear: number | null;
    graduationMonth: number | null;
    phoneNumberHyphen: string;
    files: File[]; 
    profileImage: string | null;
  }

  export interface SignUpFormPost
  {        
    email: string;
    name: string;
    password: string;
    studentId: string;
    admissionYear: number;
    attachImages: string[];
    profileImage: string | null;
    nickname: string;
    major: string;
    academicStatus: "ENROLLED" | "LEAVE_OF_ABSENCE" | "GRADUATED";
    currentCompletedSemester: number | null;
    graduationYear: number | null;
    graduationMonth: number | null;
    phoneNumber: string;
  }

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
  export interface UseUserStore extends UserDto {
    setUserStore: (props: User.UserDto) => void;

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
}
