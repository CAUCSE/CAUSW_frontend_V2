import { BASEURL, setRscHeader } from '@/fsd_shared';

// 상태:  ACCEPT, REJECT, AWAIT, CLOSE
export const updateCeremonyState = async ({
  ceremonyId,
  targetCeremonyState,
  rejectMessage,
}: {
  ceremonyId: string;
  targetCeremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';
  rejectMessage?: string;
}) => {
  const headers = await setRscHeader();
  const res = await fetch(`${BASEURL}/api/v1/ceremony/state`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      ceremonyId,
      targetCeremonyState,
      rejectMessage,
    }),
  });

  if (!res.ok) {
    throw new Error(`Update failed with status ${res.status}`);
  }

  return await res.json();
};
