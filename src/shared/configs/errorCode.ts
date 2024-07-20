//로그인 정보 불일치
export const noUserInfoCode = ["4101"];

//Refresh Token 거부
export const noRefreshTokenCode = [
  "4000",
  "4102",
  "4102",
  "4103",
  "4104",
  "4012",
  "4109",
];

//Access Token 거부
export const noAccessTokenCode = ["4105"];

//접근 불가 페이지 접근
export const noPermissionCode = ["4107"];

//처리 가능 에러 코드: 아래 에러 코드 모음
export const allErrorCode = [
  ...noUserInfoCode,
  ...noRefreshTokenCode,
  ...noAccessTokenCode,
  ...noPermissionCode,
];
