import Link from "next/link";

export const CircleElement = ({
  id,
  mainImage,
  name,
  description,
}: {
  id: string;
  name: string;
  mainImage: string;
  description: string;
}) => (
  <Link href={`circle/${id}`}>
    <div className="relative w-72 h-80 bg-white flex-col items-center border-2 rounded-lg flex justify-center">
      <div className="w-52 h-52 flex justify-center items-center overflow-hidden rounded-xl">
        <img
          src={mainImage}
          alt={"Circle Image"}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-bold text-lg mt-4">{name}</span>
      <span className="text-gray-400 text-center truncate w-3/4 mt-1">
        {description}
      </span>
    </div>
  </Link>
);
