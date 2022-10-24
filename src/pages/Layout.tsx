import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthProvider";
import ListRoutes from "../ListRoutes";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.token && <Sidebar listRoutes={ListRoutes} />}
      <Box
        component={"main"}
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
