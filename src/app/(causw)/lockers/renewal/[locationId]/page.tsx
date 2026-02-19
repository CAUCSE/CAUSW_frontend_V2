'use client';

import { useMemo, useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  getLockerLocationV2,
  getMyLockerV2,
  postLockerExtendV2,
  postLockerRegisterV2,
  postLockerReturnV2,
} from '@/entities/locker';

import { LoadingScreen, parseErrorMessage } from '@/shared';

const LockerSelectionPage = () => {
  const params = useParams();
  const locationId = params.locationId as string;

  const queryClient = useQueryClient();

  const { data: lockerLocation, isLoading: isLocationLoading } = useQuery({
    queryKey: ['lockerV2', 'location', locationId],
    queryFn: () => getLockerLocationV2(locationId),
  });

  const { data: myLocker } = useQuery({
    queryKey: ['lockerV2', 'me'],
    queryFn: getMyLockerV2,
  });

  const [selectedLockerId, setSelectedLockerId] = useState<string | null>(null);

  const handleSelectLocker = (lockerId: string) => {
    setSelectedLockerId((prev) => (prev === lockerId ? null : lockerId));
  };

  const { mutate: registerLocker, isPending: isRegistering } = useMutation({
    mutationFn: (id: string) => postLockerRegisterV2(id),
    onSuccess: () => {
      toast.success('사물함 등록이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['lockerV2'] });
    },
    onError: (error) => {
      toast.error(parseErrorMessage(error, '사물함 등록에 실패했습니다.'));
    },
  });

  const { mutate: extendLocker, isPending: isExtending } = useMutation({
    mutationFn: (id: string) => postLockerExtendV2(id),
    onSuccess: () => {
      toast.success('사물함 연장이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['lockerV2'] });
    },
    onError: (error) => {
      toast.error(parseErrorMessage(error, '사물함 연장에 실패했습니다.'));
    },
  });

  const { mutate: returnLocker, isPending: isReturning } = useMutation({
    mutationFn: (id: string) => postLockerReturnV2(id),
    onSuccess: () => {
      toast.success('사물함 반납이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['lockerV2'] });
    },
    onError: (error) => {
      toast.error(parseErrorMessage(error, '사물함 반납에 실패했습니다.'));
    },
  });

  const isLoading = isLocationLoading;

  const currentLockerId = myLocker?.hasLocker ? myLocker.lockerId : null;
  const currentExpiredAt = myLocker?.hasLocker ? myLocker.expiredAt : null;
  const currentLockerDisplayName = myLocker?.hasLocker
    ? myLocker.displayName
    : null;

  const selectedLocker = selectedLockerId
    ? (lockerLocation?.lockers.find(
        (locker) => locker.lockerId === selectedLockerId,
      ) ?? null)
    : null;

  const formatExpireAt = (iso?: string | null) => {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
      d.getMinutes(),
    )}`;
  };

  const periodMessage = useMemo(() => {
    if (!lockerLocation) return '';
    const { currentPolicy } = lockerLocation;
    if (currentPolicy.canApply) return '사물함 신청 기간입니다.';
    if (currentPolicy.canExtend) return '사물함 연장 기간입니다.';
    return '사물함 신청 기간이 아닙니다.';
  }, [lockerLocation]);

  if (isLoading) return <LoadingScreen />;

  if (!lockerLocation) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-[#555555]">
        사물함 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const { floor, summary, lockers, currentPolicy } = lockerLocation;

  const handleClickRegister = () => {
    if (!selectedLockerId) {
      toast.error('사물함을 선택해주세요.');
      return;
    }
    registerLocker(selectedLockerId);
  };

  const handleClickExtend = () => {
    if (!currentLockerId) {
      toast.error('연장할 사물함이 없습니다.');
      return;
    }
    extendLocker(currentLockerId);
  };

  const handleClickReturn = () => {
    if (!currentLockerId) {
      toast.error('반납할 사물함이 없습니다.');
      return;
    }
    returnLocker(currentLockerId);
  };

  const isMineLocker = (locker: LockerV2.Locker) =>
    locker.status === 'MINE' || currentLockerId === locker.lockerId;

  const isAvailableLocker = (status: LockerV2.LockerStatus) =>
    status === 'AVAILABLE';

  const isDisabledLocker = (status: LockerV2.LockerStatus) =>
    status === 'DISABLED';

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <header>
        <button
          type="button"
          onClick={() => history.back()}
          className="mb-7 flex items-center text-lg"
        >
          <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
          이전
        </button>
        <div className="mb-4 flex items-center gap-4">
          <h1 className="text-2xl">{floor.locationName}</h1>
          <p className="text-[#8B8B8B]">
            잔여 {summary.availableCount}개 / 전체 {summary.totalCount}개
          </p>
        </div>
      </header>

      <div className="flex h-full flex-col items-center gap-4 md:flex-row md:justify-between">
        {/* 모바일 안내 */}
        <div className="flex w-full flex-col items-center gap-6 md:hidden">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">사물함을 선택해주세요!</h1>
            <p
              className={`text-xl ${
                !lockerLocation.currentPolicy.canApply &&
                !lockerLocation.currentPolicy.canExtend
                  ? 'text-red-500'
                  : ''
              }`}
            >
              {periodMessage}
            </p>

            <p className="text-base">
              <span className="font-medium">만료일시 :</span>{' '}
              {formatExpireAt(currentExpiredAt) || '\u00A0'}
            </p>
            <p className="text-base">
              <span className="font-medium">내 사물함 :</span>{' '}
              {currentLockerDisplayName || '없음'}
            </p>
            <p className="text-base">
              <span className="font-medium">선택한 사물함 :</span>{' '}
              {selectedLocker
                ? `${floor.locationName} ${selectedLocker.number}번`
                : '없음'}
            </p>
          </div>
        </div>

        {/* 사물함 그리드 */}
        <div className="grid h-[450px] shrink-0 grid-cols-4 gap-2 overflow-y-auto p-1 pr-2 sm:h-[600px] sm:grid-cols-5 md:gap-4 xl:h-[800px]">
          {lockers.map((locker) => {
            const mine = isMineLocker(locker);
            const available = isAvailableLocker(locker.status);
            const selected = selectedLockerId === locker.lockerId;

            return (
              <button
                key={locker.lockerId}
                type="button"
                onClick={() => {
                  if (isDisabledLocker(locker.status)) return;
                  handleSelectLocker(locker.lockerId);
                }}
                className={`h-16 w-16 ${
                  selected && 'scale-110 border-2 border-[#76C6D1] shadow-md'
                } ${
                  mine
                    ? 'bg-[#76C6D1]'
                    : available
                      ? 'bg-white'
                      : isDisabledLocker(locker.status)
                        ? 'bg-[#B0B0B0]'
                        : 'bg-[#D9D9D9]'
                } ${
                  !selected && available && 'border border-[#BABABA]'
                } text-[#686868]`}
              >
                {locker.number}
              </button>
            );
          })}
        </div>

        {/* 모바일 액션 버튼 */}
        <div className="fixed bottom-24 left-1/2 z-10 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={handleClickRegister}
            disabled={
              !currentPolicy.canApply ||
              !selectedLockerId ||
              isRegistering ||
              !lockers.find(
                (l) =>
                  l.lockerId === selectedLockerId &&
                  isAvailableLocker(l.status),
              )
            }
            className={`h-12 w-full rounded-3xl text-base font-semibold ${
              currentPolicy.canApply &&
              selectedLockerId &&
              lockers.find(
                (l) =>
                  l.lockerId === selectedLockerId &&
                  isAvailableLocker(l.status),
              ) &&
              !isRegistering
                ? 'bg-[#6BBEEC]'
                : 'bg-[#BABABA]'
            }`}
          >
            신청하기
          </button>

          {currentLockerId && (
            <div className="flex w-full justify-around gap-4">
              <button
                type="button"
                onClick={handleClickReturn}
                disabled={isReturning || currentPolicy.canExtend}
                className={`h-12 w-1/2 rounded-3xl text-base font-semibold ${
                  !isReturning && !currentPolicy.canExtend
                    ? 'bg-[#6BBEEC]'
                    : 'bg-[#BABABA]'
                }`}
              >
                반납하기
              </button>

              <button
                type="button"
                onClick={handleClickExtend}
                disabled={!currentPolicy.canExtend || isExtending}
                className={`h-12 w-1/2 rounded-3xl text-base font-semibold ${
                  currentPolicy.canExtend && !isExtending
                    ? 'bg-[#6BBEEC]'
                    : 'bg-[#BABABA] text-[#888888]'
                }`}
              >
                연장하기
              </button>
            </div>
          )}
        </div>

        {/* 데스크톱 안내 + 버튼 */}
        <div className="hidden h-[600px] flex-col items-center justify-between rounded-2xl border border-[#BABABA] bg-white px-4 py-6 md:flex xl:h-[780px]">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-2xl font-bold">사물함을 선택해주세요!</h1>
              <p
                className={`text-xl ${
                  !lockerLocation.currentPolicy.canApply &&
                  !lockerLocation.currentPolicy.canExtend
                    ? 'text-red-500'
                    : ''
                }`}
              >
                {periodMessage}
              </p>

              <p className="text-base">
                <span className="font-medium">만료일시 :</span>{' '}
                {formatExpireAt(currentExpiredAt) || '\u00A0'}
              </p>
              <p className="text-base">
                <span className="font-medium">내 사물함 :</span>{' '}
                {currentLockerDisplayName || '없음'}
              </p>
              <p className="text-base">
                <span className="font-medium">선택한 사물함 :</span>{' '}
                {selectedLocker
                  ? `${floor.locationName} ${selectedLocker.number}번`
                  : '없음'}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-8">
            {/* 신청 버튼 */}
            <button
              type="button"
              onClick={handleClickRegister}
              disabled={
                !currentPolicy.canApply ||
                !selectedLockerId ||
                isRegistering ||
                !lockers.find(
                  (l) =>
                    l.lockerId === selectedLockerId &&
                    isAvailableLocker(l.status),
                )
              }
              className={`h-14 w-2/3 rounded-3xl text-lg font-semibold ${
                currentPolicy.canApply &&
                selectedLockerId &&
                lockers.find(
                  (l) =>
                    l.lockerId === selectedLockerId &&
                    isAvailableLocker(l.status),
                ) &&
                !isRegistering
                  ? 'bg-[#6BBEEC]'
                  : 'bg-[#BABABA]'
              }`}
            >
              신청하기
            </button>

            {/* 내 사물함일 때만 반납/연장 */}
            {currentLockerId && (
              <div className="flex w-full justify-around gap-4">
                <button
                  type="button"
                  onClick={handleClickReturn}
                  disabled={isReturning || currentPolicy.canExtend}
                  className={`h-14 w-1/3 min-w-[100px] rounded-3xl text-lg font-semibold ${
                    !isReturning && !currentPolicy.canExtend
                      ? 'bg-[#6BBEEC]'
                      : 'bg-[#BABABA]'
                  }`}
                >
                  반납하기
                </button>

                <button
                  type="button"
                  onClick={handleClickExtend}
                  disabled={!currentPolicy.canExtend || isExtending}
                  className={`h-14 w-1/3 min-w-[100px] rounded-3xl text-lg font-semibold ${
                    currentPolicy.canExtend && !isExtending
                      ? 'bg-[#6BBEEC]'
                      : 'bg-[#BABABA] text-[#888888]'
                  }`}
                >
                  연장하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerSelectionPage;
