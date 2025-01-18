interface OccasionContentProp {
  title: string;
  occasionContent: string;
}

export const OccasionContent = ({ title, occasionContent }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold md:text-2xl">{title}</h1>
      <p className="whitespace-pre-line rounded-2xl border border-black bg-white px-6 py-4 text-xl text-[#8B8B8B]">
        {occasionContent}
      </p>
    </div>
  );
};
