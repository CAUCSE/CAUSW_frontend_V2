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
    <div className="relative m-5 flex h-80 w-72 flex-col items-center justify-center rounded-lg border-2 bg-white">
      <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-xl">
        <img
          src={mainImage}
          alt={"Circle Image"}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="mt-4 text-lg font-bold">{name}</span>

      <span className="mt-1 w-3/4 truncate text-center text-gray-400">
        {description}
      </span>
    </div>
  </Link>
);
