export interface Page<T> {
  content: T[];
  totalPages: number;
  number: number; // 현재 페이지
}
