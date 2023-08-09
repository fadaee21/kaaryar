import { Box } from "@mui/system";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGetValidationToken from "../hooks/request/useGetValidationToken";
import ListRoutes from "../ListRoutes";
import LoadingProgress from "./LoadingProgress";
import Sidebar from "./Sidebar";
export const PersistLogin = () => {
  //this component check your authentication,
  //this is crucial when you enter complete path
  //and you want to see specific page, at this moment you
  //need to validate your token
  const location = useLocation();
  const [tokenValidation, loadingVal] = useGetValidationToken();
  if (!loadingVal) {
    return (
      <Box sx={{ mt: 12 }}>
        <LoadingProgress />
      </Box>
    );
  }
  //if token is valid,all page can be opened with sidebar
  return tokenValidation ? (
    <>
      <Sidebar listRoutes={ListRoutes} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
