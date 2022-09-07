import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { AllowedRoles } from "../model";

const RequireAuth: React.FC<AllowedRoles> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
