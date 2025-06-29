declare namespace Ceremony {
  interface CeremonyDetailPageProps {
    ceremonyId: string;
  }
}
declare namespace Ceremony {
  export interface CreateCeremonyRequestDto {
    description: string;
    startDate: string;
    endDate: string;
    category: 'MARRIAGE' | 'FUNERAL' | 'ETC';
  }
  interface Ceremony {
    id: string;
    body: string;
    title: string;
  }
  interface Ceremony {
    content: Ceremony[];
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
  interface CeremonyRequestManagementProps {
    state: string | undefined;
    title: string;
    firstNavigation: NavigationItem;
    navigation?: NavigationItem[];
  }

  type CeremonyListProps = {
    list: Ceremony[];
    firstNavigation: NavigationItem;
    navigation?: NavigationItem[];
    state: string | undefined;
  };
  interface CeremonyDetailPageProps {
    ceremonyId: string;
    user?: boolean;
  }
  interface CeremonyDetailContentProps {
    title: string;
    description: string;
  }
  interface CeremonyApprovalButtonProps {
    color: 'BLUE' | 'GRAY';
    onClick: () => void;
    text: string;
  }
  interface CeremonyApprovalModalProps {
    closeModal: () => void;
    occasionTitle: string;
  }
  interface CeremonyDateTileProps {
    title: string;
    date: string;
  }
  interface CeremonySectionTitleProps {
    title: string;
    ceremonyContent: string;
  }

  interface CeremonyImageTileProps {
    imageList: string[];
  }

  interface UpdateCeremonyStateProps {
    ceremonyId: string;
    targetCeremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';
    rejectMessage?: string;
  }
}
