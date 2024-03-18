import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

type LayoutProps = {};
const Layout = (props: LayoutProps) => {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      <div className="bg-patternDark flex-1 max-h-[90%] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
