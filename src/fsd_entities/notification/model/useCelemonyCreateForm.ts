import { useState } from 'react';
import { postCeremony } from '@/fsd_entities/notification/api/post';
import { CreateCeremonyPayload } from '@/fsd_entities/notification/config/types';
import { toast } from 'react-hot-toast';

export const useCeremonyCreateForm = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValues: CreateCeremonyPayload) => {
    try {
      setLoading(true);

      const payload: CreateCeremonyPayload = {
        ...formValues,
      };

      await postCeremony(payload);

      toast.success('경조사가 성공적으로 등록되었습니다.');
    } catch (error: any) {
      toast.error(error.message || '등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
  };
};
