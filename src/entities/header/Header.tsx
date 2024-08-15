export const Header = ({
  children,
  underline,
  wide,
  bold,
}: {
  children: React.ReactNode;
  underline?: boolean;
  wide?: boolean;
  bold?: boolean;
}) => (
  <span
    className={`text-2xl ${underline ? "underline" : ""} 
    ${bold ? "font-bold" : ""} ${wide ? "tracking-widest" : ""}`}
  >
    {children}
  </span>
);
