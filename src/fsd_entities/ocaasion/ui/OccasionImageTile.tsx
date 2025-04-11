import Image from 'next/image';

interface OccasionImageProp {
  imageList: string[];
}

export const OccasionImageTile = ({ imageList }: OccasionImageProp) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold md:text-2xl">사진</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-8">
        {imageList.map((image, idx) => {
          return (
            <div key={idx} className="flex justify-center">
              <Image
                src={image}
                alt={`첨부사진${idx}`}
                width={200}
                height={200}
                layout="fixed"
                className="h-36 w-36 rounded-2xl border border-black object-contain sm:h-48 sm:w-48"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
