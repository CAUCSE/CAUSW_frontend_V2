'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { getCeremonyAwaitList } from '@/fsd_entities/ocaasion/api/get';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared/configs/constants';

import { Header, Line } from '@/fsd_shared';

import { OccasionList } from './OccasionList';

export const OccasionRequestManagement = ({
  state,
  title,
  firstNavigation,
  navigation,
}: OccasionRequestManagementProps) => {
  const [ceremonyList, setCeremonyList] = useState<any[]>([]);
  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation) {
    isFirstNavigation = navigation.findIndex(element => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }
  useEffect(() => {
    const fetchCeremonyList = async () => {
      try {
        const result = await getCeremonyAwaitList(0, 10);
        console.log('result', result);
        setCeremonyList(result);
      } catch (error) {
        throw new Error(ERROR_MESSAGES.OCCASION_LIST_FETCH_FAIL);
      }
    };

    fetchCeremonyList();
  }, []);

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <Link href="/setting" className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        {MESSAGES.PREVIOUS_BUTTON_TEXT}
      </Link>
      <Header bold big>
        {title}
      </Header>
      <div className="mb-[-18px] h-[86px] w-full overflow-x-auto scrollbar-hide md:mb-0 md:h-[70px]">
        <div
          className={`mt-8 flex px-4 ${navigation && navigation.length > 5 ? 'mb-1 w-[1000px] justify-between' : navigation && navigation.length > 2 ? 'mb-1 w-[600px] justify-between' : 'mb-5 w-full justify-start'} flex-row md:mb-1 md:justify-start lg:w-full`}
        >
          <Link
            href={firstNavigation.state}
            className={`${isFirstNavigation ? 'border-b-4 border-b-focus' : ''} h-18 text-xl`}
          >
            {firstNavigation.name}
          </Link>
        </div>
      </div>

      <Line />

      <OccasionList list={ceremonyList} firstNavigation={firstNavigation} navigation={navigation} state={state} />
    </div>
  );
};
