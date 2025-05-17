declare namespace Notification {
  interface NotificationData {
    description: string;
    startDate: string;
    endDate: string;
    category: 'MARRIAGE' | 'FUNERAL' | 'ETC';
  }
  interface NotificationResponse {
    totalElements: number;
    totalPages: number;
    size: number;
    content: NotificationData[];
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
}
