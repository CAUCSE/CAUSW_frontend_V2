declare namespace Notification {
  interface NotificationData {
    targetId: string;
    title: string;
    noticeType: string;
    body: string;
    isRead: boolean;
    notificationLogId: string;
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
