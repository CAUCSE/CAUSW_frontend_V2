declare namespace Post {
  export type Content = {
    id: string;
    title: string;
    content: string;
    writerName: string;
    writerAdmissionYear: number;
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  };

  export type Posts = {
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    content: Content[];
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
    empty: boolean;
  };
}
