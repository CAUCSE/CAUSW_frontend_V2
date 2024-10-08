declare namespace ChildComment {
  export interface ChildCommentDto {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    writerName: string;
    writerAdmissionYear: number;
    writerProfileImage: string | null;
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