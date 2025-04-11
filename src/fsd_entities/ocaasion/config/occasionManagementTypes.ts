interface Occasion {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  ceremonyState: string;
  attachedImageUrlList: string[];
  note: string | null;
}
interface OccasionData {
  content: Occasion[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
interface NavigationItem {
  name: string;
  state: string;
  router: string;
}
interface OccasionRequestManagementProps {
  state: string | undefined;
  title: string;
  firstNavigation: NavigationItem;
  navigation?: NavigationItem[];
}

type OccasionListProps = {
  list: Occasion[];
  firstNavigation: NavigationItem;
  navigation?: NavigationItem[];
  state: string | undefined;
};
