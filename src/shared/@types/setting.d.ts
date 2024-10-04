declare namespace Setting {
  export type ExportType =
    | "ALL_USERS"
    | "WAITING_USERS"
    | "CIRCLE_MEMBERS"
    | "CIRCLE_APPLY_USERS"
    | "DROP_USERS"
    | "ACTIVE_USERS"
    | "INACTIVE_N_DROP_USERS"
    | "INACTIVE_USERS"
    | "ADMISSION_USERS"
    | "PAYERS";

  export interface AdmissionUser {
    admissionYear: number;
    attachImage: string | null;
    createdAt: string;
    description: string;
    id: string;
    updatedAt: string;
    userEmail: string;
    userName: string;
    studentId: string;
    //#71 추가
    userState: User["state"];
  }

  export interface Payer {
    userCouncilFeeId: string;
    isJoinedService: boolean;
    userId: string;
    councilFeeFakeUserId: string;
    userName: string;
    studentId: string;
  }

  export interface UserElement {
    userId: string;
    userName: string;
    studentId: string;
  }

  export interface WaitingUsers extends UserElement {
    userAcademicRecordApplicationId: string;
  }

  export interface AttendanceRecord {
    targetAcademicStatus: string;
    userNote: string;
    attachedImageUrlList: string[];
    changeDate: string;
  }

  export type BoardList = {
    id: string;
    boardName: string;
  }[];

  //DTO
  // getByState
  export type GetByStateResponseDto = {
    content: User.User[];
    last: boolean;
  } & Error.ApiErrorResponse;

  // getAllAdmissions
  export type GetAllAdmissionsResponseDto = {
    content: AdmissionUser[];
    last: boolean;
  } & Error.ApiErrorResponse;

  export type GetPayersResponseDto = {
    content: Payer[];
  } & Error.ApiErrorResponse;

  type AdmissionAcademicStatus = "ENROLLED" | "LEAVE_OF_ABSENCE" | "GRADUATED";

  export type AdmissionUserDto = {
    roles: User.Role;
    nickname: string;
    major: string;
    academicStatus: AdmissionAcademicStatus;
    currentCompletedSemester: number;
    graduationYear: number;
    /**
     * 졸업 월
     */
    graduationType: string;
    phoneNumber: string;
    rejectionOrDropReason: string;
    createdAt: string;
    updatedAt: string;
  } & User.User;

  export type GetAdmissionResponseDto = {
    id: string;
    user: AdmissionUserDto;
    attachImageUrlList: string[];
    description: string;
    createdAt: string;
    updatedAt: string;
    rejectReason: string;
  };

  export type GetPrivilegedUsersResponseDto = {
    presidentUser: User.User[];
    vicePresidentUser: User.User[];
    councilUsers: User.User[];
    leaderGradeUsers: User.User[];
    leaderCircleUsers: User.User[];
    leaderAlumni: User.User[];
  } & Error.ApiErrorResponse;

  //Detail
  export type GetAttendanceUserResponseDto = {
    userId: string;
    userName: string;
    studentId: string;
    academicStatus: string;
    currentCompleteSemester: number;
    note: string;
    userAcademicRecordApplicationResponseDtoList: AttendanceRecord[];
  } & Error.ApiErrorResponse;

  export type GetWaitingUserResponseDto = {
    userId: string;
    userName: string;
    studentId: string;
    academicRecordRequestStatus: string;
    targetAcademicStatus: string;
    targetCompletedSemester: number;
    note: string;
    attachedImageUrlList: string[];
    rejectMessage: string;
  };

  export type GetMyPostsResponseDto = {
    posts: { content: Post.PostDto[] };
  };

  export type GetApplyBoardsResponseDto = BoardList & Error.ApiErrorResponse;

  export type GetApplyBoardResponseDto = {
    id: string;
    boardName: string;
    description: string;
    createRoles: string;
    isAnonymousAllowed: boolean;
    user: User.User;
  };
}
