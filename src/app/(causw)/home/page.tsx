import { fetchEvents } from '@/entities/home';

import ClientGate from './ClientGate';

export default async function HomePage() {
  const events = await fetchEvents();

  return (
    <>
      {/* 사용자 academicStatus는 클라이언트에서 판단 */}
      <ClientGate events={events} />
    </>
  );
}
