const buttonColor = {
  BLUE: 'bg-[#6BBEEC]',
  GRAY: 'bg-[#B4B1B1]',
};

export const OccasionApprovalButton = ({ color, onClick, text }: Occasion.OccasionApprovalButtonProps) => {
  return (
    <button
      className={`flex h-[55px] w-1/4 items-center justify-center whitespace-nowrap rounded-lg px-10 py-1 text-lg font-semibold md:px-16 md:text-xl ${buttonColor[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
