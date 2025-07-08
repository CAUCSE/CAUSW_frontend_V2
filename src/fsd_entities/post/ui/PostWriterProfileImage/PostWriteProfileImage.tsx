import Image from 'next/image';

interface PostWriterProfileImageProps {
  profileImage: string;
  nickname: string;
  width?: number;
  height?: number;
}

export const PostWriterProfileImage = ({
  profileImage,
  nickname,
  width = 70,
  height = 70,
}: PostWriterProfileImageProps) => {
  return (
    <Image
      src={profileImage}
      alt={nickname}
      width={width}
      height={height}
      className="bg-contain bg-center bg-no-repeat"
    />
  );
};
