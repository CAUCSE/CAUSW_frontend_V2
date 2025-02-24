"use client";

import { API, lockerQueryKey } from "@/shared";

import { useQuery } from "@tanstack/react-query";

export const LockerService = () => {
  const useGetLockerLocations = () => {
    return useQuery({
      queryKey: lockerQueryKey.list(),
      queryFn: async () => {
        const { data }: { data: Locker.LockerLocationsResponseDto } =
          await API.get("/api/v1/lockers/locations");
        return data;
      },
    });
  };
  return { useGetLockerLocations };
};
