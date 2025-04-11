'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { CeremonyNotificationSettingDto, getCeremonyNotificationSetting } from '@/fsd_entities/notification/api/get';
import { createCeremonyNotificationSetting } from '@/fsd_entities/notification/api/post';
import { updateCeremonySetting } from '@/fsd_entities/notification/api/put';

interface NotificationSettingPayload {
  subscribedAdmissionYears: number[] | null;
  setAll: boolean;
  notificationActive: boolean;
}

export const useNotificationSettingForm = () => {
  const [years, setYears] = useState<number[]>([]);
  const [existingSetting, setExistingSetting] = useState<CeremonyNotificationSettingDto | null>(null);

  const [setAll, setSetAllValue] = useState(false);

  const setSetAll = (value: boolean) => {
    setSetAllValue(value);
    if (value) setYears([]);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getCeremonyNotificationSetting();
        if (typeof result !== 'string') {
          setExistingSetting(result);
          setYears(result.subscribedAdmissionYears ?? []);
          setSetAll(result.setAll);
        } else {
          toast.error(result);
        }
      } catch (e) {
        toast.error('알림 설정을 불러오는 데 실패했습니다.');
      }
    };
    fetch();
  }, []);

  const addYear = (year: number) => {
    if (!years.includes(year)) {
      setYears(prev => [...prev, year]);
    }
  };

  const removeYear = (year: number) => {
    setYears(prev => prev.filter(y => y !== year));
  };

  const onSubmit = async () => {
    const payload: NotificationSettingPayload = {
      subscribedAdmissionYears: years,
      setAll,
      notificationActive: true,
    };

    try {
      if (existingSetting) {
        await updateCeremonySetting(payload);
      } else {
        await createCeremonyNotificationSetting(payload);
      }
    } catch (error) {
      toast.error('알림 설정 저장에 실패했습니다.');
      console.error(error);
    }
  };

  return {
    years,
    setAll,
    setSetAll,
    addYear,
    removeYear,
    onSubmit,
  };
};
