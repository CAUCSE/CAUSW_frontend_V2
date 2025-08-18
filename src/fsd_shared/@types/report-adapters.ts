// report-adapter.ts
import { WriterState } from '@/fsd_shared/@types/report-be';

import { BE_ReportedComment, BE_ReportedPost, BE_ReportedUser } from './report-be';
import { ReportedComment, ReportedPost, ReportedUser } from './report-ui';

const normalizeState = (s: string): WriterState => (s || 'active').toLowerCase() as WriterState;

export const adaptPost = (be: BE_ReportedPost): ReportedPost => ({
  kind: 'post',
  id: be.postId,
  title: be.postTitle,
  boardName: be.boardName,
  offenderName: be.writerName,
  writerState: be.writerState,
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
  url: be.url,
});

export const adaptComment = (be: BE_ReportedComment): ReportedComment => ({
  kind: 'comment',
  id: be.commentId,
  content: be.commentContent,
  parentPostTitle: be.parentPostTitle,
  offenderName: be.writerName,
  writerState: be.writerState,
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
  url: be.url,
});

export const adaptReportedUser = (be: BE_ReportedUser): ReportedUser => ({
  id: be.userId,
  name: be.userName,
  nickname: be.userNickname,
  writerState: be.writerState,
  profileImage: be.profileImage,
  totalCount: be.totalReportCount,
});
