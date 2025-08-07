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
  profileImage?: FileList;
}

export interface UserCareer {
  id: string | null;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  description: string;
}

// pageable 내부의 sort 객체 타입
interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

// pageable 객체 타입
interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// GET /users-info 응답의 전체 타입
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

// PUT /users-info/me 요청 시 보내는 DTO 타입
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
