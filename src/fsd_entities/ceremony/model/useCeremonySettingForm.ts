'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { createCeremonyNotificationSetting, getCeremonyNotificationSetting, updateCeremonySetting } from '../api';

export const useCeremonySettingForm = () => {
  const [persistedYears, setPersistedYears] = useState<number[]>([]);
  const [existingSetting, setExistingSetting] = useState<Ceremony.CeremonyNotificationSettingDto | null>(null);

  const [setAll, setSetAllValue] = useState(false);

  const yearsToDisplay = setAll ? [] : persistedYears;

  const setAllYearsSelected = (value: boolean) => {
    setSetAllValue(value);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const result = await getCeremonyNotificationSetting();
        if (typeof result !== 'string') {
          setExistingSetting(result);
          setPersistedYears(result.subscribedAdmissionYears ?? []);
          setSetAllValue(result.setAll);
        } else {
          toast.error(result);
        }
      } catch (e) {
        toast.error('알림 설정을 불러오는 데 실패했습니다.');
      }
    };

    fetchSettings();
  }, []);

  const addYear = (year: number) => {
    if (!persistedYears.includes(year)) {
      setPersistedYears((prev) => [...prev, year].sort());
    }
  };

  const removeYear = (year: number) => {
    setPersistedYears((prev) => prev.filter((y) => y !== year));
  };

  const onSubmit = async () => {
    const payload: Ceremony.NotificationSettingPayload = {
      subscribedAdmissionYears: persistedYears,
      setAll,
      notificationActive: true,
    };

    try {
      if (existingSetting) {
        await updateCeremonySetting(payload);
      } else {
        await createCeremonyNotificationSetting(payload);
      }
      toast.success('설정이 저장되었습니다.');
    } catch (error) {
      toast.error('알림 설정 저장에 실패했습니다.');
    }
  };

  return {
    years: yearsToDisplay,
    setAll,
    setAllYearsSelected,
    addYear,
    removeYear,
    onSubmit,
  };
};