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
    updatable: boolean;
    deletable: boolean;
    createdAt: string;
    updatedAt: string;
    numLike: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    commentList: Array<CommentDto>;
    boardName: string;
  }

  export interface AttachmentDto {
    originalFileName: string;
    downloadFilePath: string;
  }

  export interface CreatePostDto {
    title: string;
    content: string;
    boardId: string;
    attachmentList: Array<AttachmentDto>;
    isAnonymous: boolean;
    isQuestion: boolean;
  }
  
}