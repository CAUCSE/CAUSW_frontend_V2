export const CeremonyDetailContent = ({ title, description }: Ceremony.CeremonyDetailContentProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 md:flex md:flex-col md:gap-2">
      <h1 className="text-lg font-bold whitespace-nowrap md:text-2xl">{title}</h1>
      <p className="col-span-2 border-b border-black text-lg text-[#8B8B8B] md:text-xl">{description}</p>
    </div>
  );
};
