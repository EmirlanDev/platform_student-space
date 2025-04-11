import { ReactNode } from "react";
import PersonalClient from "./components/PersonalClient";

export default function PersonalLayout({ children }: { children: ReactNode }) {
  return <PersonalClient>{children}</PersonalClient>;
}
