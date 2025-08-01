'use client';

// 초기 렌더링 시점에 불러오지 않고, 클라이언트에서만 동적으로 불러옵니다.
import dynamic from 'next/dynamic';

// 클라이언트에서 비동기적으로 로드되는 동안 로딩 컴포넌트를 보여줍니다.
import Loading from '@/app/loading';

import { useMyInfoStore } from '@/fsd_entities/user/model';

// 클라이언트 전용 페이지 컴포넌트
const ClientHomePage = dynamic(() => import('./ClientPage'), { ssr: false, loading: () => <Loading /> });
// 졸업생 전용 페이지 컴포넌트
const ClientGraduatePage = dynamic(() => import('./ClientGraduatePage'), { ssr: false, loading: () => <Loading /> });

export default function ClientGate({ events, homePosts }) {
  const isGraduated = useMyInfoStore((state) => state.isGraduate());

  return isGraduated ? (
    <ClientGraduatePage events={events} />
  ) : (
    <ClientHomePage events={events} homePosts={homePosts} />
  );
}
