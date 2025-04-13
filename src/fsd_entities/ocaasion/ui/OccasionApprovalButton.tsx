const buttonColor = {
  BLUE: 'bg-[#6BBEEC]',
  GRAY: 'bg-[#B4B1B1]',
};

export const OccasionApprovalButton = ({ color, onClick, text }: OccasionApprovalButtonProps) => {
  return (
    <button
      className={` whitespace-nowrap flex justify-center items-center rounded-lg px-10 py-1 text-lg font-semibold md:px-16 md:text-xl w-1/4 h-[55px] ${buttonColor[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
