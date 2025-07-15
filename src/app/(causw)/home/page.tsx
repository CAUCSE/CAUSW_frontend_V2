'use client';

import { useEffect, useState } from 'react';

import Loading from '@/app/loading';

import { FCMTokenChecker } from '@/fsd_widgets/notification';

import { useMyInfoStore } from '@/fsd_entities/user/model';

import { HomeRscService } from '@/shared';

import ClientGraduatePage from './ClientGraduatePage';
import ClientHomePage from './ClientPage';

export default function HomePage() {
  const academicStatus = useMyInfoStore((state) => state.academicStatus);
  const [events, setEvents] = useState<Home.GetEventsResponseDto | null>(null);
  const [homePosts, setHomePosts] = useState<Home.GetHomePostsResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  const isGraduated = academicStatus === 'GRADUATED';

  useEffect(() => {
    const fetchData = async () => {
      const { getHomePosts, getEvents } = HomeRscService();
      const eventsRes = await getEvents();
      const postsRes = await getHomePosts();

      setEvents(eventsRes);
      setHomePosts(postsRes);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !academicStatus) {
    return <Loading />;
  }

  return (
    <>
      <FCMTokenChecker />
      {isGraduated ? <ClientGraduatePage events={events} /> : <ClientHomePage events={events} homePosts={homePosts} />}
    </>
  );
}
