import { HomeRscService } from '@/shared';

import ClientGraduatePage from './ClientGraduatePage';

export default async function GraduateHomePage() {
  const { getEvents } = HomeRscService();
  const events = await getEvents();

  return <ClientGraduatePage events={events} />;
}
