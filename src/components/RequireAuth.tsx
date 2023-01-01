import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import { AllowedRoles } from "../model";

const RequireAuth: React.FC<AllowedRoles> = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.roles?.find((role: any) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
