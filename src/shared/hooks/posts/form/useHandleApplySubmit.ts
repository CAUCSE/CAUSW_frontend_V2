'use client';

import { useParams, useRouter } from 'next/navigation';

import { UseFormSetError } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { FormService, useResponseFormStore } from '@/shared';

interface useHandleApplySubmitProps {
  setError: UseFormSetError<Form.QuestionReplyRequestDtoList>;
}
export const useHandleApplySubmit = ({ setError }: useHandleApplySubmitProps) => {
  const router = useRouter();
  const params = useParams();
  const { formId } = params;

  const { form, clearForm } = useResponseFormStore(
    useShallow(state => ({ form: state.form, clearForm: state.clearForm })),
  );
  const { useSubmitFormReply } = FormService();
  const { modalMessage, modalOpen, setModalOpen, mutate: submitFormReply } = useSubmitFormReply();

  const closeModal = () => {
    setModalOpen(false);
    router.back();
    clearForm();
  };

  const onSubmit = async (data: any) => {
    let hasErrors = false;
    data.questionReplyRequestDtoList.forEach((questionReplyRequestDto: Form.QuestionReplyRequestDto, idx: number) => {
      if (
        (form?.questionResponseDtoList[idx].questionType === 'SUBJECTIVE' &&
          questionReplyRequestDto.questionReply === undefined) ||
        questionReplyRequestDto.questionReply?.trim() === ''
      ) {
        setError(`questionReplyRequestDtoList.${idx}.questionReply`, {
          type: 'manual',
          message: '해당 문항에 대한 답변을 입력해주세요.',
        });
        hasErrors = true;
      } else if (
        form?.questionResponseDtoList[idx].questionType === 'OBJECTIVE' &&
        (!questionReplyRequestDto.selectedOptionList || questionReplyRequestDto.selectedOptionList.length === 0)
      ) {
        setError(`questionReplyRequestDtoList.${idx}.selectedOptionList`, {
          type: 'manual',
          message: '해당 문항에 대한 항목을 체크해주세요.',
        });
        hasErrors = true;
      }
    });
    if (hasErrors) {
      return;
    }

    const questionReplyDtoList = { ...data };
    questionReplyDtoList.questionReplyRequestDtoList.forEach(
      (questionReplyRequestDto: Form.QuestionReplyRequestDto) => {
        if (questionReplyRequestDto.questionReply === undefined) {
          questionReplyRequestDto.questionReply = null;
        }
        if (typeof questionReplyRequestDto.selectedOptionList === 'string') {
          questionReplyRequestDto.selectedOptionList = [Number(questionReplyRequestDto.selectedOptionList)];
        } else if (typeof questionReplyRequestDto.selectedOptionList === 'object') {
          questionReplyRequestDto.selectedOptionList = questionReplyRequestDto.selectedOptionList.map(selectedOption =>
            Number(selectedOption),
          );
        }
      },
    );

    submitFormReply({
      formId: formId as string,
      formData: questionReplyDtoList,
    });
  };

  return { onSubmit, closeModal, modalMessage, modalOpen };
};
