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
    isPostVote: boolean;
    isPostForm: boolean;
    updatable: boolean;
    deletable: boolean;
    createdAt: string;
    updatedAt: string;
    commentList: CommentListDto;
    boardName: string;
    formResponseDto: FormResponseDto | null;
    voteResponseDto: VoteResponseDto | null;
  }
  export interface PostDeleteDto {
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

  export interface FormResponseDto {

  }

  export interface VoteResponseDto {
    voteId: string;
    title: string;
    allowAnonymous: boolean;
    allowMultiple: boolean;
    options:VoteOptionDto[];
    postId: string;
    isOwner: boolean;
    isEnd: boolean;
  }
  export interface VoteUserDto {
    admissionYear: number;
    circleIdIfLeader: string[] | null;
    circleNameIfLeader: string[] | null;
    email: string;
    id: string;
    name: string;
    profileImage: string | null;
    roles: string[];
    state: "ACTIVE" | "INACTIVE" | "DROP" | "INACTIVE_N_DROP";
    studentId: string;
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
}
