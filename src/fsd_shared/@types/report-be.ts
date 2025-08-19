export type WriterState = 'ACTIVE' | 'INACTIVE' | 'DROP' | 'REJECT';
export const WRITER_STATE = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DROP: 'DROP',
  REJECT: 'REJECT',
} as const;

// 신고된 게시글 (목록/사용자별 공통 DTO)
export interface BE_ReportedPost {
  reportId: string;
  postId: string;
  postTitle: string;
  writerName: string;
  writerState: WriterState;
  reportReasonDescription: string;
  reportCreatedAt: string;
  boardName: string;
  url: string;
}

// 신고된 댓글/대댓글 (목록/사용자별 공통 DTO)
export interface BE_ReportedComment {
  reportId: string;
  commentId: string;
  commentContent: string;
  parentPostTitle: string;
  writerName: string;
  writerState: WriterState;
  reportReasonDescription: string;
  reportCreatedAt: string;
  url: string;
}

// 신고된 사용자 (목록)
export interface BE_ReportedUser {
  userId: string;
  userName: string;
  userNickname: string;
  userState: WriterState;
  profileImage: string | null;
  totalReportCount: number;
}
