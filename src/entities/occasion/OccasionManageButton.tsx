const buttonColor = {
  BLUE: "bg-[#6BBEEC]",
  GRAY: "bg-[#B4B1B1]",
};

interface OccasionManageButtonProp {
  color: "BLUE" | "GRAY";
  onClick: () => void;
  text: string;
}

export const OccasionManageButton = ({
  color,
  onClick,
  text,
}: OccasionManageButtonProp) => {
  return (
    <button
      className={`rounded-lg px-16 py-1 text-xl font-bold ${buttonColor[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
