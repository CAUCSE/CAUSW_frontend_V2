import { BASEURL, setRscHeader } from "@/shared";

export const HomeRscService = () => {
  const URI = BASEURL + "/api/v1/home";

  const getHomePosts = async () => {
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) throw new Error(response.statusText);

      const data = (await response.json()) as Home.GetHomePostsResponseDto;

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getEvents = async () => {
    const headers = await setRscHeader();
    const response = await fetch(`${BASEURL}/api/v1/events`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(data);
    return data as Home.GetEventsResponseDto;
  };

  const getCalendars = async () => {
    const headers = await setRscHeader();
    const response = await fetch(
      `${BASEURL}/api/v1/calendars/year=${new Date().getFullYear()}`,
      {
        method: "GET",
        headers: headers,
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Home.GetCalendarsResponseDto;
  };

  return { getHomePosts, getEvents, getCalendars };
};
