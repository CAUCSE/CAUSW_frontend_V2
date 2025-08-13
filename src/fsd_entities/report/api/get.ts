import { AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { Page, ReportedComment, ReportedPost } from '@/fsd_entities/report';

import { API } from '@/fsd_shared';

/** BE 원형 타입 (필요하면 필드명 맞춰서 수정) */
export interface BE_ReportedPost {
  boardName: string;
  postId: string;
  postTitle: string;
  reportCreatedAt: string;
  reportId: string;
  reportReasonDescription: string;
  writerName: string;
}
export interface BE_ReportedComment {
  commentId: string;
  commentContent: string;
  parentPostTitle: string;
  writerName: string;
  reportReasonDescription: string;
  reportCreatedAt: string;
}

/** 어댑터: BE → UI */
export const adaptPost = (be: BE_ReportedPost): ReportedPost => ({
  kind: 'post',
  id: be.postId,
  title: be.postTitle,
  boardName: be.boardName,
  offenderName: be.writerName,
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
});
export const adaptComment = (be: BE_ReportedComment): ReportedComment => ({
  kind: 'comment',
  id: be.commentId,
  content: be.commentContent,
  parentPostTitle: be.parentPostTitle,
  offenderName: be.writerName,
  reason: be.reportReasonDescription,
  createdAt: be.reportCreatedAt,
});

type GetPageArgs = { pageNum?: number; signal?: AbortSignal };

const URI = '/api/v1/reports';

/** 신고된 게시글 목록 (Spring Page) */
export const getReportedPosts = async ({ pageNum = 0, signal }: GetPageArgs) => {
  const res = await API.get(`${URI}/posts`, {
    params: { pageNum },
    signal,
  });
  console.log('신고된 게시글 목록:', res.data);
  return res.data;
};

/** 신고된 댓글·대댓글 목록 (Spring Page) */
export const getReportedComments = async ({ pageNum = 0, signal }: GetPageArgs) => {
  const res = await API.get(`${URI}/comments`, {
    params: { pageNum },
    signal,
  });
  console.log('신고된 댓글·대댓글 목록:', res.data);
  return res.data;
};
