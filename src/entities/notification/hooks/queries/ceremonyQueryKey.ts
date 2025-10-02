import { CeremonyState } from '@/widgets/ceremony';

export const ceremonyQueryKey = {
  all: ['ceremonies'] as const,
  list: (state: CeremonyState) =>
    [...ceremonyQueryKey.all, 'list', state] as const,
  setting: () => [...ceremonyQueryKey.all, 'setting'] as const,
  awaitList: () => [...ceremonyQueryKey.all, 'awaitList'] as const,
};
