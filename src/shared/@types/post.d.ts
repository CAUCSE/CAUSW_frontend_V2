declare namespace Post {
  export interface PostDto{
    id: string;
    title: string;
    content: string;
    isDeleted: boolean;
    writerName: string;
    writerAdmissionYear: number;
    writerProfileImage: string;
    attachmentList: AttachmentDto[];
    numComment: number;
    updatable: boolean;
    deletable: boolean;
    createdAt: string;
    updatedAt: string;
    numLike: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    commentList: CommentDto[];
    boardName: string;
  }

  export interface AttachmentDto {
    originalFileName: string;
    downloadFilePath: string;
  }

  
}