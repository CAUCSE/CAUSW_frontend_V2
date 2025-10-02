import Image from 'next/image';

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
        src={profileImage}
        alt={nickname}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  );
};
