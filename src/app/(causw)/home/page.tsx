"use client";
import { useHomeEventQuery } from '@/entities/home/model';
import { ClientGate } from './ClientGate';
import { ErrorFallback, LoadingComponent } from '@/shared';

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
