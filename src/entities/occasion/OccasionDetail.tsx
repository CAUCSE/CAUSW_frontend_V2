interface OccasionDetailProps {
  title: string;
  description: string;
}

export const OccasionDetail = ({ title, description }: OccasionDetailProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 md:flex md:flex-col md:gap-2">
      <h1 className="whitespace-nowrap text-lg font-bold md:text-2xl">{title}</h1>
      <p className="col-span-2 border-b border-black text-lg text-[#8B8B8B] md:text-xl">{description}</p>
    </div>
  );
};
