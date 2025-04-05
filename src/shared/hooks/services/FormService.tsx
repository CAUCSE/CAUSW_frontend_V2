'use client';

import { useEffect, useState } from 'react';

import { useInfiniteQuery, useMutation, useQueries, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { formQueryKey } from '@/shared/configs/query-key/formQueryKey';

import { API, useFormResultStore, useResponseFormStore } from '@/shared';

export const FormService = () => {
  const getFormResponseDto = async (formId: string) => {
    const { data }: { data: Post.FormResponseDto } = await API.get(`/api/v1/forms/${formId}`);
    return data;
  };

  const useGetFormResponseInfo = (formId: string) => {
    const setForm = useResponseFormStore(state => state.setForm);
    const { data, isPending, isError, isSuccess } = useQueries({
      queries: [
        {
          queryKey: formQueryKey.detail(formId),
          queryFn: () => getFormResponseDto(formId),
        },
        {
          queryKey: formQueryKey.canReply(formId),
          queryFn: async () => {
            const { data }: { data: boolean } = await API.get(`/api/v1/forms/${formId}/can-reply`);
            return data;
          },
        },
      ],
      combine: results => {
        return {
          data: results.map(result => result.data),
          isPending: results.some(result => result.isPending),
          isError: results.some(result => result.isError),
          isSuccess: results.every(result => result.isSuccess),
        };
      },
    });

    useEffect(() => {
      if (isSuccess && data) {
        setForm(data[0] as Post.FormResponseDto);
      }
    }, [isSuccess, data]);

    return { data, isPending, isError };
  };

  const useSubmitFormReply = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    const { mutate } = useMutation({
      mutationFn: async ({ formId, formData }: { formId: string; formData: Form.QuestionReplyRequestDtoList }) => {
        await API.post(`/api/v1/forms/${formId}`, JSON.stringify(formData));
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

  const useGetFormInfo = (formId: string) => {
    const { formData, setFormData } = useFormResultStore(
      useShallow(state => ({
        formData: state.formData,
        setFormData: state.setFormData,
      })),
    );
    const { data, isPending, isError, isSuccess } = useQuery({
      queryKey: formQueryKey.detail(formId),
      queryFn: () => getFormResponseDto(formId),
    });

    useEffect(() => {
      if (isSuccess && data) {
        setFormData(data);
      }
    }, [isSuccess, data]);
    return { data, isPending, isError, isSuccess };
  };

  const useGetFormSummaryResult = (formId: string) => {
    return useQuery({
      queryKey: formQueryKey.summaryResult(formId),
      queryFn: async () => {
        const { data }: { data: Form.QuestionSummaryResponseDto[] } = await API.get(`/api/v1/forms/${formId}/summary`);
        return data;
      },
    });
  };

  const useGetFormTotalResult = (formId: string, size: number) => {
    return useInfiniteQuery({
      queryKey: formQueryKey.totalResult(formId),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: Form.ReplyPageResponseDto } = await API.get(
          `/api/v1/forms/${formId}/results?page=${pageParam}&size=${size}`,
        );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        return lastPage.replyResponseDtoPage.last ? null : lastPage.replyResponseDtoPage.pageable.pageNumber + 1;
      },
      select: results => {
        return results.pages.flatMap(result => result);
      },
    });
  };

  const useUpdateFormClosedStatus = () => {
    const { formData, setFormClosedStatus } = useFormResultStore();
    return useMutation({
      mutationFn: async ({ formId }: { formId: string }) => {
        await API.put(
          `/api/v1/forms/${formId}/set-closed`,
          {},
          {
            headers: {
              ...API.defaults.headers.common,
              targetIsClosed: `${!formData?.isClosed}`,
            },
          },
        );
      },
      onSuccess: () => {
        toast.success('신청서 마감 상태 변경 완료');
        setFormClosedStatus(!formData?.isClosed);
      },
      onError: () => {
        toast.error('신청서 마감 상태 변경 실패');
      },
    });
  };

  const useExportExcelFile = () => {
    return useMutation({
      mutationFn: async ({ formId }: { formId: string }) => {
        API.get(`/api/v1/forms/${formId}/export`, {
          responseType: 'blob',
        }).then(response => {
          const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `form-${formId}-result.xlsx`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(downloadUrl);
        });
      },
      onError: () => {
        toast.error('엑셀 다운로드 실패');
      },
    });
  };

  return {
    useGetFormResponseInfo,
    useSubmitFormReply,
    useGetFormInfo,
    useGetFormSummaryResult,
    useGetFormTotalResult,
    useUpdateFormClosedStatus,
    useExportExcelFile,
  };
};
