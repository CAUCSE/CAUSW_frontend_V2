'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

import { getUserByName } from '@/fsd_entities/user/api/get';
import { updateRole } from '@/fsd_entities/user/api/put';

import { Header, Line, SubHeader } from '@/entities';
import { userRoleCodes, useUserStore } from '@/shared';

interface IFormInput {
  searchContent: string;
}

const RoleMandate = ({ params: { state, id } }: { params: { state: string; id: string } }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const circleIdIfLeader = useUserStore((state) => state.circleIdIfLeader);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    getUserByName(data.searchContent).then((res) => setDate(res));
  };

  const [data, setDate] = useState<User.User[]>([]);

  const [selectId, setSelectId] = useState<string>();

  return (
    <>
      <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
        <Link href={'/setting'} className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header bold big>
          권한 위임
          <div className="w-3"></div>
          <SubHeader gray big>
            피위임인을 선택해주세요.
          </SubHeader>
        </Header>
        <div className="mt-7 flex w-full flex-col items-center">
          <Header bold big>
            변경할 권한:
            <span className="ml-2 text-red-500">{userRoleCodes[state.toUpperCase() as User.Role]}</span>
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
              {data.map((element) => (
                <div
                  className={`pt-1 pb-1 pl-2 text-lg ${
                    selectId === element.id ? 'bg-focus rounded-lg text-white' : ''
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

          updateRole(
            selectId,
            state.toUpperCase() as User.Role,
            state.toUpperCase() === 'LEADER_CIRCLE' ? id : null,
          ).then(() => {
            router.back();
          });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transform rounded-3xl bg-red-500 px-6 py-3 font-bold text-white lg:bottom-10"
      >
        권한 위임
      </button>
    </>
  );
};

export default RoleMandate;
