export type ReportType = 'post' | 'comment';

export interface ReportItemBase {
  id: string;
  offenderName: string; // 작성자
  reason: string; // 사유 라벨 (예: 상업적 광고 및 판매)
  createdAt: string; // ISO
  url: string; // 클릭 이동용 URL
}

export interface ReportedPost extends ReportItemBase {
  kind: 'post';
  title: string; // 게시글 제목
  boardName: string; // 우측 상단(자유게시판 등)
}

export interface ReportedComment extends ReportItemBase {
  kind: 'comment';
  content: string; // 댓글 내용 미리보기
  parentPostTitle: string; // 우측 상단(원글 제목 or 게시판명)
}

export type ReportedItem = ReportedPost | ReportedComment;

export type ReportTypeBE = 'POST' | 'COMMENT' | 'CHILD_COMMENT';

export interface CreateReportReq {
  reportType: ReportTypeBE;
  targetId: string; // 신고 대상의 id
  reportReason: string; // 사유
}

export interface CreateReportRes {
  message: string; // "신고가 접수되었습니다..." 등
}
