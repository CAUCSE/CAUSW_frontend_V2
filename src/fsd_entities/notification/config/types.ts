export interface Notification {
  targetId: string;
  title: string;
  noticeType: string;
  body: string;
  isRead: boolean;
  notificationLogId: string;
}

export type CeremonyCategory = '' | 'MARRIAGE' | 'FUNERAL' | 'GRADUATION' | 'ETC';

export interface CreateCeremonyPayload {
  description: string;
  startDate: string;
  endDate: string;
  category: CeremonyCategory;
  imageFileList?: FileList;
}

export interface Ceremony {
  id: string;
  title: string;
  body: string;
}

export interface CeremonyResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Ceremony[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
