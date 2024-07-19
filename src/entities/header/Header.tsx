export const Header = ({
  children,
  underline,
  wide,
  bord,
}: {
  children: React.ReactNode;
  underline?: boolean;
  wide?: boolean;
  bord?: boolean;
}) => (
  <span
    className={`text-2xl ${underline ? "underline" : ""} 
    ${bord ? "font-bold" : ""} ${wide ? "tracking-widest" : ""}`}
  >
    {children}
  </span>
);
