export const SubHeader = ({
  children,
  underline,
  gray,
  bold,
  big,
}: {
  children: React.ReactNode;
  underline?: boolean;
  gray?: boolean;
  bold?: boolean;
  big?: boolean;
}) => (
  <span
    className={`${big ? "text-lg" : "text-sm"} ${underline ? "underline" : ""} ${bold ? "font-bold" : ""} ${gray ? "text-gray-400" : ""}`}
  >
    {children}
  </span>
);
