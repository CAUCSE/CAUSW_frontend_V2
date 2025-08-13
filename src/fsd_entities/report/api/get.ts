import {
  adaptReportedUser,
  adaptUserReportedComment,
  adaptUserReportedPost,
  BE_ReportedUser,
  BE_UserReportedComment,
  BE_UserReportedPost,
  ReportedUser,
} from '@/fsd_entities/report';

import { API } from '@/fsd_shared';

type GetPageArgs = { pageNum?: number; signal?: AbortSignal };

const URI = '/api/v1/reports';

/** 신고된 게시글 목록 */
export const getReportedPosts = async ({ pageNum = 0, signal }: GetPageArgs) => {
  const res = await API.get(`${URI}/posts`, {
    params: { pageNum },
    signal,
  });
  // console.log('신고된 게시글 목록:', res.data);
  return res.data;
};

/** 신고된 댓글·대댓글 목록 */
export const getReportedComments = async ({ pageNum = 0, signal }: GetPageArgs) => {
  const res = await API.get(`${URI}/comments`, {
    params: { pageNum },
    signal,
  });
  // console.log('신고된 댓글·대댓글 목록:', res.data);
  return res.data;
};

/** 신고된 유저 목록 */
export const getReportedUsers = async (pageNum = 0): Promise<ReportedUser[]> => {
  const res = await API.get<{ content: BE_ReportedUser[] }>(`${URI}/users`, {
    params: { pageNum },
  });
  return res.data.content.map(adaptReportedUser);
};

/** 신고된 유저의 신고 게시글 목록 */
export const getUserReportedPosts = async (userId: string, pageNum = 0) => {
  const res = await API.get<{ content: BE_UserReportedPost[] }>(`${URI}/users/${userId}/posts`, {
    params: { pageNum },
  });
  return res.data.content.map(adaptUserReportedPost);
};

/** 신고된 유저의 신고 댓글·대댓글 목록 */
export const getUserReportedComments = async (userId: string, pageNum = 0) => {
  const res = await API.get<{ content: BE_UserReportedComment[] }>(`${URI}/users/${userId}/comments`, {
    params: { pageNum },
  });
  return res.data.content.map(adaptUserReportedComment);
};
