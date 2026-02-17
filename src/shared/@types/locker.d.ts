declare namespace Locker {
  export interface LockerLocationResponseDto {
    id: string;
    name: string;
    enableLockerCount: number;
    totalLockerCount: number;
  }

  export interface LockerResponseDto {
    id: string;
    lockerNumber: string;
    isActive: boolean;
    isMine: boolean;
    expireAt: string;
    updateAt: string;
  }

  export interface LockerLocationsResponseDto {
    lockerLocations: LockerLocationResponseDto[];
    myLocker: LockerResponseDto | null;
  }

  export interface LockersResponseDto {
    locationName: string;
    lockerPeriod: TLockerPeriod;
    lockerList: LockerResponseDto[];
  }

  export type TLockerPeriod = 'LOCKER_ACCESS' | 'LOCKER_EXTEND' | 'NULL';
}

declare namespace LockerV2 {
  export type LockerStatus = 'AVAILABLE' | 'MINE' | 'IN_USE' | 'DISABLED';

  export interface MeResponse {
    hasLocker: boolean;
    lockerId: string | null;
    displayName: string | null;
    expiredAt: string | null;
  }

  export interface FloorInfo {
    locationId: string;
    locationName: string;
  }

  export interface Policy {
    canApply: boolean;
    canExtend: boolean;
  }

  export interface Summary {
    totalCount: number;
    availableCount: number;
  }

  export interface Locker {
    lockerId: string;
    number: string;
    status: LockerStatus;
  }
  export interface LocationDetail {
    floor: FloorInfo;
    currentPolicy: Policy;
    summary: Summary;
    lockers: Locker[];
  }
}
