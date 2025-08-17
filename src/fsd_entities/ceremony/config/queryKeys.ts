export const generalCeremonyQueryKey = {
  all: ['ceremonies'],

  detail: (ceremonyId: string) => [...generalCeremonyQueryKey.all, 'detail', ceremonyId],
  list: (ceremonyId: string) => [...generalCeremonyQueryKey.all, 'list', ceremonyId],
  regist: (ceremonyId: string) => [...generalCeremonyQueryKey.all, 'regist', ceremonyId],
  cancel: (ceremonyId: string) => [...generalCeremonyQueryKey.all, 'cancel', ceremonyId],
  update: (ceremonyId: string) => [...generalCeremonyQueryKey.all, 'update', ceremonyId],
};
