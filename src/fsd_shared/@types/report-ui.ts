// 신고 타입 (프론트/백엔드)
export type ReportType = 'post' | 'comment';
export type ReportTypeBE = 'POST' | 'COMMENT' | 'CHILD_COMMENT';

// 공통 신고 아이템 Base
export interface ReportItemBase {
  id: string;
  offenderName: string; // 작성자
  reason: string; // 사유 라벨 (예: 상업적 광고 및 판매)
  createdAt: string; // ISO
  url: string; // 클릭 이동용 URL
}

// 신고된 게시글
export interface ReportedPost extends ReportItemBase {
  kind: 'post';
  title: string; // 게시글 제목
  boardName: string; // 우측 상단(자유게시판 등)
}

// 신고된 댓글
export interface ReportedComment extends ReportItemBase {
  kind: 'comment';
  content: string; // 댓글 내용 미리보기
  parentPostTitle: string; // 우측 상단(원글 제목 or 게시판명)
}

// 통합 신고 아이템
export type ReportedItem = ReportedPost | ReportedComment;

// 신고된 사용자 목록
export interface ReportedUser {
  id: string;
  name: string;
  nickname: string;
  profileImage: string | null;
  totalCount: number; // 누적 신고 횟수
}

// 신고 요청 타입
export interface CreateReportReq {
  reportType: ReportTypeBE;
  targetId: string; // 신고 대상의 id
  reportReason: string; // 사유 코드
}

// 신고 응답 타입
export interface CreateReportRes {
  message: string; // "신고가 접수되었습니다..." 등
}
