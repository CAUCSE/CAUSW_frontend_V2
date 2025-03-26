declare namespace Error {
  export interface ApiErrorResponse {
    errorCode: string | undefined;
    message: string | undefined;
    timeStamp: string | undefined;
  }
}
