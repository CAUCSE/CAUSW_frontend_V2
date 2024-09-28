declare namespace Post {
  export interface PostDto {
    id: string;
    title: string;
    content: string;
    isDeleted: boolean;
    writerName: string;
    writerAdmissionYear: number;
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

  export interface CommentListDto {
    content: Array<CommentDto>;
    //content: CommentDto[];
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

  export type Posts = {
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    content: Content[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    empty: boolean;
  };

  export interface PostCreateWithFormRequestDto extends CreatePostDto {
    formCreateRequestDto: FormCreateRequestDto;
    attachImageList: string[];
  }

  export interface FormCreateRequestDto {
    title: string;
    questionCreateRequestDtoList: QuestionCreateRequestDto[];
    isAllowedEnrolled: boolean;
    enrolledRegisteredSemesterList: SemesterType[];
    isNeedCouncilFeePaid: boolean;
    isAllowedLeaveOfAbsence: boolean;
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
}
