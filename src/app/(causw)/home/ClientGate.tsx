'use client';

import { useMyInfo } from '@/entities/user/model';

import { LoadingComponent } from '@/shared';

import { GraduateHomePage } from './ClientGraduatePage';
import { ClientHomePage } from './ClientPage';

export const ClientGate = ({ events }: { events: Home.GetEventsResponseDto }) => {
  const { data: user } = useMyInfo();

  if (!user) return null;

  const isGraduated = user.academicStatus === 'GRADUATED';

  return isGraduated ? <GraduateHomePage events={events} /> : <ClientHomePage events={events} />;
};
