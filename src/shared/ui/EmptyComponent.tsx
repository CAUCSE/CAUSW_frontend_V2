import Image from "next/image";

interface EmptyComponentProps {
  message: string;
}

export const EmptyComponent = ({ message }: EmptyComponentProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
      <Image
        src="/images/puang-proud.png"
        alt="no-content"
        width={200}
        height={250}
      ></Image>
      <p>{message}</p>
    </div>
  );
};
