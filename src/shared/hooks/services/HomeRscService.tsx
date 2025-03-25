import { BASEURL, setRscHeader, useEventStore } from "@/shared";

export const HomeRscService = () => {
  const URI = BASEURL + "/api/v1/home";

  const getHomePosts = async () => {
    const headers = await setRscHeader();

    const response = (await fetch(URI, {
      method: "GET",
      headers: headers,
    }).then((res) => res.json())) as Home.GetHomePostsResponseDto &
      Error.ApiErrorResponse;

    if (response.errorCode) throw new Error(response.errorCode);

    return response as Home.GetHomePostsResponseDto;
  };

  const getEvents = async () => {
    const headers = await setRscHeader();
    const response = (await fetch(`${BASEURL}/api/v1/events`, {
      method: "GET",
      headers: headers,
    }).then((res) => res.json())) as Home.GetEventsResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response as Home.GetEventsResponseDto;
  };

  const getCalendars = async (year: number) => {
    const headers = await setRscHeader();
    const response = (await fetch(`${BASEURL}/api/v1/calendars?year=${year}`, {
      method: "GET",
      headers: headers,
    }).then((res) => res.json())) as Home.GetCalendarsResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);
    return response as Home.GetCalendarsResponseDto;
  };

  const getCalendar = async (id: string) => {
    const headers = await setRscHeader();
    const response = (await fetch(`${BASEURL}/api/v1/calendars/${id}`, {
      method: "GET",
      headers: headers,
    }).then((res) => res.json())) as Home.Calendar & Error.ApiErrorResponse;

    if (response.errorCode) throw new Error(response.errorCode);

    return response as Home.Calendar;
  };

  return {
    getHomePosts,
    getEvents,
    getCalendars,
    getCalendar,
  };
};
