declare namespace User {
  export interface User {
    id: string;
    email: string;
    name: string;
    studentId: string;
    admissionYear: number;
    roles: Role[];
    profileImageUrl: string | null;
    state: 'ACTIVE' | 'INACTIVE' | 'DROP' | 'INACTIVE_N_DROP' | 'AWAIT' | 'REJECT';
    circleIdIfLeader: string[] | null;
    circleNameIfLeader: string[] | null;
    nickname: string;
    major: string;
    academicStatus: AcademicStatus;
    currentCompletedSemester: number | null;
    graduationYear: number | null; // 숫자 타입으로 수정
    graduationType: 'FEBRUARY' | 'AUGUST' | null;
    phoneNumber: string | null;
    rejectionOrDropReason: string | null;
    /** ISO date string */
    createdAt: string;
    /** ISO date string */
    updatedAt: string;
    isV2: boolean;
  }

  export interface UserAdmissionCreateRequestDto {
    email: string;
    description: string;
    images: FileList;
  }

  export type AcademicStatus = 'ENROLLED' | 'LEAVE_OF_ABSENCE' | 'GRADUATED' | 'UNDETERMINED' | 'UNDEFINED'; // undefined는 신규 사용자자;

  export type Role =
    | 'ADMIN'
    | 'PRESIDENT'
    | 'VICE_PRESIDENT'
    | 'COUNCIL'
    | 'LEADER_1'
    | 'LEADER_2'
    | 'LEADER_3'
    | 'LEADER_4'
    | 'LEADER_CIRCLE'
    | 'LEADER_ALUMNI'
    | 'COMMON'
    | 'PROFESSOR'
    | 'NONE';

  // findByName
  export type FindByNameResponseDto = User[];
  export type FindByNameResponse = Model.User[];

  // updateRole
  export interface UpdateRoleRequestDto {
    role: User['role'];
    circleId?: string;
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
    attachImage: FileList | null;
    description: string;
  }

  export interface UpdateDto {
    admissionYear: number;
    email: string;
    name: string;
    profileImage: string | null;
    studentId: string;
  }

  export interface userUpdateDto {
    nickname: string;
    phoneNumber: string;
    profileImage: File | null;
  }

  export interface PasswordUpdateRequestDto {
    originPassword: string;
    updatedPassword: string;
  }

  export type UpdateAccessTokenRequestDto =
    | {
        accessToken: 'string';
        refreshToken: 'string';
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
    fcmToken: string;
  }

  // Signup
  export interface SignUpForm {
    email: string;
    name: string;
    password: string;
    pwConfirm: string;
    studentId?: string;
    admissionYearString: string;
    nickname: string;
    major: string;
    agreeToTerms: boolean;
    agreeToPopup: boolean;
    phoneNumber: string;
  }

  export interface SignUpFormPost {
    email: string;
    name: string;
    password: string;
    studentId?: string;
    admissionYear: number;
    nickname: string;
    major: string;
    phoneNumber: string;
  }

  export interface CreateUserAcademicRecordApplicationRequestDto {
    targetAcademicStatus:
      | 'ENROLLED'
      | 'LEAVE_OF_ABSENCE'
      | 'GRADUATED'
      | 'DROPPED_OUT'
      | 'PROBATION'
      | 'PROFESSOR'
      | 'UNDETERMINED';
    targetCompletedSemester: number | null;
    graduationYear: number | null;
    graduationType: 'FEBRUARY' | 'AUGUST' | null;
    note: string;
    images: FileList | null;
  }

  interface StatusButtonProps {
    status: StatusType;
    messages: Record<StatusType, string>;
    onClick?: () => void;
  }

  type StatusType = 'AWAIT' | 'COMPLETE' | 'REJECTED' | 'UNDONE' | 'BANNED';

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

  export interface FindIdRequest {
    studentId: string;
    name: string;
  }

  export interface FindIdResponse {
    email: string;
  }

  export interface FindPasswordRequest {
    name: string;
    studentId: string;
    email: string;
  }

  export interface ResetPasswordRequest {
    originPassword: string;
    updatedPassword: string;
  }

  export interface ResetPasswordFormData {
    originPassword: string;
    updatedPassword: string;
    confirmPassword: string;
  }

  export interface FCMTokenResponseDto {
    fcmToken: string[];
  }

  // Zustand store types removed - using React Query instead

  //DTO
  export type UserDto = User & Error.ApiErrorResponse;

  export interface UserPostsResponseDto {
    id: string;
    email: string;
    name: string;
    studentId: string;
    admissionYear: number;
    profileImageUrl: string;
    posts: Post.PostResponseDtoList;
  }
}
