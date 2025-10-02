export const Header = ({
  children,
  underline,
  wide,
  bold,
  big,
}: {
  children: React.ReactNode;
  underline?: boolean;
  wide?: boolean;
  bold?: boolean;
  big?: boolean;
}) => {
  const textSize = big ? 'text-3xl' : 'text-2xl';
  const underlineClass = underline ? 'underline' : '';
  const boldClass = bold ? 'font-bold' : '';
  const wideClass = wide ? 'tracking-widest' : '';

  return (
    <span
      className={`flex flex-row items-end ${textSize} ${underlineClass} ${boldClass} ${wideClass}`}
    >
      {children}
    </span>
  );
};
