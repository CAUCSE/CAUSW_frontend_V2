import type { AxiosResponse } from 'axios';

import { CreateReportReq, CreateReportRes } from '@/shared/@types/report-ui';

import { API } from '@/shared';

const URI = '/api/v1/reports';

export const createReport = async (body: CreateReportReq) => {
  const res: AxiosResponse<CreateReportRes> = await API.post(URI, body);
  return res.data;
};
