export const GA_TRACKING_ID = 'G-0MFP0WN799';

export const pageview = (url: string) => {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
