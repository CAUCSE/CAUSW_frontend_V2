import Link from "next/link";

export const CircleElement = ({
  id,
}: {
  id: string;
  name: string;
  mainImage: string;
  description: string;
}) => (
  <Link href={`circle/${id}`}>
    <div className="w-40 h-40 bg-red-200"></div>
  </Link>
);
