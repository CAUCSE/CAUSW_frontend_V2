declare namespace Post {
  export interface PostDto {
    id: string;
    title: string;
    content: string;
    isDeleted: boolean;
    writerName: string;
    writerAdmissionYear: number;
    writerProfileImage: string;
    attachmentList: Array<AttachmentDto>;
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    isQuestion: boolean;
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

  export interface AttachmentDto {
    originalFileName: string;
    downloadFilePath: string;
  }

  export interface CreatePostDto {
    title: string;
    content: string;
    boardId: string;
    attachmentList: Array<string>;
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
