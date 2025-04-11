const buttonColor = {
  BLUE: 'bg-[#6BBEEC]',
  GRAY: 'bg-[#B4B1B1]',
};

export const OccasionApprovalButton = ({ color, onClick, text }: OccasionApprovalButtonProps) => {
  return (
    <button
      className={`rounded-lg px-10 py-1 text-lg font-bold md:px-16 md:text-xl ${buttonColor[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
