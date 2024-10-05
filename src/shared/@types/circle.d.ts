declare namespace Circle {
  export type Status = "AWAIT" | "DROP" | "LEAVE" | "MEMBER" | "REJECT";

  export interface CircleUser {
    id: string;
    status: Status;
    user: User.User;
    circle: FindByIdDto;
  }

  export interface FindByIdDto {
    id: string;
    name: string;
    description: string;
    mainImage: string | null;
    leaderId: string;
    leaderName: string;
    numMember: number;
    createdAt: string;
    isJoined: boolean;
    joinedAt: string | null;
    isDeleted: boolean;
    circleTax: number;
    recruitMembers: number;
    isRecruit: boolean;
    recruitEndDate: string;
  }

  export interface Board {
    id: string;
    name: string;
    postId: string | null;
    postTitle: string | null;
    postCreatedAt: Date | null;
    postNumComment: number | null;
    postWriterName: string | null;
    postWriterStudentId: string | null;
  }

  export interface FindBoardsDto {
    circle: FindByIdDto;
    boardList: Board[];
  }

  export interface FindBoards {
    circle: Model.Circle;
    boards: Model.CircleBoard[];
  }

  export interface Application {
    title: string;
    questionCreateRequestDtoList: Post.QuestionCreateRequestDto[];
    isAllowedEnrolled: boolean;
    allowAllEnrolledRegisteredSemester: boolean;
    enrolledRegisteredSemesterList: SemesterType[];
    isNeedCouncilFeePaid: boolean;
    isAllowedLeaveOfAbsence: boolean;
    allowAllLeaveOfAbsenceRegisteredSemester: boolean;
    leaveOfAbsenceRegisteredSemesterList: SemesterType[];
    isAllowedGraduation: boolean;
  }

  // Client
  // 기본, 신청완료, 대기중, 가입됨, 제한
  export type JoinStatus = "NONE" | "DONE" | "AWAIT" | "MEMBER" | "BLOCK";

  //DTO
  export interface CreateRequestDto {
    mainImage: string;
    name: string;
    description: string;
    leaderId: string;
  }

  export type UpdateRequestDto = Omit<CreateRequestDto, "leaderId">;

  export type CirclesRequestDto = FindByIdDto[] & Error.ApiErrorResponse;
  export type CircleRequestDto = FindByIdDto & Error.ApiErrorResponse;
  export type GetUserListResponseDto = CircleUser[] & Error.ApiErrorResponse;
  export type GetCircleBoardsResponseDto = {
    boardList: Board[];
  } & Error.ApiErrorResponse;
  export type GetCircleMembersResponseDto = {
    circle: { name: string };
    user: User.User;
  }[] &
    Error.ApiErrorResponse;
}
