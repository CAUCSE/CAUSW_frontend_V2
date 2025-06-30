import { CeremonyState } from '@/fsd_widgets/ceremony';

export const ceremonyQueryKey = {
  all: ['ceremonies'] as const,
  list: (state: CeremonyState) => [...ceremonyQueryKey.all, 'list', state] as const,
};
