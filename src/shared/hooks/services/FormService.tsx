"use client";

import { API, useResponseFormStore } from "@/shared";
import { useEffect, useState } from "react";
import { useMutation, useQueries } from "@tanstack/react-query";

import { formQueryKey } from "@/shared/configs/query-key/formQueryKey";
import { useRouter } from "next/navigation";

export const FormService = () => {
  const useGetFormInfo = (formId: string) => {
    const setForm = useResponseFormStore((state) => state.setForm);
    const { data, isPending, isError, isSuccess } = useQueries({
      queries: [
        {
          queryKey: formQueryKey.detail(formId),
          queryFn: async () => {
            const { data }: { data: Post.FormResponseDto } = await API.get(
              `/api/v1/forms/${formId}`,
            );
            return data;
          },
        },
        {
          queryKey: formQueryKey.canReply(formId),
          queryFn: async () => {
            const { data }: { data: boolean } = await API.get(
              `/api/v1/forms/${formId}/can-reply`,
            );
            return data;
          },
        },
      ],
      combine: (results) => {
        return {
          data: results.map((result) => result.data),
          isPending: results.some((result) => result.isPending),
          isError: results.some((result) => result.isError),
          isSuccess: results.every((result) => result.isSuccess),
        };
      },
    });

    useEffect(() => {
      if (isSuccess) {
        setForm(data[0] as Post.FormResponseDto);
      }
    }, [isSuccess]);

    return { data, isPending, isError };
  };

  const useSubmitFormReply = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");

    const { mutate } = useMutation({
      mutationFn: async ({
        formId,
        formData,
      }: {
        formId: string;
        formData: Form.QuestionReplyRequestDtoList;
      }) => {
        await API.post(`/api/v1/forms/${formId}`, JSON.stringify(formData));
      },
      onSuccess: () => {
        setModalMessage("신청서 제출 완료");
      },
      onError: () => {
        setModalMessage("신청 대상이 아니거나 이미 제출한 신청서입니다");
      },
      onSettled: () => {
        setModalOpen(true);
      },
    });

    return { modalOpen, modalMessage, setModalOpen, mutate };
  };

  return { useGetFormInfo, useSubmitFormReply };
};
