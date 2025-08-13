// 신고된 게시글 (목록/사용자별 공통 DTO)
export interface BE_ReportedPost {
  boardName: string;
  postId: string;
  postTitle: string;
  reportCreatedAt: string;
  reportId: string;
  reportReasonDescription: string;
  writerName: string;
  url: string;
}

// 신고된 댓글/대댓글 (목록/사용자별 공통 DTO)
export interface BE_ReportedComment {
  commentId: string;
  commentContent: string;
  parentPostTitle: string;
  writerName: string;
  reportReasonDescription: string;
  reportCreatedAt: string;
  url: string;
}

// 신고된 사용자 (목록)
export interface BE_ReportedUser {
  userId: string;
  userName: string;
  userNickname: string;
  profileImage: string | null;
  totalReportCount: number;
}

// 사용자 신고 게시글 (목록)
export interface BE_UserReportedPost {
  reportId: string;
  postId: string;
  postTitle: string;
  writerName: string;
  reportReasonDescription: string;
  reportCreatedAt: string;
  boardName: string;
  url: string;
}

// 사용자 신고 댓글·대댓글 (목록)
export interface BE_UserReportedComment {
  reportId: string;
  commentId: string;
  commentContent: string;
  parentPostTitle: string;
  parentPostId: string;
  writerName: string;
  reportReasonDescription: string;
  reportCreatedAt: string;
  url: string;
}
