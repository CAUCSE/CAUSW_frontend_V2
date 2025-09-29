declare namespace Pagination {
  export interface PageableObject {
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: SortObject;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }

  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: SortObject;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }

  export interface SortObject {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
}
