declare namespace ChildComment {
  export interface ChildCommentDto {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    writerName: string;
    writerNickname: string;
    writerAdmissionYear: number;
    writerProfileImage: string | null;
    writerNickname: string;
    updatable: boolean;
    deletable: boolean;
    isAnonymous: boolean;
    isOwner: boolean;
    isChildCommentLike: boolean;
    numLike: number;
  }
  export interface CreateChildCommentDto {
    content: string;
    parentCommentId: string;
    isAnonymous: boolean;
  }
}