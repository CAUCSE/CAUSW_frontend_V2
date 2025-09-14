'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitFormReply } from '../../api';

export const useSubmitFormReply = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const { mutate } = useMutation({
    mutationFn: async ({ formId, formData }: { formId: string; formData: Form.QuestionReplyRequestDtoList }) => {
      return submitFormReply(formId, formData);
    },
    onSuccess: () => {
      setModalMessage('신청서 제출 완료');
    },
    onError: () => {
      setModalMessage('신청 대상이 아니거나 이미 제출한 신청서입니다');
    },
    onSettled: () => {
      setModalOpen(true);
    },
  });

  return { modalOpen, modalMessage, setModalOpen, mutate };
};