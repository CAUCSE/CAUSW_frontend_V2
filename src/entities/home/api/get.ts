import { BASEURL, setRscHeader } from '@/shared';

export const fetchHomePosts = async () => {
  const URI = BASEURL + '/api/v1/home';
  const headers = await setRscHeader();

  const response = (await fetch(URI, {
    method: 'GET',
    headers: headers,
  }).then((res) => res.json())) as Home.GetHomePostsResponseDto & Error.ApiErrorResponse;

  if (response.errorCode) throw new Error(response.errorCode);

  return response as Home.GetHomePostsResponseDto;
};

export const fetchGraduateHomePosts = async () => {
  const GURI = BASEURL + '/api/v1/home/alumni';
  const headers = await setRscHeader();

  const response = (await fetch(GURI, {
    method: 'GET',
    headers: headers,
  }).then((res) => res.json())) as Home.GetHomePostsResponseDto & Error.ApiErrorResponse;

  if (response.errorCode) throw new Error(response.errorCode);

  return response as Home.GetHomePostsResponseDto;
};

export const fetchEvents = async () => {
  const headers = await setRscHeader();
  const response = (await fetch(`${BASEURL}/api/v1/events`, {
    method: 'GET',
    headers: headers,
  }).then((res) => res.json())) as Home.GetEventsResponseDto;

  if (response.errorCode) throw new Error(response.errorCode);

  return response as Home.GetEventsResponseDto;
};

export const fetchCalendars = async (year: number) => {
  const headers = await setRscHeader();
  const response = (await fetch(`${BASEURL}/api/v1/calendars?year=${year}`, {
    method: 'GET',
    headers: headers,
  }).then((res) => res.json())) as Home.GetCalendarsResponseDto;

  if (response.errorCode) throw new Error(response.errorCode);
  return response as Home.GetCalendarsResponseDto;
};

export const fetchCalendar = async (id: string) => {
  const headers = await setRscHeader();
  const response = (await fetch(`${BASEURL}/api/v1/calendars/${id}`, {
    method: 'GET',
    headers: headers,
  }).then((res) => res.json())) as Home.Calendar & Error.ApiErrorResponse;

  if (response.errorCode) throw new Error(response.errorCode);

  return response as Home.Calendar;
};