declare namespace Post {
  export interface PostDto{
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

  export interface CommentListDto{
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
  
}