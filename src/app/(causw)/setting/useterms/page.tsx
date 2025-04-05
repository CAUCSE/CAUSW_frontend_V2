'use client';

import { useRouter } from 'next/navigation';

import { UseTerms } from '@/entities/home/useTerms';

const useTermsPage = () => {
  const router = useRouter();

  return (
    <UseTerms
      closeModal={() => {
        router.push('./');
      }}
    ></UseTerms>
  );
};

export default useTermsPage;
