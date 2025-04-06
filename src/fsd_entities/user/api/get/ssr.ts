import { BASEURL, setRscHeader } from '@/fsd_shared';

import { URI } from '../../config';

export const getMe = async () => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${URI}/me`, { headers: headers }).then(res => res.json())) as User.UserDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${URI}/${id}`, { headers: headers }).then(res => res.json())) as User.UserDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAcademicRecord = async (id: string) => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${URI}/academic-record/record/${id}`, { headers: headers }).then(res =>
      res.json(),
    )) as any;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMyCircles = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${URI}/circles`, {
      headers: headers,
    }).then(res => res.json())) as Circle.CirclesRequestDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};
