import { ReactNode } from "react";
import ReduxProvider from "./../providers/ReduxProvider";

interface ILayoutClientProps {
  children: ReactNode;
}

const LayoutClient: React.FC<ILayoutClientProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LayoutClient;
