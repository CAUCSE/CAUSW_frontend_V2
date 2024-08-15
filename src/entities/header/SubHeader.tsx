export const SubHeader = ({
  children,
  underline,
  gray,
  bold,
}: {
  children: React.ReactNode;
  underline?: boolean;
  gray?: boolean;
  bold?: boolean;
}) => (
  <span
    className={`text-sm ${underline ? "underline" : ""} 
    ${bold ? "font-bold" : ""} ${gray ? "text-gray-400" : ""}`}
  >
    {children}
  </span>
);
