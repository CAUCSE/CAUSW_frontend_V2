import { HomeRscService } from '@/shared';

import ClientGate from './ClientGate';

export default async function HomePage() {
  const { getEvents } = HomeRscService();
  const events = await getEvents();

  return (
    <>
      {/* 사용자 academicStatus는 클라이언트에서 판단 */}
      <ClientGate events={events} />
    </>
  );
}
