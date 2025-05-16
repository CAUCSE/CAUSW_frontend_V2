'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createCeremony } from '../api/post';
import { createFormData } from '@/utils/formDataUtil';
import { useFormContext } from 'react-hook-form';

export interface CeremonyFormValues {
  category: string;
  startDate: string;
  endDate: string;
  description: string;
  attachedImageList: File[];
}

export const useCeremonyCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const methods = useFormContext<CeremonyFormValues>();

  const onSubmit = async (formValues: CeremonyFormValues) => {
    const { category, startDate, endDate, description, attachedImageList } = formValues;

    if (!category || !startDate || !endDate || !description) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    const jsonPayload = {
      category,
      startDate,
      endDate,
      description,
      ceremonyState: 'AWAIT',
    };

    const formData = createFormData(
      jsonPayload,
      'createCeremonyRequestDTO',
      Array.isArray(attachedImageList) ? attachedImageList : Array.from(attachedImageList || []),
      'imageFileList',
    );

    setLoading(true);

    try {
      await createCeremony(formData);
      toast.success('경조사가 성공적으로 등록되었습니다.');
      methods.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('예기치 않은 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
  };
};
