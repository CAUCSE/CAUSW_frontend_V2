declare namespace Ceremony {
  interface CeremonyDetailPageProps {
    ceremonyId: string;
  }
  interface CreateCeremonyRequestDto {
    description: string;
    startDate: string;
    endDate: string;
    category: 'MARRIAGE' | 'FUNERAL' | 'ETC';
  }
  interface CeremonyItem {
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
    list: CeremonyItem[];
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
    ceremonyTitle: string;
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
  interface ListBoxItem {
    id: string;
    title: string;
    body: string;
    isRead?: boolean;
    targetId?: string; // 게시글 id
    notificationLogId?: string;
    targetParentId?: string; //게시판 id
  }

  interface ListBoxProps {
    data: ListBoxItem[];
    alarm?: string; //general | ceremony
    loadMore?: () => void;
    emptyMessage?: string;
  }
  interface CreateCeremonyPayload {
    description: string;
    startDate: string;
    endDate: string;
    category: CeremonyCategory;
    imageFileList?: FileList;
  }
  type CeremonyCategory = '' | 'MARRIAGE' | 'FUNERAL' | 'GRADUATION' | 'ETC';
  interface CeremonyResponse {
    totalElements: number;
    totalPages: number;
    size: number;
    content: CeremonyItem[];
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
  interface AdmissionYearInputProps {
    onAdd: (year: number) => void;
    disabled: boolean;
  }
  interface AdmissionYearListProps {
    years: number[];
    onRemove: (year: number) => void;
    isAllSelected?: boolean;
  }
  interface AllYearToggleProps {
    checked: boolean;
    onChange: (val: boolean) => void;
  }
  interface CeremonyNotificationSettingDto {
    subscribedAdmissionYears: number[] | null;
    setAll: boolean;
    notificationActive: boolean;
  }
  interface NotificationSettingPayload {
    subscribedAdmissionYears: number[] | null;
    setAll: boolean;
    notificationActive: boolean;
  }
}
