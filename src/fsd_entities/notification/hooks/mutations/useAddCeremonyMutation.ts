'use client';

import { useMutation } from '@tanstack/react-query';

import { addCeremony } from '../../api';

interface UseAddCeremonyMutationProps {
  onSuccess?: (data: Ceremony.CeremonyResponse) => void;
  onError?: (error: unknown) => void;
}

export const useAddCeremonyMutation = ({ onSuccess, onError }: UseAddCeremonyMutationProps = {}) => {
  return useMutation<Ceremony.CeremonyResponse, unknown, Ceremony.CreateCeremonyPayload>({
    mutationFn: addCeremony,
    onSuccess,
    onError,
  });
};
