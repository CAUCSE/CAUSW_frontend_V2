import type { AxiosResponse } from 'axios';

import { API } from '@/fsd_shared';

import { CreateReportReq, CreateReportRes } from '../config';

const URI = '/api/v1/reports';

export const createReport = async (body: CreateReportReq) => {
  const res: AxiosResponse<CreateReportRes> = await API.post(URI, body);
  return res.data;
};
