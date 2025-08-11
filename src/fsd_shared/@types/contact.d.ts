declare namespace Contact {
  export interface UserCareer {
    id: string | null;
    startYear: number;
    startMonth: number;
    endYear: number;
    endMonth: number;
    description: string;
  }

  export interface Contact {
    id: string;
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    admissionYear: number;
    profileImageUrl: string;
    major: string;
    roles: string[];
    academicStatus: string;
    description: string;
    job: string;
    userCareer: UserCareer[];
    githubLink: string;
    linkedInLink: string;
    blogLink: string;
    notionLink: string;
    instagramLink: string;
    isPhoneNumberVisible: boolean;
  }

  export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }

  export interface Pageable {
    sort: Sort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }

  export interface PaginatedContactsResponse {
    content: Contact[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }

  export interface ContactUpdatePayload {
    phoneNumber: string;
    description: string;
    job: string;
    userCareer: (Omit<UserCareer, 'id'> & { id: string | null })[];
    githubLink: string;
    linkedInLink: string;
    blogLink: string;
    notionLink: string;
    instagramLink: string;
    isPhoneNumberVisible: boolean;
  }
}
