declare namespace Api {
  /**
   * 공통 v2 API 응답 타입
   * {
   *   code: string;
   *   message: string;
   *   data: T;
   * }
   */
  export type V2Response<T> = {
    code: string;
    message: string;
    data: T;
  };
}
