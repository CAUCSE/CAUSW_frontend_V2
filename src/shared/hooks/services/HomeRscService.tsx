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

  const getCalendars = async (year: number) => {
    const headers = await setRscHeader();
    const response = await fetch(`${BASEURL}/api/v1/calendars/year=${year}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Home.GetCalendarsResponseDto;
  };

  const getCalendar = async (id: string) => {
    const headers = await setRscHeader();
    const response = await fetch(`${BASEURL}/api/v1/calendars/${id}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Home.Calendar;
  };

  const createEvent = async (bannerImg: File, url: string) => {
    const formData = new FormData();
    formData.append(
      "eventCreateRequestDto",
      new Blob(
        [
          JSON.stringify({
            url,
          }),
        ],
        { type: "application/json" },
      ),
    );
    formData.append(
      "eventImage",
      // bannerImg,
      new Blob([bannerImg], { type: bannerImg.type }),
      bannerImg.name,
    );

    const headers = await setRscHeader();
    const response = await fetch(`${BASEURL}/api/v1/events`, {
      method: "POST",
      headers: headers,
      body: formData,
    });
    if (!response.ok) throw new Error(response.statusText);
    return true;
  };

  return { getHomePosts, getEvents, getCalendars, getCalendar, createEvent };
};
