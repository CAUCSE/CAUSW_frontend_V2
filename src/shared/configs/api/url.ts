export const BASEURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_SERVER_URL
    : process.env.NEXT_PUBLIC_DEV_SERVER_URL;
