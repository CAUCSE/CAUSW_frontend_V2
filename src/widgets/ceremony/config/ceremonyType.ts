export const ceremonyTypeMap: Record<string, string> = {
  MARRIAGE: '결혼',
  FUNERAL: '장례식',
  GRADUATION: '졸업',
  ETC: '기타',
};
export const categoryOptions: {
  label: string;
  value: Ceremony.CeremonyCategory;
}[] = [
  { label: '결혼', value: 'MARRIAGE' },
  { label: '장례식', value: 'FUNERAL' },
  { label: '졸업', value: 'GRADUATION' },
  { label: '기타', value: 'ETC' },
];
export enum CeremonyState {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  AWAIT = 'AWAIT',
  CLOSE = 'CLOSE',
}

export const tabItems: { label: string; key: CeremonyState }[] = [
  { label: '등록 완료', key: CeremonyState.ACCEPT },
  { label: '등록 거부', key: CeremonyState.REJECT },
  { label: '등록 대기 중', key: CeremonyState.AWAIT },
];
