'use client';

import { useMutation } from '@tanstack/react-query';
import { addCeremony } from "@/fsd_entities/notification/api/post";
import { CeremonyResponse, CreateCeremonyPayload } from '@/fsd_entities/notification/config/types';

interface UseAddCeremonyMutationProps {
  onSuccess?: (data: CeremonyResponse) => void;
  onError?: (error: unknown) => void;
}

export const useAddCeremonyMutation = ({ onSuccess, onError }: UseAddCeremonyMutationProps = {}) => {
  return useMutation<CeremonyResponse, unknown, CreateCeremonyPayload>({
    mutationFn: addCeremony,
    onSuccess,
    onError,
  });
};
