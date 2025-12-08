export const CLOUDFRONT_DOMAIN = 'https://d72wley2drory.cloudfront.net';

// PROD 배포 전에 확인 필요
const S3_DOMAINS = ['caucse-s3-bucket.s3.ap-northeast-2.amazonaws.com'];

interface ImageOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'jpg' | 'png';
}

// S3 URL이 아닌 경우 원본 URL을 반환.
export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptions = {},
) => {
  if (!src) return src;

  let isS3Url = false;
  let imagePath = src;

  for (const domain of S3_DOMAINS) {
    if (src.includes(domain)) {
      isS3Url = true;
      // 도메인 이후의 경로 추출
      const parts = src.split(domain);
      if (parts.length > 1) {
        imagePath = parts[1];
      }
      break;
    }
  }

  if (!isS3Url) {
    return src;
  }

  // 경로가 /로 시작하는지 확인
  if (!imagePath.startsWith('/')) {
    imagePath = `/${imagePath}`;
  }

  const url = new URL(`${CLOUDFRONT_DOMAIN}${imagePath}`);

  if (options.width) {
    url.searchParams.set('w', options.width.toString());
  }
  if (options.quality) {
    url.searchParams.set('q', options.quality.toString());
  }
  if (options.format) {
    url.searchParams.set('f', options.format);
  }

  return url.toString();
};

/**
 * 다운로드용 최적화 우회 URL 생성.
 * 원본은 너무 커서 이미지 최적화 반환 문제가 있을 수 있음.
 */
export const getOriginalImageUrl = (src: string) => {
  if (!src) return src;

  let isS3Url = false;
  let imagePath = src;

  for (const domain of S3_DOMAINS) {
    if (src.includes(domain)) {
      isS3Url = true;
      const parts = src.split(domain);
      if (parts.length > 1) {
        imagePath = parts[1];
      }
      break;
    }
  }

  if (!isS3Url) {
    return src;
  }

  if (!imagePath.startsWith('/')) {
    imagePath = `/${imagePath}`;
  }

  const url = new URL(`${CLOUDFRONT_DOMAIN}${imagePath}`);
  url.searchParams.set('original', '');

  return url.toString().replace('original=', 'original');
};

// Next.js Image Component용 Loader 함수
export const awsImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return getOptimizedImageUrl(src, { width, quality, format: 'webp' });
};
