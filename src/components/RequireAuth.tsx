import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { AllowedRoles } from "../model";

const RequireAuth: React.FC<AllowedRoles> = ({ allowedRoles }) => {
  const location = useLocation();
  const [storedValue, setValue] = useLocalStorage("user", null);

  return storedValue?.roles?.find((role: any) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : storedValue?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
