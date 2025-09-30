import { API, BASEURL, setRscHeader } from '@/shared';

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


export const getEvents = async () => {
  const response = (await API.get('/api/v1/events')).data as Home.GetEventsResponseDto;
  return response as Home.GetEventsResponseDto;
};

export const getCalendars = async (year: number) => {
  const response = (await API.get(`/api/v1/calendars?year=${year}`)).data as Home.GetCalendarsResponseDto;
  return response as Home.GetCalendarsResponseDto;
};

export const getCalendar = async (id: string) => {
  const response = (await API.get(`/api/v1/calendars/${id}`)).data as Home.Calendar;
  return response as Home.Calendar;
};

export const getHomePosts = async () => {
  const response = (await API.get('/api/v1/home')).data as Home.GetHomePostsResponseDto;
  return response as Home.GetHomePostsResponseDto;
};

export const getGraduateHomePosts = async () => {
  const response = (await API.get('/api/v1/home/alumni')).data as Home.GetHomePostsResponseDto;
  return response as Home.GetHomePostsResponseDto;
};