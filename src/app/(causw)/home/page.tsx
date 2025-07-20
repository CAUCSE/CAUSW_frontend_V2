import { HomeRscService } from '@/shared';

import ClientGate from './ClientGate';

export default async function HomePage() {
  const { getHomePosts, getEvents } = HomeRscService();
  const events = await getEvents();
  const homePosts = await getHomePosts();

  return (
    <>
      {/* 사용자 academicStatus는 클라이언트에서 판단 */}
      <ClientGate events={events} homePosts={homePosts} />
    </>
  );
}
