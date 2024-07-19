export const SubHeader = ({
  children,
  underline,
  gray,
  bord,
}: {
  children: React.ReactNode;
  underline?: boolean;
  gray?: boolean;
  bord?: boolean;
}) => (
  <span
    className={`text-sm ${underline ? "underline" : ""} 
    ${bord ? "font-bold" : ""} ${gray ? "text-gray-400" : ""}`}
  >
    {children}
  </span>
);
