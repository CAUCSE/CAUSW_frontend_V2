import { CeremonyState } from '@/fsd_entities/notification/api';

export const ceremonyQueryKey = {
  all: ['ceremonies'] as const,
  list: (state: CeremonyState) => [...ceremonyQueryKey.all, 'list', state] as const,
};
