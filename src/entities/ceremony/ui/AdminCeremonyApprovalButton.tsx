const buttonColor = {
  BLUE: 'bg-[#6BBEEC]',
  GRAY: 'bg-[#B4B1B1]',
};

export const CeremonyApprovalButton = ({
  color,
  onClick,
  text,
}: Ceremony.CeremonyApprovalButtonProps) => {
  return (
    <button
      className={`flex h-[30px] w-1/3 items-center justify-center rounded-lg px-10 py-1 text-sm font-semibold whitespace-nowrap md:h-[55px] md:w-1/4 md:px-16 md:text-xl ${buttonColor[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
