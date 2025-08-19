'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { addCeremony } from '../../api';

interface UseAddCeremonyMutationProps {
  onSuccess?: (data: Ceremony.CeremonyResponse) => void;
  onError?: (error: unknown) => void;
  onMutate?: UseMutationOptions<Ceremony.CeremonyResponse, unknown, Ceremony.CreateCeremonyPayload>['onMutate'];
}

export const useAddCeremonyMutation = ({ onSuccess, onError, onMutate }: UseAddCeremonyMutationProps = {}) => {
  return useMutation<Ceremony.CeremonyResponse, unknown, Ceremony.CreateCeremonyPayload>({
    mutationFn: addCeremony,
    onMutate,
    onSuccess,
    onError,
  });
};
