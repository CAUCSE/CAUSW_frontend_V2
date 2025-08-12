import { AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { Page, ReportedComment, ReportedPost } from '@/fsd_entities/report';

import { API } from '@/fsd_shared';

/** BE 원형 타입 (필요하면 필드명 맞춰서 수정) */
export interface BE_ReportedPost {
  id: string;
  title: string;
  boardName: string;
  offenderName: string;
  reason: string;
  createdAt: string;
}
export interface BE_ReportedComment {
  id: string;
  content: string;
  parentPostTitle: string;
  offenderName: string;
  reason: string;
  createdAt: string;
}

/** 어댑터: BE → UI */
export const adaptPost = (be: BE_ReportedPost): ReportedPost => ({
  kind: 'post',
  id: be.id,
  title: be.title,
  boardName: be.boardName,
  offenderName: be.offenderName,
  reason: be.reason,
  createdAt: be.createdAt,
});
export const adaptComment = (be: BE_ReportedComment): ReportedComment => ({
  kind: 'comment',
  id: be.id,
  content: be.content,
  parentPostTitle: be.parentPostTitle,
  offenderName: be.offenderName,
  reason: be.reason,
  createdAt: be.createdAt,
});

type GetPageArgs = { pageNum?: number; signal?: AbortSignal };

const URI = '/api/v1/reports';

/** 신고된 게시글 목록 (Spring Page) */
export const getReportedPosts = async ({ pageNum = 0, signal }: GetPageArgs) => {
  const res = await API.get(`${URI}/posts`, {
    params: { pageNum },
    signal,
  });
  return res.data;
};

/** 신고된 댓글·대댓글 목록 (Spring Page) */
export const getReportedComments = async ({ pageNum = 0, signal }: GetPageArgs) => {
  const res = await API.get(`${URI}/comments`, {
    params: { pageNum },
    signal,
  });
  return res.data;
};
