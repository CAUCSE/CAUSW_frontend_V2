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
}) => (
  <span
    className={`flex flex-row items-end ${big ? 'text-3xl' : 'text-2xl'} ${underline ? 'underline' : ''} ${bold ? 'font-bold' : ''} ${wide ? 'tracking-widest' : ''}`}
  >
    {children}
  </span>
);
