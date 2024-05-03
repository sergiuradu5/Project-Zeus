import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
type ProtectedRouteProps = {
  redirectPath: string;
  isAllowed: boolean;
  children?: ReactNode;
};

const ProtectedRoute = ({
  redirectPath = "/auth",
  isAllowed,
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
