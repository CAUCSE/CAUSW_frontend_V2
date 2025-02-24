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
}
