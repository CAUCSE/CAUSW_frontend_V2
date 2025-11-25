import Image from 'next/image';

import { getOptimizedImageUrl } from '@/shared/utils/image';

interface PostWriterProfileImageProps {
  profileImage: string;
  nickname: string;
  size?: number;
}

export const PostWriterProfileImage = ({
  profileImage,
  nickname,
  size = 70,
}: PostWriterProfileImageProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="overflow-hidden rounded-full"
    >
      <Image
        src={getOptimizedImageUrl(profileImage, { width: size })}
        alt={nickname}
        width={size}
        height={size}
        className="object-cover"
        unoptimized
      />
    </div>
  );
};
