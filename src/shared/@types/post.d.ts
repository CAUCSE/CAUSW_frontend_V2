declare namespace Post {
  export interface PostDto {
    id: string;
    title: string;
    content: string;
    isDeleted: boolean;
    writerName: string;
    writerNickname: string;
    writerAdmissionYear: number;
    writerProfileImage: string | null;
    writerNickname: string;
    fileUrlList: string[];
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    isPostLike: boolean;
    isPostFavorite: boolean;
    isPostVote: boolean;
    isPostForm: boolean;
    isOwner: boolean;
    updatable: boolean;
    deletable: boolean;
    createdAt: string;
    updatedAt: string;
    commentList: CommentListDto;
    boardName: string;
    formResponseDto: FormResponseDto | null;
    voteResponseDto: VoteResponseDto | null;
  }

  export interface PostResponseDtoList extends Pagination.PageableObject {
    content: PostResponseDto[];
  }
  export interface PostResponseDto {
    id: string;
    title: string;
    content: string;
    writerName: string;
    writerAdmissionYear: number;
    writerNickname: string;
    writerProfileImage: string | null;
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isPostVote: boolean;
    isPostForm: boolean;
    postAttachImage: string | null;
  }

  export interface PostDeleteDto {
    id: string;
    title: string;
    content: string;
    isDeleted: boolean;
    writerName: string;
    writerAdmissionYear: number;
    writerNickname: string;
    writerProfileImage: string | null;
    fileUrlList: string[];
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    isPostLike: boolean;
    isPostFavorite: boolean;
    updatable: boolean;
    deletable: boolean;
    createdAt: string;
    updatedAt: string;
    commentList: CommentListDto;
    boardName: string;
  }
  export interface PostCreateResponseDto {
    id: string;
  }

  export interface FormResponseDto {
    formId: string;
    title: string;
    isClosed: boolean;
    isAllowedEnrolled: boolean;
    enrolledRegisteredSemesterList: SemesterType[];
    isNeedCouncilFeePaid: boolean;
    isAllowedLeaveOfAbsence: boolean;
    leaveOfAbsenceRegisteredSemesterList: SemesterType[];
    isAllowedGraduation: boolean;
    questionResponseDtoList: QuestionResponseDto[];
  }

  export interface QuestionResponseDto {
    questionId: string;
    questionType: QuestionType;
    questionNumber: number;
    questionText: string;
    isMultiple: boolean;
    optionResponseDtoList: OptionResponseDto[];
  }

  export interface OptionResponseDto {
    optionId: string;
    optionNumber: number;
    optionText: string;
  }

  type QuestionType = "SUBJECTIVE" | "OBJECTIVE";

  export interface VoteResponseDto {
    voteId: string;
    title: string;
    allowAnonymous: boolean;
    allowMultiple: boolean;
    options: VoteOptionDto[];
    postId: string;
    isOwner: boolean;
    hasVoted: boolean;
    isEnd: boolean;
    totalVoteCount: number;
    totalUserCount: number;
  }

  export interface VoteUserDto {
    id: string;
    email: string;
    name: string;
    studentId: string;
    admissionYear: number;
    roles: string[];
    profileImageUrl: string;
    state: string;
    circleIdIfLeader: string[];
    circleNameIfLeader: string[];
    nickname: string;
    major: string;
    academicStatus: string;
    currentCompletedSemester: number;
    graduationYear: number;
    graduationType: string;
    phoneNumber: string;
    rejectionOrDropReason: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface VoteOptionDto {
    id: string;
    optionName: string;
    voteCount: number;
    voteUsers: VoteUserDto[];
  }
  export interface CommentListDto {
    content: Array<CommentDto>;
    //content: CommentDto[];
  }
  export interface CreateVoteDto {
    title: string;
    allowAnonymous: boolean;
    allowMultiple: boolean;
    options: string[];
    postId: string;
  }
  export interface CastVoteDto {
    voteOptionIdList: string[];
  }
  export interface DoVoteDto {
    voteOptionIdList: string[];
  }
  export interface CreatePostDto {
    title: string;
    content: string;
    boardId: string;
    isAnonymous: boolean;
    isQuestion: boolean;
  }

  export type Content = {
    id: string;
    title: string;
    content: string;
    writerName: string;
    writerAdmissionYear: number;
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  };

  export interface Posts extends Pagination.PageableObject {
    content: Content[];
  }

  export interface PostCreateWithFormRequestDto extends CreatePostDto {
    formCreateRequestDto: FormCreateRequestDto;
  }

  export interface FormCreateRequestDto {
    title: string;
    questionCreateRequestDtoList: QuestionCreateRequestDto[];
    isAllowedEnrolled: boolean;
    allowAllEnrolledRegisteredSemester: boolean;
    enrolledRegisteredSemesterList: SemesterType[];
    isNeedCouncilFeePaid: boolean;
    isAllowedLeaveOfAbsence: boolean;
    allowAllLeaveOfAbsenceRegisteredSemester: boolean;
    leaveOfAbsenceRegisteredSemesterList: SemesterType[];
    isAllowedGraduation: boolean;
  }

  export interface QuestionCreateRequestDto {
    questionType: QuestionType;
    questionText: string;
    isMultiple: boolean;
    optionCreateRequestDtoList: OptionCreateRequestDto[];
  }

  export interface OptionCreateRequestDto {
    optionText: string;
  }

  type QuestionType = "SUBJECTIVE" | "OBJECTIVE";

  type SemesterType =
    | "FIRST_SEMESTER"
    | "SECOND_SEMESTER"
    | "THIRD_SEMESTER"
    | "FOURTH_SEMESTER"
    | "FIFTH_SEMESTER"
    | "SIXTH_SEMESTER"
    | "SEVENTH_SEMESTER"
    | "EIGHTH_SEMESTER"
    | "ABOVE_NINTH_SEMESTER";

  export interface PostUserWriteDto {
    id: string;
    email: string;
    name: string;
    studentId: string;
    admissionYear: number;
    profileImageUrl: string;
    posts: PostResponseDtoList;
  }
}
