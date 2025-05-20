declare namespace Occasion {
  export interface CreateCeremonyRequestDto {
    description: string;
    startDate: string;
    endDate: string;
    category: 'MARRIAGE' | 'FUNERAL' | 'ETC';
  }
  interface Occasion {
    id: string;
    body: string;
    title: string;
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
  interface OccasionDetailPageProps {
    occasionId: string;
  }
  interface OccasionDetailContentProps {
    title: string;
    description: string;
  }
  interface OccasionApprovalButtonProps {
    color: 'BLUE' | 'GRAY';
    onClick: () => void;
    text: string;
  }
  interface OccasionApprovalModalProps {
    closeModal: () => void;
    occasionTitle: string;
  }
  interface OccasionDateTileProps {
    title: string;
    date: string;
  }
  interface OccasionSectionTitleProps {
    title: string;
    occasionContent: string;
  }

  interface OccasionImageTileProps {
    imageList: string[];
  }

  interface UpdateCeremonyStateProps {
    ceremonyId: string;
    targetCeremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';
    rejectMessage?: string;
  }
}
