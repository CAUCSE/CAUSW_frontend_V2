import { Provider } from './Provider';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <Provider>{children}</Provider>;

export default Layout;
