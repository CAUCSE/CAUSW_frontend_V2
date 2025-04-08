import { BASEURL, setRscHeader } from '@/fsd_shared';

export const getCeremonyAwaitList = async (page: number, size: number, sort?: string[]) => {
  const URI = `${BASEURL}/api/v1/ceremony/list/await`;
  const url = new URL(URI);
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  if (sort) {
    params.append('sort', sort.join(','));
  }
  const finalUrl = `${url.toString()}?${params.toString()}`;
  try {
    const headers = await setRscHeader();
    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        ...headers,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const res = await response.json();
    console.log('res', res);
    return res?.content?.length ? res.content : [];
  } catch (error) {
    console.error('Ceremony list fetch error:', error);
    throw error;
  }
};
