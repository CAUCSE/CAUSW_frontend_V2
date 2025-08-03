'use client';

import { useRouter } from 'next/navigation';

import { useShallow } from 'zustand/react/shallow';

import { useFindAccountStore } from '@/fsd_entities/auth/model/stores';

export const FindEmailResult = () => {
  const router = useRouter();

  const { email } = useFindAccountStore(
    useShallow((state) => ({
      email: state.email,
    })),
  );

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
      <h2 className="mb-4 text-xl font-semibold">당신의 아이디(이메일)은</h2>
      <p className="text-lg">
        <span className="text-red-500">{email}</span> 입니다.
      </p>
      <div className="mt-4 flex w-full justify-between px-4">
        <button
          className="bg-focus mt-6 h-10 w-40 rounded-lg text-white hover:bg-blue-400"
          onClick={() => router.push('/auth/signin')}
        >
          로그인하기
        </button>
        <button
          className="bg-focus mt-6 h-10 w-40 rounded-lg text-white hover:bg-blue-400"
          onClick={() => router.push('/auth/findpassword')}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};
