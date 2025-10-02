'use client';

import { useHomeEventQuery } from '@/entities/home/model';

import { ErrorFallback, LoadingComponent } from '@/shared';

import { ClientGate } from './ClientGate';

export default function HomePage() {
  const { data: events, isLoading, isError } = useHomeEventQuery();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!events || isError) {
    return <ErrorFallback />;
  }

  return <ClientGate events={events} />;
}
