'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { createCeremonyNotificationSetting, getCeremonyNotificationSetting, updateCeremonySetting } from '../api';

export const useNotificationSettingForm = () => {
  const [years, setYears] = useState<number[]>([]);
  const [existingSetting, setExistingSetting] = useState<Ceremony.CeremonyNotificationSettingDto | null>(null);
  const [setAll, setSetAllValue] = useState(false);
  const setAllYearsSelected = (value: boolean) => {
    setSetAllValue(value);
    if (value) setYears([]);
  };

  const fetchCeremonyNotificationSetting = async (setExistingSetting, setYears, setAllYearsSelected) => {
    try {
      const result = await getCeremonyNotificationSetting();
      if (typeof result !== 'string') {
        setExistingSetting(result);
        setYears(result.subscribedAdmissionYears ?? []);
        setAllYearsSelected(result.setAll);
      } else {
        toast.error(result);
      }
    } catch (e) {
      toast.error('알림 설정을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchCeremonyNotificationSetting(setExistingSetting, setYears, setAllYearsSelected);
  }, []);

  const addYear = (year: number) => {
    if (!years.includes(year)) {
      setYears((prev) => [...prev, year]);
    }
  };

  const removeYear = (year: number) => {
    setYears((prev) => prev.filter((y) => y !== year));
  };

  const onSubmit = async () => {
    const payload: Ceremony.NotificationSettingPayload = {
      subscribedAdmissionYears: years,
      setAll,
      notificationActive: true,
    };
    try {
      if (existingSetting) {
        updateCeremonySetting(payload);
        return;
      }
      createCeremonyNotificationSetting(payload);
    } catch (error) {
      toast.error('알림 설정 저장에 실패했습니다.');
    }
  };

  return {
    years,
    setAll,
    setAllYearsSelected,
    addYear,
    removeYear,
    onSubmit,
  };
};
