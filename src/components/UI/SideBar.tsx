import { ReactNode } from "react";

type SideBarProps = {
  children?: ReactNode;
  position: "right" | "left";
  className?: string;
};
const SideBar = ({ children, position, className }: SideBarProps) => {
  return (
    <div
      className={`lg:flex-[0.3] bg-white shadow-md border-2 duration-75
    ${position === "right" ? "rounded-tr-3xl rounded-br-3xl" : ""}
    ${position === "left" ? "rounded-tl-3xl rounded-bl-3xl" : ""}
    ${className}
    `}
    >
      {children}
    </div>
  );
};
export default SideBar;
