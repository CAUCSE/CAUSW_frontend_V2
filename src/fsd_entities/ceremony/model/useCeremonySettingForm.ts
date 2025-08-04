'use client';

import { useEffect, useMemo, useState } from 'react';

import { useCeremonySettingMutation, useCeremonySettingQuery } from '@/fsd_entities/notification';

export const useCeremonySettingForm = (useExistingSetting = true) => {
  const { data: existingSetting } = useCeremonySettingQuery();
  const isUpdate = useExistingSetting && !!(existingSetting && typeof existingSetting !== 'string');
  const { mutate: submitSettings } = useCeremonySettingMutation(isUpdate);
  const [years, setYears] = useState<number[]>([]);
  const [setAll, setSetAllValue] = useState(false);

  useEffect(() => {
    if (useExistingSetting && isUpdate) {
      setYears(existingSetting.subscribedAdmissionYears ?? []);
      setSetAllValue(existingSetting.setAll);
    }
  }, [existingSetting, isUpdate, useExistingSetting]);

  const sortedYears = useMemo(() => {
    return [...years].sort((a, b) => a - b);
  }, [years]);

  const addYear = (year: number) => {
    if (!years.includes(year)) {
      setYears((prev) => [...prev, year]);
    }
  };

  const removeYear = (year: number) => {
    setYears((prev) => prev.filter((y) => y !== year));
  };

  const onSubmit = () => {
    const payload = {
      subscribedAdmissionYears: sortedYears,
      setAll,
      notificationActive: true,
    };
    submitSettings(payload);
  };
  const reset = () => {
    setYears([]);
    setSetAllValue(false);
  };
  return {
    years: setAll ? [] : sortedYears,
    setAll,
    setAllYearsSelected: setSetAllValue,
    addYear,
    removeYear,
    onSubmit,
    reset,
  };
};
