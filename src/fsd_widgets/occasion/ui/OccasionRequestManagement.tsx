'use client';

import Link from 'next/link';

import clsx from 'clsx';

import { useCeremonyData } from '@/fsd_entities/ocaasion';

import { Header, Line, PreviousButton } from '@/fsd_shared';

import { OccasionList } from './OccasionList';

export const OccasionRequestManagement = ({
  state,
  title,
  firstNavigation,
  navigation,
}: Occasion.OccasionRequestManagementProps) => {
  const { ceremonyList } = useCeremonyData();
  const isFirstNavigation = (() => {
    if (!state) return true;
    if (!navigation) return false;
    return navigation.findIndex((element) => element.state === state) === -1;
  })();

  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <Header bold big>
          {title}
        </Header>
        <div className="scrollbar-hide mb-[-18px] h-[86px] w-full overflow-x-auto md:mb-0 md:h-[70px]">
          <div
            className={clsx(
              'mt-8 flex flex-row px-4 md:mb-1 md:justify-start lg:w-full',
              (navigation?.length ?? 0) > 5 && 'mb-1 w-[1000px] justify-between',
              (navigation?.length ?? 0) > 2 && (navigation?.length ?? 0) <= 5 && 'mb-1 w-[600px] justify-between',
              (navigation?.length ?? 0) <= 2 && 'mb-5 w-full justify-start',
            )}
          >
            <Link
              href={firstNavigation.state}
              className={clsx('text-xl', isFirstNavigation && 'border-b-focus border-b-4')}
            >
              {firstNavigation.name}
            </Link>
          </div>
        </div>

        <Line />

        <OccasionList list={ceremonyList} firstNavigation={firstNavigation} navigation={navigation} state={state} />
      </div>
    </div>
  );
};
