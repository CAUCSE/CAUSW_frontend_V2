'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Header, Line } from '@/entities';
import { SettingService } from '@/shared';

interface IFormInput {
  searchContent: string;
}

const AddPayer = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { getUserByName } = SettingService();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    getUserByName(data.searchContent).then(res => setDate(res));
  };

  const [data, setDate] = useState<User.User[]>([]);

  const [selectId, setSelectId] = useState<string>();

  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <Link href={'/setting'} className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <div className="mt-7 flex w-full flex-col items-center">
          <Header bold big>
            유저 선택
            <span className="ml-2 text-red-500"></span>
          </Header>
          <div className="mb-6 flex h-14 w-full items-center justify-center">
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full w-full justify-between gap-4 pt-4 lg:w-3/4"
            >
              <input
                className="w-full rounded-3xl border border-black text-center"
                type="text"
                {...register('searchContent', {
                  required: true,
                  maxLength: 30,
                })}
                id="searchContent"
                placeholder="30자 이내로 입력해주세요."
              />
              <button className="w-36 rounded-3xl bg-red-500 text-white" type="submit">
                검색
              </button>
            </form>
          </div>
          <Line />
          <div className="mt-3 w-full">
            <Header bold>검색 결과</Header>
            <div className="mt-3 flex flex-col">
              {data.length < 1 ? '검색 결과가 없습니다.' : null}
              {data.map(element => (
                <div
                  className={`pb-1 pl-2 pt-1 text-lg ${
                    selectId === element.id ? 'rounded-lg bg-focus text-white' : ''
                  }`}
                  key={element.name}
                  onClick={() => {
                    setSelectId(element.id);
                  }}
                >
                  {element.name}({element.studentId})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (!selectId) return;
          router.push('/setting/management/payer/add/' + selectId);
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform rounded-3xl bg-red-500 px-6 py-3 font-bold text-white lg:bottom-10"
      >
        선택 완료
      </button>
    </>
  );
};

export default AddPayer;
