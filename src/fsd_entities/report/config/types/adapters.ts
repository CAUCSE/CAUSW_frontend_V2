import {
  BE_ReportedComment,
  BE_ReportedPost,
  BE_ReportedUser,
  BE_UserReportedComment,
  BE_UserReportedPost,
} from './be.types';
import { ReportedComment, ReportedPost, ReportedUser } from './ui.types';

export const adaptPost = (be: BE_ReportedPost): ReportedPost => ({
  kind: 'post',
  id: be.postId,
  title: be.postTitle,
  boardName: be.boardName,
  offenderName: be.writerName,
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
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
  url: be.url,
});
export const adaptReportedUser = (be: BE_ReportedUser): ReportedUser => ({
  id: be.userId,
  name: be.userName,
  nickname: be.userNickname,
  profileImage: be.profileImage,
  totalCount: be.totalReportCount,
});
export const adaptUserReportedPost = (be: BE_UserReportedPost): ReportedPost => ({
  kind: 'post',
  id: be.postId,
  title: be.postTitle,
  boardName: be.boardName,
  offenderName: be.writerName,
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
  url: be.url,
});
export const adaptUserReportedComment = (be: BE_UserReportedComment): ReportedComment => ({
  kind: 'comment',
  id: be.commentId,
  content: be.commentContent,
  parentPostTitle: be.parentPostTitle,
  offenderName: be.writerName,
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
  url: be.url,
});
