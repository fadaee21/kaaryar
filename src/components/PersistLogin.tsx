import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGetValidationToken from "../hooks/request/useGetValidationToken";
import ListRoutes from "../ListRoutes";
import Sidebar from "./Sidebar";

export const PersistLogin = () => {
  const location = useLocation();

  const [tokenValidation, loadingVal] = useGetValidationToken();

  if (!loadingVal) {
    return <></>;
  }

  return tokenValidation ? (
    <>
      <Sidebar listRoutes={ListRoutes} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
