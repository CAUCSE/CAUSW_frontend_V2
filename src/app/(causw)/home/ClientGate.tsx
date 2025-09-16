import { fetchMyInfo } from '@/entities/user/api';

import ClientGraduatePage from './ClientGraduatePage';
import ClientHomePage from './ClientPage';

export default async function ClientGate({ events }) {
  const user = await fetchMyInfo();
  const isGraduated = user.academicStatus === 'GRADUATED';

  return isGraduated ? <ClientGraduatePage events={events} /> : <ClientHomePage events={events} />;
}
