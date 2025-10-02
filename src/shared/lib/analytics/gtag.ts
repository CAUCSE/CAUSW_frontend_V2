export const GA_TRACKING_ID = 'G-0MFP0WN799';

export const pageview = (url: string) => {
  (
    window as unknown as {
      gtag: (
        config: string,
        id: string,
        options: { page_path: string },
      ) => void;
    }
  ).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
